import type { UIElement, AIResponse, Step } from '../types.js'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.PLASMO_PUBLIC_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error = new Error('Operation failed')
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        lastError = new Error('Unknown error occurred')
      } else {
        lastError = error
        if (error.message.includes('429') || error.message.includes('quota')) {
          throw error // Don't retry rate limit errors
        }
      }
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
        continue
      }
    }
  }
  
  throw lastError
}

export const getAIResponse = async (
  docContent: UIElement[],
  question: string
): Promise<AIResponse> => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here' || GEMINI_API_KEY === 'your_api_key_here') {
    console.error('Valid Gemini API key not found in environment variables')
    return {
      success: false,
      error: 'Please configure a valid Gemini API key in your environment variables',
      steps: []
    }
  }

  if (!docContent || docContent.length === 0) {
    return {
      success: false,
      error: 'No UI elements found on the page',
      steps: []
    }
  }

  return retryOperation(async () => {
    const context = formatContextForAI(docContent)
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a helpful assistant that provides step-by-step instructions for using web interfaces.
            Available UI elements:
            ${context}
            
            Question: ${question}
            
            Format your response as a JSON array of steps, where each step has:
            {
              "instruction": "Clear instruction text",
              "elementToHighlight": {
                "selector": "CSS selector or element ID",
                "action": "click|input|select|etc"
              }
            }`
          }]
        }]
      })
    })

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          error: 'API quota exceeded. Please try again later or check your Gemini API plan.',
          steps: []
        }
      }
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response received from Gemini')
    }

    try {
      const steps = JSON.parse(generatedText) as Step[]
      if (!Array.isArray(steps)) {
        throw new Error('Response is not an array of steps')
      }
      return { success: true, steps }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError, '\nResponse:', generatedText)
      return {
        success: false,
        error: 'Failed to parse Gemini response',
        steps: []
      }
    }
  })
}

function formatContextForAI(elements: UIElement[]): string {
  return elements
    .map(el => {
      const details = [
        `Type: ${el.type}`,
        `Text: "${el.text}"`,
        `Selector: ${el.selector}`,
        el.attributes.role ? `Role: ${el.attributes.role}` : null,
        el.attributes.ariaLabel ? `Aria-Label: ${el.attributes.ariaLabel}` : null
      ].filter(Boolean).join(', ')
      
      return `- ${details}`
    })
    .join('\n')
} 
