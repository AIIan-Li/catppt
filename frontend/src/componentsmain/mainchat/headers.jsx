import React from "react";

const SIDEBAR_WIDTH = 260;

const Headers = () => (
  <div
    style={{
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`, // Fill from end of sidebar to end of screen
      height: 60,
      background: "#212121",
      borderBottom: "1px solid #424242",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem 0 2rem",
      boxSizing: "border-box",
      position: "absolute",
      top: 0,
      left: SIDEBAR_WIDTH,
      right: 0,
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* Left side: filler text */}
    <div style={{ color: "#fff", fontWeight: 400, fontSize: 20, fontFamily: "Arial, sans-serif" }}>chatgpt</div>
    {/* Right side: [a] [b] [c] */}
    <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Arial, sans-serif" }}>
      <span style={{ color: "#fff", fontSize: 20, fontFamily: "Arial, sans-serif" }}>[a]</span>
      <span style={{ color: "#fff", fontSize: 20, fontFamily: "Arial, sans-serif" }}>[b]</span>
      <span style={{ color: "#fff", fontSize: 20, fontFamily: "Arial, sans-serif" }}>[c]</span>
    </div>
  </div>
);

export default Headers;
