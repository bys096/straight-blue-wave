import React from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import MainPage from "./MainPage";

const ChattingPage = () => {
  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div className="section">
          <MainPage></MainPage>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
