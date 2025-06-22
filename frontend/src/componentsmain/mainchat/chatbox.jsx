import React, { useState, useRef, useEffect } from "react";
import gptTools from "../../assets/gpt_tools.png";
import micImg from "../../assets/mic.png";
import enterImg from "../../assets/enter.png";

const SIDEBAR_WIDTH = 260;
const HEADER_HEIGHT = 60;

const ChatBox = () => {
  const [focused, setFocused] = useState(false);
  const [movedToBottom, setMovedToBottom] = useState(false);
  const [input, setInput] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(40);
  const [messages, setMessages] = useState([]); // Store chat history
  const [loading, setLoading] = useState(false); // Loading state
  const textareaRef = useRef(null);

  // Handler for pressing Enter or Shift+Enter
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow new line, but let the input grow
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "24px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
            setTextareaHeight(textareaRef.current.scrollHeight);
          }
        }, 0);
        return;
      } else {
        if (input.trim() === "" || loading) return;
        e.preventDefault();
        await sendToBackend();
      }
    }
  };

  // Handler for clicking the button
  const handleSubmit = async () => {
    if (input.trim() === "" || loading) return;
    await sendToBackend();
  };

  // Send input to backend and handle response
  const sendToBackend = async () => {
    setLoading(true);
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const aiMsg = { role: "ai", text: data.answer || data.error || "No response" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Error connecting to backend" }]);
    }
    setMovedToBottom(true);
    setInput(""); // Clear the input box
    setTextareaHeight(24); // Reset input box size
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"; // <-- Reset DOM height
    }
    setLoading(false);
  };

  // Auto-resize textarea (grows and shrinks with content)
  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  };

  // Keep rectangle and textarea in sync even if user deletes lines with mouse, keyboard, or other means
  useEffect(() => {
    const checkAndResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "24px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        setTextareaHeight(textareaRef.current.scrollHeight);
      }
    };

    // Listen for input and keyup events to catch all changes (including line deletes)
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", checkAndResize);
      textarea.addEventListener("keyup", checkAndResize);
    }

    // Initial check
    checkAndResize();

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", checkAndResize);
        textarea.removeEventListener("keyup", checkAndResize);
      }
    };
  }, [input]);

  // Calculate rectangle height: 104px base + extra for each new line
  // When at bottom, add 100px extra padding to the bottom of the rectangle
  const rectHeight = Math.max(104, textareaHeight + 40);

  // Padding for the chat box
  const chatBoxPadding = 24;

  return (
    <div
      style={{
        position: "absolute",
        left: SIDEBAR_WIDTH,
        width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        bottom: 0,
        top: HEADER_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "#212121",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily:
          "ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica,Apple Color Emoji,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol",
        transition: "top 0.3s, bottom 0.3s",
      }}
    >
      <div style={{ width: "100%", maxWidth: 770, margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        {/* Chat history display */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 32px 0 32px",
            color: "#fafafa",
            fontSize: 16,
            fontFamily: "Segoe UI, Arial, sans-serif",
            minHeight: 60,
          }}
        >
          {messages.length === 0 && (
            <div style={{ color: "#888", fontStyle: "italic" }}>Ask anything...</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 12,
                textAlign: msg.role === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  background: msg.role === "user" ? "#2a2a2a" : "#3a3a4a",
                  color: msg.role === "user" ? "#fff" : "#b3e5fc",
                  padding: "8px 14px",
                  borderRadius: 16,
                  display: "inline-block",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  boxShadow: msg.role === "user" ? "0 1px 4px #0003" : "0 1px 4px #0002",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#b3e5fc", fontStyle: "italic" }}>Thinking...</div>
          )}
        </div>
        {/* Input area */}
        <div
          style={{
            background: "rgb(48,48,48)",
            width: "100%",
            minHeight: textareaHeight + 56,
            margin: 0,
            padding: `${chatBoxPadding}px 24px 0 24px`,
            border: 0,
            boxSizing: "border-box",
            position: "relative",
            borderRadius: 30,
            boxShadow: "0 2px 16px #0002",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            transition: "height 0.2s",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flex: "none",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              placeholder="Ask anything"
              style={{
                width: "100%",
                maxWidth: 750,
                minHeight: 40,
                height: textareaHeight,
                lineHeight: "24px",
                padding: "8px 12px",
                margin: "-13.5px 0 0 -18.5px",
                borderRadius: 0,
                border: "transparent",
                fontWeight: 400,
                fontSize: 16,
                color: focused ? "#fafafa" : "#ededed",
                background: "transparent",
                boxSizing: "border-box",
                fontFamily: "Segoe UI, Arial, sans-serif",
                outline: "none",
                boxShadow: "none",
                transition: "color 0.15s, caret-color 0.15s, height 0.2s",
                display: "block",
                caretColor: focused ? "#fff" : "#e0e0e0",
                resize: "none",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                zIndex: 10,
                position: "relative",
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              disabled={loading}
            />
          </div>
          {/* GPT Tools image in bottom left */}
          <img
            src={gptTools}
            alt="GPT Tools"
            style={{
              position: "absolute",
              left: 6,
              bottom: 10,
              width: 110,
              height: "auto",
              aspectRatio: "95 / 30",
              opacity: 0.85,
              pointerEvents: "none",
              userSelect: "none",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
          {/* Mic image in bottom right */}
          <img
            src={micImg}
            alt="Mic"
            style={{
              position: "absolute",
              right: 54,
              bottom: 4,
              width: 40,
              height: "auto",
              aspectRatio: "1 / 1.3",
              opacity: 0.85,
              pointerEvents: "none",
              userSelect: "none",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
          {/* Enter button to the right of mic image */}
          <button
            style={{
              position: "absolute",
              right: 10,
              bottom: 9,
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: loading ? "not-allowed" : "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: loading ? 0.5 : 1,
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            <img
              src={enterImg}
              alt="Enter"
              style={{
                width: 40,
                height: "auto",
                opacity: 0.95,
                userSelect: "none",
                pointerEvents: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
              }}
            />
          </button>
        </div>
        {/* Blue rectangle under the rounded grey rectangle */}
        <div
          style={{
            width: "100%",
            height: 30,
            background: "rgb(33, 33, 33)",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            position: "relative",
            left: 0,
            bottom: 0,
            zIndex: 3,
            transition: "top 0.2s, bottom 0.2s",
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;