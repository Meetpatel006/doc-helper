const cleanupListeners = new Set<() => void>()

function addHighlight(element: Element) {
  const rect = element.getBoundingClientRect()
  const highlight = document.createElement('div')
  highlight.className = 'doc-helper-highlight'
  
  // Add styles with better positioning and z-index handling
  highlight.style.cssText = `
    position: fixed;
    z-index: 2147483647;
    background: rgba(37, 99, 235, 0.2);
    border: 2px solid #2563eb;
    border-radius: 4px;
    pointer-events: none;
    top: ${rect.top + window.scrollY}px;
    left: ${rect.left + window.scrollX}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    transition: all 0.2s ease-in-out;
  `
  
  // Add scroll position update handler
  const updatePosition = () => {
    const newRect = element.getBoundingClientRect()
    highlight.style.top = `${newRect.top + window.scrollY}px`
    highlight.style.left = `${newRect.left + window.scrollX}px`
  }

  window.addEventListener('scroll', updatePosition, { passive: true })
  window.addEventListener('resize', updatePosition, { passive: true })

  document.body.appendChild(highlight)

  const cleanup = () => {
    window.removeEventListener('scroll', updatePosition)
    window.removeEventListener('resize', updatePosition)
    highlight.remove()
  }

  cleanupListeners.add(cleanup)
}

function removeExistingHighlights() {
  cleanupListeners.forEach(cleanup => cleanup())
  cleanupListeners.clear()
}

// Clean up when extension is disabled/removed
chrome.runtime.onSuspend.addListener(() => {
  removeExistingHighlights()
}) 