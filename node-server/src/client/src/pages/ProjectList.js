// TeamList.js
import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProjectCreateCard from "../components/ProjectCreateCard";

const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	
	const fetchProjects = async () => {
		try {
			const response = await axios.get("http://172.30.1.14:8002/api/project/list");
			setProjects(response.data);
		} catch (error) {
			console.error("Error fetching project:", error);
		}
	};

	useEffect(() => {
		/*
		const storedProjects = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key.startsWith("project")) {
				storedProjects.push(JSON.parse(sessionStorage.getItem(key)));
			}
		}
		setProjects(storedProjects);
		*/
		fetchProjects();
	}, []);


	return (
		<Container>
			<h1>프로젝트 목록</h1>
			<Row>
				<Col md={4} lg={3}>
					<ProjectCreateCard />
				</Col>
				{projects.map((project, index) => (
					<Col key={index} md={4} lg={3}>
						<ProjectItem project={project} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default ProjectList;
