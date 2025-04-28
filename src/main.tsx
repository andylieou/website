import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './dog.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <img src="/milo.png" alt="doggy" className="doggy-sprite" /> */}
    <App />
  </React.StrictMode>
)
