import React from "react";
import Sidebar from "./componentsmain/sidebar/Sidebar";
import MainChat from "./componentsmain/mainchat/mainchat";

const SIDEBAR_WIDTH = 260;

const App = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1, background: "#181818", minHeight: "100vh", marginLeft: SIDEBAR_WIDTH }}>
      <MainChat />
    </div>
  </div>
);

export default App;
