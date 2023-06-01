// TeamList.js
import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProjectCreateCard from "../components/ProjectCreateCard";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8002/api/project/list/${sessionStorage.getItem(
          "tmid"
        )}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onProjectCreated = () => {
    fetchProjects();
  };

  return (
    <div className="main">
      <Header />
      <div className="article">
        <Sidebar />
        <div className="section">
          <Container>
            <h1>프로젝트 목록</h1>
            <Row>
              <Col md={4} lg={3}>
                <ProjectCreateCard onProjectCreated={onProjectCreated} />
              </Col>
              {projects.map((project, index) => (
                <Col key={index} md={4} lg={3}>
                  <ProjectItem project={project} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectList;
