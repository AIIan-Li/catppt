import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./componentsmain/sidebar/Sidebar";
import Headers from "./componentsmain/mainchat/headers";
import Chatbox from "./componentsmain/mainchat/chatbox";

const SIDEBAR_WIDTH = 260;

const App = () => (
  <div>
    <Sidebar />
    <Headers />
    <Chatbox />
    
  </div>

);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
