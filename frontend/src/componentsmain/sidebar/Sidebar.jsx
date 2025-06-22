import React, { useState } from "react";
import Scrollbar from "./scrollbar";
import sidebarIcon from "./newsidebaricon1.png"; // Import the icon
import calogo from "./calogo.png";

// Header component for logo and button
const SidebarHeader = ({ open, setOpen }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "95%",
      height: 180, // Increased height for extra text
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: open ? "0.75rem 1rem" : "0.75rem 0.5rem",
      background: open ? "#171717" : "#232323",
      borderBottom: "1px solid #232323",
      transition: "background 0.35s cubic-bezier(.4,0,.2,1)",
      boxSizing: "border-box",
      zIndex: 10,
      pointerEvents: "auto",
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* Logo and text on top left */}
    <div
      style={{
        width: 36,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        opacity: 1,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img src={calogo} alt="Cat Logo" style={{ width: 32, height: 32, objectFit: "contain", marginBottom: 25 }} />
      {/* Make each text item on a single line, no wrapping */}
      <span style={{ color: '#fff', fontSize: 16, margin: '2px 0', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', display: 'block', paddingBottom:12 }}>New chat</span>
      <span style={{ color: '#fff', fontSize: 16, paddingBottom:12, margin: '2px 0', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', display: 'block' }}>Search chats</span>
      <span style={{ color: '#fff', fontSize: 16, margin: '2px 0', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', display: 'block' }}>Library</span>
    </div>
    {/* Top right open/close button */}
    <button
      onClick={() => setOpen((v) => !v)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        zIndex: 1,
        position: "static",
        fontFamily: "Arial, sans-serif",
        marginTop: 4,
      }}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      tabIndex={0}
    >
      {/* Use sidebaricon.png for open/close button */}
      <img
        src={sidebarIcon}
        alt={open ? "Close sidebar" : "Open sidebar"}
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
    </button>
  </div>
);

const SIDEBAR_WIDTH = 260;
const CLOSED_WIDTH = 48;
const HEADER_HEIGHT = 60;

const ThinSidebar = ({ onOpen }) => (
  <aside
    style={{
      width: CLOSED_WIDTH,
      height: "100vh",
      background: "#212121", // bright red
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRight: "1px solid #232323",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 200,
      fontFamily: "Arial, sans-serif",
    }}
  >
    <button
      onClick={onOpen}
      style={{
        marginTop: 12,
        width: 36,
        height: 36,
        background: "none",
        border: "none",
        cursor: "pointer",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        fontFamily: "Arial, sans-serif",
      }}
      aria-label="Open sidebar"
      tabIndex={0}
    >
      <img
        src={sidebarIcon}
        alt="Open sidebar"
        style={{ width: 28, height: 28, objectFit: "contain" }}
      />
    </button>
  </aside>
);

const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({
    width: SIDEBAR_WIDTH,
    background: "#171717",
    opacity: 1,
  });

  // Animate close
  const handleClose = () => {
    setIsTransitioning(true);
    setSidebarStyle({
      width: CLOSED_WIDTH,
      background: "#ff2d2d",
      opacity: 1,
      transition:
        "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1)",
    });
    setTimeout(() => {
      setSidebarVisible(false);
      setIsTransitioning(false);
      setSidebarStyle({ width: SIDEBAR_WIDTH, background: "#171717", opacity: 1 });
    }, 300);
  };

  // Animate open
  const handleOpen = () => {
    setSidebarVisible(true);
    setIsTransitioning(true);
    setSidebarStyle({
      width: CLOSED_WIDTH,
      background: "#ff2d2d",
      opacity: 1,
      transition:
        "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1)",
    });
    setTimeout(() => {
      setSidebarStyle({
        width: SIDEBAR_WIDTH,
        background: "#171717",
        opacity: 1,
        transition:
          "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1)",
      });
      setTimeout(() => setIsTransitioning(false), 300);
    }, 10);
  };

  if (!sidebarVisible && !isTransitioning) {
    return <ThinSidebar onOpen={handleOpen} />;
  }

  return (
    <aside
      style={{
        width: sidebarStyle.width,
        height: "100vh",
        background: sidebarStyle.background,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #232323",
        position: "fixed",
        top: 0,
        left: 0,
        transition:
          sidebarStyle.transition ||
          "width 0.5s cubic-bezier(.4,0,.2,1), background 0.5s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        zIndex: 200,
        fontFamily: "Arial, sans-serif",
        opacity: sidebarStyle.opacity,
      }}
    >
      {/* Only show content if open or transitioning open */}
      {(sidebarVisible || isTransitioning) && (
        <div style={{ flex: 1, minHeight: 0, position: "relative", fontFamily: "Arial, sans-serif" }}>
          <Scrollbar>
            <div
              style={{
                paddingTop: HEADER_HEIGHT,
                padding: "1rem",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={{ marginBottom: 16 }}>New chat</div>
              <div style={{ marginBottom: 16 }}>Search chats</div>
              <div style={{ marginBottom: 16 }}>Library</div>
              <div style={{ marginBottom: 16 }}>Sora</div>
              <div style={{ marginBottom: 16 }}>GPTs</div>
              <div style={{ marginBottom: 16 }}>Sora</div>
              <div style={{ marginBottom: 16 }}>GPTs</div>

              <div style={{ height: "120vh" }} /> {/* For scroll demo */}
            </div>
            {/* Sticky footer */}
            <div
              style={{
                position: "sticky",
                bottom: 0,
                zIndex: 30,
                background: "#181818",
                padding: "0.75rem 1rem",
                borderTop: "1px solid #232323",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={{ color: "#fff", fontSize: "14" }}>Upgrade plan</div>
              <div style={{ color: "#484848", fontSize: "1" }}>More access </div>
            </div>
          </Scrollbar>
          {/* Overlapping header at the very top */}
          <SidebarHeader open={sidebarVisible} setOpen={handleClose} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;