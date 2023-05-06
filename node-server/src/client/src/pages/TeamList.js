// TeamList.js
import React, { useState, useEffect } from "react";
import TeamItem from "./TeamItem";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TeamCreateCard from "./TeamCreateCard";

const TeamList = () => {
	const [teams, setTeams] = useState([]);

	const fetchTeams = async () => {
		try {
			const response = await axios.get("서버 URL을 여기에 입력하세요");
			setTeams(response.data);
		} catch (error) {
			console.error("Error fetching teams:", error);
		}
	};

	useEffect(() => {
		const storedTeams = [];
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			if (key.startsWith("team")) {
				storedTeams.push(JSON.parse(sessionStorage.getItem(key)));
			}
		}
		setTeams(storedTeams);
		fetchTeams();
	}, []);

	const handleDelete = (teamToDelete) => {
		const index = sessionStorage.key(`team${teamToDelete.id}`);
		sessionStorage.removeItem(index);
		setTeams(teams.filter((team) => team.id !== teamToDelete.id));
	};

	const handleEdit = (teamToEdit) => {
		// Handle team editing logic here
		console.log("Edit:", teamToEdit);
	};

	return (
		<Container>
			<h1>팀 목록</h1>
			<Row>
				<Col sm={3} md={3} lg={2}>
					<TeamCreateCard />
				</Col>
				{teams.map((team, index) => (
					<Col key={index} sm={3} md={3} lg={2}>
						<TeamItem id={team} onDelete={handleDelete} onEdit={handleEdit} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default TeamList;
