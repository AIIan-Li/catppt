import React from "react";
import notascreenshot from "./notascreenshot.png";
import sharebutton from "./sharebutton.png"; 
// why is the image here? it only works here idek no where else no matter how i do the file path.
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
      padding: "0 1rem 0 2rem",
      boxSizing: "border-box",
      position: "absolute",
      top: 0,
      left: SIDEBAR_WIDTH,
      right: 0,
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* Left side: filler text */}
    <div style={{ color: "#fff", fontWeight: 400, fontSize: 20, fontFamily: "Arial, sans-serif" }}>Cat Phisher</div>
    {/* Right side: three dots and screenshot image */}
    <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: "Arial, sans-serif", marginLeft: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <img src={sharebutton} alt="Share" style={{ height: 22, objectFit: "contain" }} />
        <span style={{ color: '#fff', fontSize: 15, fontWeight: 500, fontFamily: 'Arial, sans-serif' }}>Share</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "#fff" }}></span>
        <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "#fff" }}></span>
        <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "#fff" }}></span>
      </div>
      <img src={notascreenshot} alt="Screenshot" style={{ height: 32, objectFit: "contain" }} />
    </div>
  </div>
);

export default Headers;
