import React, { useState } from "react";
import Scrollbar from "./scrollbar";
import sidebarIcon from "../../assets/images/newsidebaricon1.png"; // Import the icon

// Header component for logo and button
const SidebarHeader = ({ open, setOpen }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "95%",
      height: 60,
      display: "flex",
      alignItems: "center",
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
    {/* Logo on top left */}
    <div
      style={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* [pic] placeholder for logo */}
      <span style={{ color: "#fff", fontSize: 24, fontFamily: "Arial, sans-serif" }}>[pic]</span>
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

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside
      style={{
        width: open ? SIDEBAR_WIDTH : CLOSED_WIDTH,
        height: "100vh",
        background: open ? "#171717" : "#232323",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #232323",
        position: "fixed",         // <-- changed from "relative" to "fixed"
        top: 0,                    // <-- add this
        left: 0,                   // <-- add this
        transition:
          "width 0.35s cubic-bezier(.4,0,.2,1), background 0.35s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        zIndex: 200,               // <-- ensure it's above background
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Scrollbar fills the whole sidebar */}
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
            <div style={{ marginBottom: 16 }}>Chats</div>
            <div style={{ height: "120vh" }} /> {/* For scroll demo */}
          </div>
          {/* Sticky footer */}
          <div
            style={{
              position: "sticky",
              bottom: 0,
              zIndex: 30,
              background: "#232323",
              padding: "0.75rem 1rem",
              borderTop: "1px solid #181818",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ color: "#fff" }}>Upgrade plan</div>
          </div>
        </Scrollbar>
        {/* Overlapping header at the very top */}
        <SidebarHeader open={open} setOpen={setOpen} />
      </div>
      {/* Overlay button for closed state to ensure it's always clickable */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "absolute",
            top: 12,
            right: 6,
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
          {/* Use sidebaricon.png for open button */}
          <img
            src={sidebarIcon}
            alt="Open sidebar"
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
