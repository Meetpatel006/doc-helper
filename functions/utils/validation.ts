export function isValid(url: string, question: string): boolean {
  if (!url?.trim() || !question?.trim()) {
    return false
  }

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
} 
