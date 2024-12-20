import puppeteer from 'puppeteer'
import type { ProcessResult, UIElement } from '../types.js'

export const processDocumentation = async (url: string): Promise<ProcessResult> => {
  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    // Extract interactive elements from the page
    const elements = await page.evaluate(() => {
      function generateUniqueSelector(element: Element): string {
        if (element.id) return `#${element.id}`
        
        let selector = element.tagName.toLowerCase()
        if (element.className) {
          const classes = Array.from(element.classList).join('.')
          selector += `.${classes}`
        }
        
        // Add position if needed
        const siblings = element.parentElement?.children
        if (siblings && siblings.length > 1) {
          const index = Array.from(siblings).indexOf(element) + 1
          selector += `:nth-child(${index})`
        }
        
        return selector
      }

      const interactiveElements = document.querySelectorAll(
        'button, input, select, a[href], [role="button"], [role="link"], [role="tab"], [role="menuitem"], h1, h2, h3, h4, h5, h6, p, code, pre'
      )

      return Array.from(interactiveElements).map((element) => {
        const rect = element.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(element)
        
        // Skip hidden elements
        if (computedStyle.display === 'none' || 
            computedStyle.visibility === 'hidden' || 
            rect.width === 0 || 
            rect.height === 0) {
          return null
        }

        return {
          type: element.tagName.toLowerCase(),
          id: element.id || null,
          selector: generateUniqueSelector(element),
          text: element.textContent?.trim() || '',
          coordinates: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          },
          attributes: {
            role: element.getAttribute('role') || null,
            ariaLabel: element.getAttribute('aria-label') || null,
            name: element.getAttribute('name') || null,
            placeholder: element.getAttribute('placeholder') || null
          }
        }
      }).filter(Boolean) as UIElement[]
    })

    await browser.close()
    return { success: true, elements }

  } catch (error) {
    if (browser) await browser.close()
    console.error('Error processing documentation:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process documentation'
    }
  }
} 