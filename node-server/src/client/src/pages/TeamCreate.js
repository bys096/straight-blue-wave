import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";

const TeamCreate = () => {
	const [team_name, setTeamName] = useState("");
	const [team_description, setTeamDecription] = useState("");

	const history = useNavigate();

	// 세션 스토리지에 회원가입 정보 저장
	const onSubmit = (e) => {
		e.preventDefault();

		const teamData = {
			team_name,
			team_description,
		};

		const teamIndex = sessionStorage.length + 1;
		sessionStorage.setItem(`team${teamIndex}`, JSON.stringify(teamData));

		console.log({
			team_name,
			team_description,
		});

		if (sessionStorage.getItem(`team${teamIndex}`) != null) {
			history("/LoggedIn");
		}
	};

	const onChangeTeamName = (e) => {
		setTeamName(e.target.value);
	};
	const onChangeTeamDesc = (e) => {
		setTeamDecription(e.target.value);
	};

	const addTeam = () => {
		return axios
			.post("주소입력", {
				team_name: team_name,
				team_description: team_description,
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
					<Form.Label htmlFor="team_name">팀 이름</Form.Label>
					<Form.Control
						name="team_name"
						value={team_name}
						required
						onChange={onChangeTeamName}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="team_description">팀 설명</Form.Label>
					<Form.Control
						name="team_description"
						type="textarea"
						value={team_description}
						required
						onChange={onChangeTeamDesc}
					/>
				</Form.Group>

				<Button onClick={() => addTeam()} type="primary" htmltype="submit">
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

export default TeamCreate;
