import React from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const navigate = useNavigate();

  const goChattingRoom = () => {
    navigate("/chattingroom");
  };

  const goCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div>
          <Button variant="primary" onClick={goChattingRoom}>
            채팅방
          </Button>
          <Button variant="primary" onClick={goCalendar}>
            캘린더
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
