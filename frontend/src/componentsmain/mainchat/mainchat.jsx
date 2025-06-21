import React, { useState } from "react";
import Header from "../sidebar/Header";

const MainChat = () => {
  const [hasSentMessage, setHasSentMessage] = useState(false);

  // You can call setHasSentMessage(true) when a message is sent in your actual chat logic

  return (
    <div style={{ paddingTop: 60, minHeight: "100vh" }}>
      <Header hasSentMessage={hasSentMessage} />
      {/* Main chat area */}
    </div>
  );
};

export default MainChat;