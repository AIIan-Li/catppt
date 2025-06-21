import React from "react";

const SIDEBAR_WIDTH = 260;
const HEADER_HEIGHT = 60;

const ChatBox = () => (
  <div
    style={{
      position: "absolute",
      top: HEADER_HEIGHT,
      left: SIDEBAR_WIDTH,
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#212121",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        background: "212121",
        width: 770,
        height: "100%",
        margin: 0,
        padding: 0,
        border: 0,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="Ask anything"
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          width: "100%",
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  </div>
);

export default ChatBox;
