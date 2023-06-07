// TeamList.js
import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import axios from "axios";
import ProjectCreateCard from "../components/ProjectCreateCard";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";
import styled from "styled-components";

const Title = styled.h1`
	font-size: 2.5em;
	font-weight: bold;
	color: black;
	text-align: center;
	margin-bottom: 2em;
`;

const Container = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: column;
  width : 100%
`;

const Projects = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 4rem;
`;

const Line = styled.hr`
	border: none;
	border-top: 1px solid #aaa;
	background: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(0, 0, 0, 0.75),
		rgba(0, 0, 0, 0)
	);
	height: 1px;
	width: 100%;
	margin: 0.5em 0;
`;


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
            <Title>프로젝트 목록</Title>
            <Line />
            <Projects>
                <ProjectCreateCard onProjectCreated={onProjectCreated} />
              {projects.map((project, index) => (
                <div key={index}>
                  {console.log(project)}
                  <ProjectItem project={project} prjId={project.prjId} />
                </div>
              ))}
            </Projects>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectList;
