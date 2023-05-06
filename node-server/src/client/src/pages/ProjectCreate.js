import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";

const ProjectCreate = () => {
	const [project_name, setProjectName] = useState("");
	const [project_description, setProjectDecription] = useState("");

	const history = useNavigate();

	// 세션 스토리지에 회원가입 정보 저장
	const onSubmit = (e) => {
		e.preventDefault();

		const projectData = {
			project_name,
			project_description,
		};

		const projectIndex = sessionStorage.length + 1;
		sessionStorage.setItem(`project${projectIndex}`, JSON.stringify(projectData));

		console.log({
			project_name,
			project_description,
		});

		if (sessionStorage.getItem(`project${projectIndex}`) != null) {
			history("/LoggedIn");
		}
	};

	const onChangeProjectName = (e) => {
		setProjectName(e.target.value);
	};
	const onChangeProjectDesc = (e) => {
		setProjectDecription(e.target.value);
	};

	const addProject = () => {
		return axios
			.post("주소입력", {
				project_name: project_name,
				project_description: project_description,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Container>
			<h1>팀 생성</h1>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label htmlFor="project_name">팀 이름</Form.Label>
					<Form.Control
						name="project_name"
						value={project_name}
						required
						onChange={onChangeProjectName}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="project_description">팀 설명</Form.Label>
					<Form.Control
						name="project_description"
						type="textarea"
						value={project_description}
						required
						onChange={onChangeProjectDesc}
					/>
				</Form.Group>

				<Button onClick={() => addProject()} type="primary" htmltype="submit">
					가입하기
				</Button>
			</Form>
			<div style={{ marginTop: 10 }}>
				<Link to="/">
					<Button>홈으로 돌아가기</Button>
				</Link>
			</div>
		</Container>
	);
};

export default ProjectCreate;
