import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

interface MyMessage {
  id: number;
  message: string;
}

async function getPrediction(message: string) {
  // this only works locally right now!
  const response = await fetch("https://website-8prm.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  const data = await response.json();
  return data.prediction;
}

function Chat() {
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

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { id: 0, message: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const puppyResponse = await getPrediction(input);

      setTimeout(() => {
        const doggyMessage = { id: 1, message: puppyResponse };
        setMessages((prev) => [...prev, doggyMessage]);
      }, 800);
    } catch (error) {
      console.error("Error getting prediction:", error);
      setTimeout(() => {
        const doggyMessage = {
          id: 1,
          message: "error: could not get prediction",
        };
        setMessages((prev) => [...prev, doggyMessage]);
      }, 800);
    }
  };

  // scroll as messages pop up
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
        {/* allows the page to autoscroll as the messages pop up */}
        <div ref={bottomRef}></div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          className="chat-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
          placeholder="Say something to Milo..."
        />
        <button className="chat-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
