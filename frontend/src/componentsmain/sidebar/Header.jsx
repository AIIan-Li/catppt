import React from "react";

const Header = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 260, // width of sidebar
      right: 0,
      height: 60,
      width: "auto",
      background: "#171717",
      borderBottom: "1px solid #232323",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      boxSizing: "border-box",
      zIndex: 100,
    }}
  >
    {/* Left: catppt + dropdown arrow */}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>catppt</span>
      <span style={{ color: "#fff", fontSize: 18 }}>▼</span>
    </div>
    {/* Right: [a], [b], [c] */}
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ color: "#fff", fontSize: 20 }}>[a]</span>
      <span style={{ color: "#fff", fontSize: 20 }}>[b]</span>
      <span style={{ color: "#fff", fontSize: 20 }}>[c]</span>
    </div>
  </div>
);

export default Header;