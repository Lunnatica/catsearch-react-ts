import * as React from "react"
import { CatSearch } from "./CatSearch"
import { createRoot } from "react-dom/client"

createRoot(document.getElementById("main")).render(
  React.createElement(CatSearch)
)
