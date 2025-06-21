import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./componentsmain/sidebar/Sidebar";

const SIDEBAR_WIDTH = 260;

const App = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1, background: "#181818", minHeight: "100vh", marginLeft: SIDEBAR_WIDTH }}>
      {/* Main content area */}
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);