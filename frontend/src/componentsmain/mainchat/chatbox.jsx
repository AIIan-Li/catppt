import React, { useState, useRef, useEffect } from "react";
import gptTools from "../../assets/gpt_tools.png";
import micImg from "../../assets/mic.png";
import enterImg from "../../assets/enter.png";

const SIDEBAR_WIDTH = 260;
const HEADER_HEIGHT = 60;

const ChatBox = ({ sidebarVisible = true }) => {
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(40);
  const [messages, setMessages] = useState([]); // Store chat history
  const [loading, setLoading] = useState(false); // Loading state
  const textareaRef = useRef(null);
  const chatLogRef = useRef(null);

  // Group messages into user/AI pairs
  const getMessagePairs = () => {
    const pairs = [];
    for (let i = 0; i < messages.length; i += 2) {
      pairs.push({
        user: messages[i],
        ai: messages[i + 1],
      });
    }
    return pairs;
  };

  // Handle Enter/Shift+Enter
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
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

  // Handle submit button
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
      const res = await fetch("/ask", {
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
    setInput(""); // Clear the input box
    setTextareaHeight(24); // Reset input box size
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
    }
    setLoading(false);
  };

  // Auto-resize textarea
  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  };

  // Keep textarea in sync
  useEffect(() => {
    const checkAndResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "24px";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        setTextareaHeight(textareaRef.current.scrollHeight);
      }
    };
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", checkAndResize);
      textarea.addEventListener("keyup", checkAndResize);
    }
    checkAndResize();
    return () => {
      if (textarea) {
        textarea.removeEventListener("input", checkAndResize);
        textarea.removeEventListener("keyup", checkAndResize);
      }
    };
  }, [input]);

  // Auto-scroll to bottom when messages or loading changes
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Calculate left and width based on sidebar visibility
  const left = sidebarVisible ? SIDEBAR_WIDTH : 0;
  const width = sidebarVisible
    ? `calc(100vw - ${SIDEBAR_WIDTH}px)`
    : "100vw";

  // Layout
  return (
    <div
      style={{
        position: "absolute",
        left,
        width,
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        bottom: 0,
        top: HEADER_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "#212121",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily:
          "ui-sans-serif,-apple-system,system-ui,Segoe UI,Helvetica,Apple Color Emoji,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol",
        transition: "top 0.3s, bottom 0.3s, left 0.3s, width 0.3s",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 770,
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: messages.length === 0 ? "center" : "flex-start", // Center when empty
          height: "100%",
          transition: "justify-content 0.3s",
        }}
      >
        {/* Heading at the top when no messages */}
        {messages.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0, // Remove extra margin
              marginBottom: 24,
              zIndex: 10,
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: 34,
                fontWeight: 400,
                letterSpacing: 1,
                margin: 0,
                textAlign: "center",
                textShadow: "0 2px 16px #0008",
              }}
            >
              How can I help you today?
            </h1>
          </div>
        )}

        {/* Chat history display */}
        {messages.length > 0 && (
          <div
            ref={chatLogRef}
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              padding: "24px 0 0 0",
              background: "#212121",
              display: "flex",
              flexDirection: "column",
            }}
            className="custom-scrollbar"
          >
            {getMessagePairs().map((pair, idx) => (
              <React.Fragment key={idx}>
                {pair.user && (
                  <div style={{ display: "flex", justifyContent: "flex-end", margin: "0 32px" }}>
                    <div
                      style={{
                        background: "rgb(48, 48, 48)",
                        color: "#fff",
                        padding: "14px 20px",
                        borderRadius: "12px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                        boxShadow: "0 2px 8px #0002",
                        fontSize: 16,
                        marginBottom: 2,
                        marginTop: 18,
                        alignSelf: "flex-end",
                      }}
                    >
                      {pair.user.text}
                    </div>
                  </div>
                )}
                {pair.ai && (
                  <div style={{ display: "flex", justifyContent: "flex-start", margin: "0 32px" }}>
                    <div
                      style={{
                        background: "rgb(33, 33, 33)",
                        color: "#fff",
                        padding: "14px 20px",
                        borderRadius: "18px 18px 18px 4px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                        boxShadow: "0 2px 8px #0002",
                        fontSize: 16,
                        marginBottom: 2,
                        marginTop: 4,
                        alignSelf: "flex-start",
                      }}
                    >
                      {pair.ai.text}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            {loading && (
              <div style={{ color: "white", fontStyle: "italic", textAlign: "left", margin: "12px 32px" }}>
                Thinking...
              </div>
            )}
          </div>
        )}
        {/* Input area */}
        <div
          style={{
            background: "rgb(48,48,48)",
            width: "100%",
            minHeight: textareaHeight + 56,
            margin: 0,
            padding: `24px 24px 0 24px`,
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
            transition: "top 0.3s, bottom 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;