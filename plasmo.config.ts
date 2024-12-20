import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  manifest: {
    manifest_version: 3,
    name: "Doc Helper",
    version: "1.0.0",
    description: "Explain different documentations using AI",
    permissions: [
      "storage",
      "tabs",
      "activeTab",
      "scripting"
    ],
    host_permissions: [
      "<all_urls>"
    ],
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.ts"],
        css: ["styles.css"],
        run_at: "document_idle", //added this
      }
    ],
    web_accessible_resources: [
      {
        resources: ["assets/*"],
        matches: ["<all_urls>"]
      }
    ],
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
    },
    browser_specific_settings: {
      gecko: {
        id: "{743ff2c1-74c2-4384-a218-2c33d6a765a5}"
      }
    }
  },
  build: {
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          default: false,
          vendors: false,
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
}