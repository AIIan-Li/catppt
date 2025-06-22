import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./componentsmain/sidebar/Sidebar";
import Headers from "./componentsmain/mainchat/headers";
import ChatBox from "./componentsmain/mainchat/chatbox";
import Landing from "./assets/components/landing/Landing";
import Login from "./assets/components/login/Login";
import './index.css';

const MainChatUI = ({ sidebarVisible, setSidebarVisible }) => (
  <div>
    <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
    <Headers sidebarVisible={sidebarVisible} />
    <ChatBox sidebarVisible={sidebarVisible} />
  </div>
);

const Main = () => {
  const [page, setPage] = useState("landing"); // "landing", "login", "main"
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Pass these handlers to Landing and Login
  const handleGetStarted = () => setPage("login");
  const handleLoginSuccess = () => setPage("main");

  if (page === "landing") {
    return <Landing onGetStarted={handleGetStarted} />;
  }
  if (page === "login") {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }
  return <MainChatUI sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);