import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom/dist";
import styled from "styled-components";
import ProjectList from "../pages/ProjectList";
import { useDispatch } from "react-redux";
import { teamConnect } from "../actions/team";

const StyledCard = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	width: 130px; // 원하는 너비 지정
	height: 180px; // 원하는 높이 지정
	border-radius: 10px; // 카드 모서리 둥글게 처리
	text-decoration: none;
  user-select: none;

	&:hover {
		transform: scale(1.05);
		transition: all 0.2s ease-in-out;
	}
`;

const TeamItem = ({ team = [] }) => {
	const dispatch = useDispatch();
	return (
		<>
			<Link
				to={`/team/${team.teamId}`}
				className="text-decoration-none"
				onClick={() => {
					sessionStorage.setItem("tmid", team.teamId);
					dispatch(teamConnect(team));
				}}
			>
				<StyledCard>
					<Card.Body>
						<Card.Title>{team.teamName}</Card.Title>
						<Card.Text>{team.teamDesc}</Card.Text>
					</Card.Body>
				</StyledCard>
			</Link>
		</>
	);
};

export default TeamItem;
