import React, { useState, useRef, useEffect } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const doggyResponses = [
    "bark",
    "jump",
    "hump",
    "woof",
    "grrr",
    "woof woof",
    "bark bark",
    "humps aggressively",
    "pounce",
    "tilts head",
  ];

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = new Message({
      id: 0,
      message: input,
    });
    setMessages((prev) => [...prev, userMessage]);

    let puppyResponse = "";

    if (
      input.toLowerCase().includes("hello") ||
      input.toLowerCase().includes("hi")
    ) {
      puppyResponse = "bark (hello)";
    } else if (
      input.toLowerCase().includes("are you ready") ||
      input.toLowerCase().includes("walk")
    ) {
      puppyResponse = "jump! jump! jump!";
    } else {
      puppyResponse =
        doggyResponses[Math.floor(Math.random() * doggyResponses.length)];
    }

    setInput("");

    setTimeout(() => {
      const doggyMessage = new Message({
        id: 1,
        message: puppyResponse,
      });
      setMessages((prev) => [...prev, doggyMessage]);
    }, 800);
  };

  // scroll as new messages appear
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container">
      <h1>Milo</h1>

      <div
        className="chat-wrapper"
        style={{ flexGrow: 1, width: "100%", overflowY: "auto" }}
      >
        <ChatFeed
          messages={messages}
          isTyping={false}
          hasInputField={false}
          showSenderName
        />
        {/* dummy div to allow for scrolling */}
        <div ref={bottomRef}></div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
          placeholder="Say something to Milo..."
        />
        <button
          onClick={handleSend}
          style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
