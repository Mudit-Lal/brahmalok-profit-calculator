import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BrahmalokCalculator from './BrahmalokCalculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrahmalokCalculator />
  </StrictMode>,
)
