import React from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import MainPage from "./MainPage";

import Notification from "./notification";

const ChattingPage = () => {
  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <MainPage></MainPage>
        </div>
      </div>
      <Notification></Notification>
    </div>
  );
};

export default ChattingPage;
