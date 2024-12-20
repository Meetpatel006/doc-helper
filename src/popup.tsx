import React, { useState, useRef, useEffect } from "react"
import { BookOpen, Send, Settings } from "lucide-react"
import SettingDrawer from "components/SettingDrawer"
import type { AIResponse } from "functions/types"
import { processDocumentation } from "functions/services/doc-processor"
import { getAIResponse } from "functions/services/ai"

interface Message {
  type: 'user' | 'ai'
  content: string
  steps?: Array<{
    instruction: string
    elementToHighlight?: {
      selector: string
      text?: string
    }
  }>
}

const IndexPopup = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    setError("")

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }])
    const userQuestion = input
    setInput("")

    try {
      // Get current tab URL
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (!tab.url) throw new Error("Cannot access current page")

      // Process the documentation page
      const processResult = await processDocumentation(tab.url)
      if (!processResult.success || !processResult.elements) {
        throw new Error(processResult.error || 'Failed to process the page')
      }

      // Get AI response
      const aiResponse: AIResponse = await getAIResponse(processResult.elements, userQuestion)
      if (!aiResponse.success) {
        throw new Error(aiResponse.error || 'Failed to generate response')
      }

      // Add AI message with steps
      const formattedSteps = aiResponse.steps.map((step, index) => {
        if (typeof step === 'string') {
          return { instruction: step }
        }
        return step
      })

      setMessages(prev => [...prev, {
        type: 'ai',
        content: formattedSteps.map((step, i) => `${i + 1}. ${step.instruction}`).join('\n'),
        steps: formattedSteps
      }])

      // Highlight elements if available
      const stepsWithHighlights = formattedSteps.filter(step => step.elementToHighlight)
      if (stepsWithHighlights.length > 0) {
        await chrome.tabs.sendMessage(tab.id!, {
          type: "HIGHLIGHT_ELEMENTS",
          steps: stepsWithHighlights
        })
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
      setMessages(prev => [...prev, { type: 'ai', content: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}` }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container w-96 h-[600px] flex flex-col bg-white">
      <div className="header p-4 border-b flex justify-between items-center">
        <BookOpen className="w-5 h-5" /> {/* Fixed the logo */}
        <button onClick={() => setIsSettingsOpen(true)}>
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="messages-container flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`message mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg ${
              msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              <pre className="whitespace-pre-wrap">{msg.content}</pre>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-container p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about the documentation..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? '...' : <Send className="w-5 h-5" />}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <SettingDrawer close={isSettingsOpen} setClose={setIsSettingsOpen} />
    </div>
  )
}

export default IndexPopup