import React, { useState } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'
import "./App.css"

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  const doggyResponses = ['bark', 'jump', 'hump', 'woof']

  const handleSend = () => {
    if (input.trim() === '') return

    const userMessage = new Message({
      id: 0,
      message: input
    })
    setMessages(prev => [...prev, userMessage])

    setInput('')

    setTimeout(() => {
      const randomResponse = doggyResponses[Math.floor(Math.random() * doggyResponses.length)]
      const doggyMessage = new Message({
        id: 1,
        message: randomResponse
      })
      setMessages(prev => [...prev, doggyMessage])
    }, 800)
  }

  return (
    <div className="container">
      <h1>Talk to Doggy</h1>

      <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px' }}>
        <ChatFeed
          messages={messages}
          isTyping={false}
          hasInputField={false}
          showSenderName
        />
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          placeholder="Say something to doggy..."
        />
        <button
          onClick={handleSend}
          style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
