import React from "react";

// All styling is done with the style prop, no ::-webkit-scrollbar or CSS
const scrollbarStyle = {
  height: "100vh",
  overflowY: "scroll",
  background: "#171717",
  transition: "opacity 0.5s",
  scrollbarWidth: "auto", // For Firefox: "auto" is thicker than "thin"
  scrollbarColor: "#424242 #171717", // For Firefox: thumb color, track color
};

const Scrollbar = ({ children }) => (
  <div className="sidebar-scrollbar" style={scrollbarStyle}>
    {children}
  </div>
);

export default Scrollbar;
