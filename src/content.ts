import type { PlasmoCSConfig } from "plasmo"

// Add AMD support
declare global {
  interface Window {
    define: {
      (factory: () => any): any
      (deps: string[], factory: (...args: any[]) => any): any
      amd?: boolean
    }
  }
}

export const setupAMDSupport = () => {
  if (typeof window !== 'undefined' && !window.define) {
    window.define = function(depsOrFactory: string[] | (() => any), maybeFactory?: (...args: any[]) => any) {
      try {
        const factory = typeof depsOrFactory === 'function' ? depsOrFactory : maybeFactory
        if (!factory) return
        return factory()
      } catch (e) {
        console.error('AMD define error:', e)
        return {}
      }
    }
    window.define.amd = true
  }
}

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

let activeHighlights: HTMLElement[] = []

function removeHighlights() {
  activeHighlights.forEach(el => el.remove())
  activeHighlights = []
}

function createHighlight(element: Element) {
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
    transition: all 0.3s ease;
    top: ${rect.top + window.scrollY}px;
    left: ${rect.left + window.scrollX}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
  `
  
  document.body.appendChild(highlight)
  activeHighlights.push(highlight)
  
  // Add pulse animation
  highlight.animate([
    { transform: 'scale(1)', opacity: 0.7 },
    { transform: 'scale(1.05)', opacity: 1 },
    { transform: 'scale(1)', opacity: 0.7 }
  ], {
    duration: 1500,
    iterations: Infinity
  })
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.type === "HIGHLIGHT_ELEMENTS") {
      removeHighlights()
      request.steps.forEach(step => {
        if (step.elementToHighlight) {
          const element = document.querySelector(step.elementToHighlight.selector)
          if (element) {
            createHighlight(element)
          }
        }
      })
      sendResponse({ success: true })
    }
  } catch (error) {
    console.error("Content script error:", error)
    sendResponse({ success: false, error: error.message })
  }
  return true
})

// Clean up highlights when navigating away
window.addEventListener('beforeunload', removeHighlights)