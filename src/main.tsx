import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Type declaration for electron API
declare global {
  interface Window {
    electronAPI: {
      getSkills: () => Promise<any[]>
      refreshSkills: () => Promise<any[]>
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
