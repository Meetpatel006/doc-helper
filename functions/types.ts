export interface UIElement {
  type: string
  id: string | null
  selector: string
  text: string
  coordinates: {
    x: number
    y: number
    width: number
    height: number
  }
  attributes: {
    role: string | null
    ariaLabel: string | null
    name: string | null
    placeholder: string | null
  }
}

export interface Step {
  instruction: string
  elementToHighlight?: {
    selector: string
    text?: string
  }
}

export interface AIResponse {
  success: boolean
  error?: string
  steps: Step[]
}

export interface ProcessResult {
  success: boolean
  elements?: UIElement[]
  error?: string
} 