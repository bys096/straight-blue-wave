import React, { useState } from "react";
import { Nav, Button, ButtonGroup } from "react-bootstrap";
import Sidebar1 from "./Sidebar1";
import Sidebar2 from "./Sidebar2";
import Sidebar3 from "./Sidebar3";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState("team");

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "team":
        return <Sidebar1 />;
      case "project":
        return <Sidebar2 />;
      case "friend":
        return <Sidebar3 />;
      default:
        return <Sidebar1 />;
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        <Button className="toggle-btn" onClick={toggleSidebar}>
          {!isOpen ? ">" : "<"}
        </Button>
        {isOpen && (
          <div>
            <Nav className="flex-column" style={{ width: "40vh" }}>
              <ButtonGroup className="mt-3">
                <Button
                  className="nav-link"
                  variant="primary"
                  style={{ color: "black" }}
                  onClick={() => changeActiveComponent("team")}
                >
                  팀
                </Button>
                <Button
                  className="nav-link"
                  variant="secondary"
                  style={{ color: "black" }}
                  onClick={() => changeActiveComponent("project")}
                >
                  프로젝트
                </Button>
                <Button
                  className="nav-link"
                  variant="dark"
                  style={{ color: "white" }}
                  onClick={() => changeActiveComponent("friend")}
                >
                  친구
                </Button>
              </ButtonGroup>
            </Nav>
            <div className="sidebarContent">{renderActiveComponent()}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
