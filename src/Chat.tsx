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
  const saved = localStorage.getItem("chatHistory");
  const [messages, setMessages] = useState<MyMessage[]>(
    saved ? JSON.parse(saved) : []
  );
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

  // const handleSend = async () => {
  //   if (input.trim() === "") return;

  //   const userMessage = { id: 0, message: input };
  //   setMessages((prev) => [...prev, userMessage]);

  //   setInput("");

  //   try {
  //     const puppyResponse = await getPrediction(input);

  //     setTimeout(() => {
  //       const doggyMessage = { id: 1, message: puppyResponse };
  //       setMessages((prev) => [...prev, doggyMessage]);
  //     }, 800);
  //   } catch (error) {
  //     console.error("Error getting prediction:", error);
  //     setTimeout(() => {
  //       const doggyMessage = {
  //         id: 1,
  //         message: "error: could not get prediction",
  //       };
  //       setMessages((prev) => [...prev, doggyMessage]);
  //     }, 800);
  //   }
  // };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { id: 0, message: input };
    setMessages((prev) => [...prev, userMessage]);

    let puppyResponse = "";

    if (
      input.toLowerCase().includes("hello") ||
      input.toLowerCase().includes("hi") ||
      input.toLowerCase().includes("hey") ||
      input.toLowerCase().includes("hola")
    ) {
      puppyResponse = "bark bark (hello)";
    } else if (
      input.toLowerCase().includes("are you ready") ||
      input.toLowerCase().includes("walk") ||
      input.toLowerCase().includes("ready")
    ) {
      puppyResponse = "jump! jump! jump!";
    } else if (
      input.toLowerCase().includes("carrot") ||
      input.toLowerCase().includes("apple") ||
      input.toLowerCase().includes("treat") ||
      input.toLowerCase().includes("teeth thing")
    ) {
      puppyResponse = "tilts head (I want)";
    } else if (
      input.toLowerCase().includes("good morning") ||
      input.toLowerCase().includes("goodmorning")
    ) {
      puppyResponse = "woof (good morning)";
    } else if (
      input.toLowerCase().includes("good night") ||
      input.toLowerCase().includes("goodnight")
    ) {
      puppyResponse = "woof (good night)";
    } else if (
      input.toLowerCase().includes("shelby") ||
      input.toLowerCase().includes("shelber")
    ) {
      puppyResponse = "hump";
    } else if (
      input.toLowerCase().includes("dog") ||
      input.toLowerCase().includes("squirrel")
    ) {
      puppyResponse = "grrrr";
    } else if (
      input.toLowerCase().includes("woof") ||
      input.toLowerCase().includes("bark") ||
      input.toLowerCase().includes("ruff")
    ) {
      const barks = ["woof", "bark", "ruff"];
      const length = Math.floor(Math.random() * 10) + 1;

      puppyResponse = Array.from(
        { length },
        () => barks[Math.floor(Math.random() * barks.length)]
      ).join(" ");
    } else if (
      input.includes("?") ||
      input.toLowerCase().includes("why") ||
      input.toLowerCase().includes("what") ||
      input.toLowerCase().includes("where") ||
      input.toLowerCase().includes("how") ||
      input.toLowerCase().includes("who")
    ) {
      puppyResponse = "tilts head";
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

  // state updates are async with react (not immediate). useEffect ensures this
  // update occurs after the setMessages update occurs
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    // console.log("saved local history");
  }, [messages]);

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  // scroll as messages pop up
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container">
      <h1 style={{ color: "black" }}>Milo</h1>
      <div
        style={{
          borderColor: "black",
          border: "1px solid black",
          marginBottom: "8px",
        }}
      />
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

      <div style={{ display: "flex", marginTop: "10px", gap: "3px" }}>
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
        <button className="chat-button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Chat;
