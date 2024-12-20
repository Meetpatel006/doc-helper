import "./styles.css"
import React, { useState, useEffect } from "react"
import { BookOpen, Pen, Link, Settings } from "lucide-react"
import SettingDrawer from "components/SettingDrawer"
import type { Step, AIResponse } from "functions/types"
import { isValid } from "functions/utils/validation"
import { processDocumentation } from "functions/services/doc-processor"
import { getAIResponse } from "functions/services/ai"


const IndexPopup = () => {
  const [url, setUrl] = useState("")
  const [question, setQuestion] = useState("")
  const [guide, setGuide] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isQueued, setIsQueued] = useState(false)

  // Add initial theme setup
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  // Add retry configuration
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000 // 1 second

  // Add retry delay helper
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Add queue management
  const requestQueue: Array<() => Promise<void>> = []
  const processQueue = async () => {
    if (requestQueue.length === 0) return
    const request = requestQueue[0]
    try {
      await request()
    } finally {
      requestQueue.shift()
      if (requestQueue.length > 0) {
        await wait(RETRY_DELAY)
        processQueue()
      }
    }
  }

  const queueRequest = async (request: () => Promise<void>) => {
    requestQueue.push(request)
    setIsQueued(true)
    if (requestQueue.length === 1) {
      processQueue()
    }
  }

  const handleGenerateGuide = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      // Validate inputs
      if (!isValid(url, question)) {
        throw new Error("Please provide both a valid URL and question")
      }

      // Add loading state for queue position
      const queuePosition = requestQueue.length
      if (queuePosition > 0) {
        setGuide(`Queued (Position: ${queuePosition})...\nYour guide will appear here soon...`)
      }

      // Process the documentation page
      const processResult = await processDocumentation(url.trim())
      
      if (!processResult.success || !processResult.elements) {
        throw new Error(processResult.error || 'Failed to process the documentation page')
      }

      // Get AI response
      const aiResponse: AIResponse = await getAIResponse(processResult.elements, question.trim())
      
      if (!aiResponse.success) {
        throw new Error(aiResponse.error || 'Failed to generate guide')
      }

      // Format the steps into a readable guide
      const formattedGuide = aiResponse.steps.map((step: Step, index: number) => {
        const instruction = typeof step === 'string' ? step : step.instruction
        return `${index + 1}. ${instruction}`
      }).join('\n\n')

      setGuide(formattedGuide)
      setError("")

      // Only call highlightElements if steps have highlight data
      const stepsWithHighlights = aiResponse.steps.filter((step: Step) => 
        typeof step === 'object' && 'elementToHighlight' in step
      )
      
      if (stepsWithHighlights.length > 0) {
        highlightElements(stepsWithHighlights)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate guide"
      setError(errorMessage)
      setGuide("")
      console.error("Guide generation error:", err)
    } finally {
      setIsLoading(false)
      setIsQueued(false)  // Reset queue state
    }
  }

  // Update the button text to show more detailed queue state
  const getButtonText = () => {
    if (isLoading) return "Generating..."
    if (isQueued) {
      const position = requestQueue.length
      return position > 1 ? `Queued (${position})...` : "Queued..."
    }
    return "Generate Guide"
  }

  // Add this function to handle URL validation
  const handleUrlInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setError("")
  }

  // Add function to get current tab URL
  const getCurrentTabUrl = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab?.url) {
        setUrl(tab.url)
        setError("") // Clear any existing errors
      }
    } catch (err) {
      console.error("Error getting current tab URL:", err)
      setError("Failed to get current page URL")
    }
  }

  // Update the guide text display component
  const getGuideText = () => {
    if (guide) return guide
    if (isQueued) {
      const position = requestQueue.length
      return `Queued (Position: ${position})...\nYour guide will appear here soon...`
    }
    return "Your guide will appear here..."
  }

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-left">
          <BookOpen className="icon" />
          <h1>DocHelper</h1>
        </div>
        <button 
          className="icon-button"
          onClick={toggleSettings}
        >
          <Settings className="icon" />
        </button>
      </div>

      <div className="main-content">
        <div className="input-group">
          <label>URL</label>
          <div className="url-input-container">
            <input
              type="url"
              value={url}
              onChange={handleUrlInput}
              placeholder="Enter documentation URL"
            />
            <button 
              className="icon-button"
              onClick={getCurrentTabUrl}
              title="Use current page URL"
            >
              <Link className="icon" />
            </button>
          </div>
        </div>

        <div className="input-group">
          <label className="question-label">
            Question
            <Pen className="icon" />
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="About the Documentation..."
          />
        </div>

        <div className="input-group">
          <h2>Generated Guide</h2>
          <div className="generated-guide">
            {getGuideText()}
          </div>
        </div>

        <button 
          className="generate-button"
          onClick={() => queueRequest(handleGenerateGuide)}
          disabled={isLoading || isQueued}>
          {getButtonText()}
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <SettingDrawer 
        close={!isSettingsOpen} 
        setClose={(value: boolean) => setIsSettingsOpen(!value)} 
      />
    </div>
  )
}

// Add this function to handle UI highlighting
function highlightElements(steps: Step[]) {
  // Remove any existing highlights
  const existingHighlights = document.querySelectorAll('.doc-helper-highlight')
  existingHighlights.forEach(el => el.remove())

  // Add new highlights
  steps.forEach((step) => {
    if (typeof step === 'object' && 'elementToHighlight' in step && step.elementToHighlight) {
      const element = document.querySelector(step.elementToHighlight.selector)
      if (element) {
        const rect = element.getBoundingClientRect()
        const highlight = document.createElement('div')
        highlight.className = 'doc-helper-highlight'
        highlight.style.cssText = `
          position: fixed;
          z-index: 10000;
          background: rgba(37, 99, 235, 0.2);
          border: 2px solid #2563eb;
          border-radius: 4px;
          pointer-events: none;
          top: ${rect.top + window.scrollY}px;
          left: ${rect.left + window.scrollX}px;
          width: ${rect.width}px;
          height: ${rect.height}px;
        `
        document.body.appendChild(highlight)
      }
    }
  })
}

export default IndexPopup