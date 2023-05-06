// TeamList.js
import React, { useState, useEffect } from "react";
import TeamItem from "./TeamItem";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TeamCreateCard from "./TeamCreateCard";

const ProjectList = () => {
	const [projects, setProjects] = useState([]);

	const fetchProjects = async () => {
		try {
			const response = await axios.get("서버 URL을 여기에 입력하세요");
			setProjects(response.data);
		} catch (error) {
			console.error("Error fetching project:", error);
		}
	};

	useEffect(() => {
		const storedProjects = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key.startsWith("project")) {
				storedProjects.push(JSON.parse(sessionStorage.getItem(key)));
			}
		}
		setProjects(storedProjects);
		fetchProjects();
	}, []);

	const handleDelete = (projectToDelete) => {
		const index = sessionStorage.key(`project${projectToDelete.id}`);
		sessionStorage.removeItem(index);
		setProjects(projects.filter((project) => project.id !== projectToDelete.id));
	};

	const handleEdit = (projectToEdit) => {
		// Handle team editing logic here
		console.log("Edit:", projectToEdit);
	};

	return (
		<Container>
			<h1>프로젝트 목록</h1>
			<Row>
				<Col sm={3} md={3} lg={2}>
					<TeamCreateCard />
				</Col>
				{projects.map((project, index) => (
					<Col key={index} sm={3} md={3} lg={2}>
						<TeamItem id={project} onDelete={handleDelete} onEdit={handleEdit} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default ProjectList;
