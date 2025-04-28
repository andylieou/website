import React from 'react'
import ReactDOM from 'react-dom/client'
import Chat from './Chat'
import BouncingImage from './BouncingImage'
import './dog.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <img src="/milo.png" alt="doggy" className="doggy-sprite" />
    {/* <BouncingImage image="/sleepy.png"/> */}
    <Chat />
  </React.StrictMode>
)
