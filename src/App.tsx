import React, { useState } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

function App() {
  const [messages, setMessages] = useState<Message[]>([])

  const doggyResponses = ['bark', 'jump', 'hump']

  const handleDoggySpeak = () => {
    const randomResponse = doggyResponses[Math.floor(Math.random() * doggyResponses.length)]
    const newMessage = new Message({
      id: 1,
      message: randomResponse
    })
    setMessages([...messages, newMessage])
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Doggy Chatbot</h1>
      <ChatFeed
        messages={messages}
        isTyping={false}
        hasInputField={false}
        showSenderName
      />
      <button onClick={handleDoggySpeak} style={{ marginTop: '20px' }}>
        Talk to Doggy
      </button>
    </div>
  )
}

export default App
