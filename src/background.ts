import type { PlasmoMessaging } from "@plasmohq/messaging"

// Initialize AMD define function
if (typeof window !== 'undefined' && !window.define) {
  window.define = function(factory: any) {
    try {
      const exports = factory()
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports
      }
      return exports
    } catch (e) {
      console.error('AMD define error:', e)
      return {}
    }
  }
  window.define.amd = true
}

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed")
})

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Reinitialize content script if needed
    chrome.tabs.sendMessage(tabId, { type: "TAB_UPDATED" }).catch(() => {
      // Content script not ready, ignore
    })
  }
})

// Handle messaging between popup and content script
const messaging = {
  async onMessage(req: any, res: any) {
    if (req.name === "highlightElements") {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        if (tab?.id) {
          await chrome.tabs.sendMessage(tab.id, {
            type: "HIGHLIGHT_ELEMENTS",
            steps: req.body
          })
          res.send({ success: true })
        }
      } catch (error: any) {
        res.send({ success: false, error: error.message })
      }
    }
  }
}

export default messaging