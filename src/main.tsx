import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Opt out of browser scroll restoration — lazy chunks mount after the initial
// paint and change page height, so the browser's restored scroll position
// often lands on the wrong section. Always start fresh at the top on reload.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
