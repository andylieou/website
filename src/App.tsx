import React, { useState } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  const doggyResponses = ['bark', 'jump', 'hump']

  const handleSend = () => {
    if (input.trim() === '') return

    // Add user's message
    const userMessage = new Message({
      id: 0, // 0 = user
      message: input
    })
    setMessages(prev => [...prev, userMessage])

    // Clear input
    setInput('')

    // Doggy responds after a small delay
    setTimeout(() => {
      const randomResponse = doggyResponses[Math.floor(Math.random() * doggyResponses.length)]
      const doggyMessage = new Message({
        id: 1, // 1 = doggy
        message: randomResponse
      })
      setMessages(prev => [...prev, doggyMessage])
    }, 800) // 0.8 seconds later
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Talk to Doggy</h1>

      <ChatFeed
        messages={messages}
        isTyping={false}
        hasInputField={false}
        showSenderName
      />

      <div style={{ display: 'flex', marginTop: '20px' }}>
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
