import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SoundInit from './components/SoundInit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SoundInit />
    <App />
  </StrictMode>,
)
