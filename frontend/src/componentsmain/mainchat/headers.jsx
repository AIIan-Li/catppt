import React from "react";
import notascreenshot from "./notascreenshot.png";
import sharebutton from "./sharebutton.png"; 
const SIDEBAR_WIDTH = 260;

const Headers = ({ sidebarVisible }) => {
  const left = sidebarVisible ? SIDEBAR_WIDTH : 0;
  const width = sidebarVisible
    ? `calc(100vw - ${SIDEBAR_WIDTH}px)`
    : "100vw";
  const contentPaddingLeft = sidebarVisible ? 24 : 75; // 75px when sidebar is minimized, 24px when open

  return (
    <div
      style={{
        width,
        height: 60,
        background: "#212121",
        borderBottom: "0px solid #424242",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        left,
        right: 0,
        fontFamily: "Arial, sans-serif",
        transition: "left 0.3s, width 0.3s",
        zIndex: 100,
      }}
    >
      {/* Header content with extra left padding when sidebar is open */}
      <div style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingLeft: contentPaddingLeft,
        paddingRight: 16,
        justifyContent: "space-between"
      }}>
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
    </div>
  );
};

export default Headers;