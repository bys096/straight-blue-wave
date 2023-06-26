import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamItem from "../components/TeamItem";
import TeamCreateCard from "../components/TeamCreateCard";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { teamConnect } from "../actions/team";

const Title = styled.p`
	font-size: 2.5em;
	color: black;
	text-align: center;
	margin-top: 2em;
`;

const Container = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: column;
	width: 100%;
	user-select: none;
`;

const Teams = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 4rem;
`;

// const Line = styled.hr`
// 	border: none;
// 	border-top: 1px solid #aaa;
// 	background: linear-gradient(
// 		to right,
// 		rgba(0, 0, 0, 0),
// 		rgba(0, 0, 0, 0.75),
// 		rgba(0, 0, 0, 0)
// 	);
// 	height: 1px;
// 	width: 100%;
// 	margin: 0.5em 0;
// 	margin-bottom: 3em;
// `;

const TeamList = () => {
	const [teams, setTeams] = useState([]);
	const dispatch = useDispatch();

	const fetchTeams = async () => {
		const response = axios
			.get(
				`http://localhost:8002/api/team/list/${sessionStorage.getItem("memid")}`
			)
			.then((res) => {
				setTeams(res.data.dtoList);
				dispatch(teamConnect(teams));
				
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchTeams();
	}, []);

	const onTeamCreated = () => {
		fetchTeams();
	};

	return (
		<Container>
			<div class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
				<Title>팀 목록</Title>
			</div>
			{/* <Line /> */}
			<Teams>
				<TeamCreateCard onTeamCreated={onTeamCreated} />
				{teams.map((team, index) => (
					<div key={index}>
						<TeamItem team={team} />
					</div>
				))}
			</Teams>
		</Container>
	);
};

export default TeamList;
