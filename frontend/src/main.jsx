import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./componentsmain/sidebar/Sidebar";
import Headers from "./componentsmain/mainchat/headers";
import ChatBox from "./componentsmain/mainchat/chatbox";
import './index.css';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div>
      <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
      <Headers sidebarVisible={sidebarVisible} />
      <ChatBox sidebarVisible={sidebarVisible} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);