export {}
// This empty export is needed to mark this as a module

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed")
}) 