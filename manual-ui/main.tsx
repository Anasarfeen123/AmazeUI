import React from "react"
import { createRoot } from "react-dom/client"
import { ManualTestLab } from "./manual-test-lab"
import "./styles.css"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Manual UI test lab root element was not found.")
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ManualTestLab />
  </React.StrictMode>
)
