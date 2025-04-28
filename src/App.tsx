import React, { useState, useRef, useEffect } from "react";
import "./App.css";

interface MyMessage {
  id: number;
  message: string;
}

function App() {
  const [messages, setMessages] = useState<MyMessage[]>([]);
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

    const userMessage = { id: 0, message: input };
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
      const doggyMessage = { id: 1, message: puppyResponse };
      setMessages((prev) => [...prev, doggyMessage]);
    }, 800);
  };

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
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.id === 0 ? "flex-end" : "flex-start",
              margin: "5px 0",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px",
                borderRadius: "15px",
                background: msg.id === 0 ? "#2196f3" : "#333",
                color: "white",
                fontSize: "16px",
                wordBreak: "break-word",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
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
