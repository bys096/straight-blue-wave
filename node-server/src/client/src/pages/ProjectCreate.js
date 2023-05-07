import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";

const ProjectCreate = (props) => {
	const [project_name, setProjectName] = useState("");
	const history = useNavigate();

	const addProject = () => {
		return axios
			.post("http://172.30.1.14:8002/api/project/create", {
				prj_name: project_name,
			})
			.then((res) => {
				console.log(res);
				if (props.onProjectCreated) {
					props.onProjectCreated();
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// 세션 스토리지에 프로젝트 정보 저장
	const onSubmit = (e) => {
		e.preventDefault();

		/*
		const projectIndex = sessionStorage.length + 1;
		sessionStorage.setItem(`project${projectIndex}`, JSON.stringify(projectData));

		console.log({
			project_name,
		});

		if (sessionStorage.getItem(`project${projectIndex}`) != null) {
			history("/LoggedIn");
		}
		*/

		addProject();
		history(-1);
	};

	const onChangeProjectName = (e) => {
		setProjectName(e.target.value);
	};

	return (
		<Container>
			<h1>프로젝트 생성</h1>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label htmlFor="project_name">프로젝트 이름</Form.Label>
					<Form.Control
						name="project_name"
						value={project_name}
						required
						onChange={onChangeProjectName}
					/>
				</Form.Group>

				<Button type="submit" htmltype="submit">
					가입하기
				</Button>
			</Form>
			<div style={{ marginTop: 10 }}>
				<Link to="/LoggedIn">
					<Button>홈으로 돌아가기</Button>
				</Link>
			</div>
		</Container>
	);
};

export default ProjectCreate;
