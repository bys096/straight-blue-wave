import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectList from "./ProjectList";
import styled from "styled-components";

const TeamDetail = () => {
	const { tmId } = useParams();
	const [team, setTeam] = useState(null);

	const TeamDesc = styled.div `
		display: flex;
		justify-content: center;
		margin: 20px;
	`;

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const response = await axios.get(
					`http://172.30.1.14:8002/api/team/readTeam/${tmId}`
				);
				setTeam(response.data);
			} catch (error) {
				console.error("Error fetching team:", error);
			}
		};
		fetchTeam();
	}, [tmId]);

	if (!team) return <p>Loading...</p>;

	return (
		<div>
			<TeamDesc>
				<h2>{team.tmName}</h2>
				<p>{team.tmIntro}</p>
				<hr />
			</TeamDesc>
			<ProjectList />
		</div>
	);
};

export default TeamDetail;
