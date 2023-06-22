import React from "react";
import { Button, Card, Figure, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { teamConnect } from "../actions/team";

const StyledCard = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	width: 10rem; // 원하는 너비 지정
	height: 12rem; // 원하는 높이 지정
	border-radius: 10px; // 카드 모서리 둥글게 처리
	text-decoration: none;
	user-select: none;

	&:hover {
		transform: scale(1.05);
		transition: all 0.2s ease-in-out;
	}
`;

const StyledCardBody = styled(Card.Body)`
	display: flex;
	flex-direction: column;
	justify-content: space-around; // 가로 중앙 정렬
	align-items: center; // 세로 중앙 정렬
	height: 50%; // 부모 요소의 높이에 맞춤
	font-size: 2rem;

`;

const StyledCardTitle = styled(Card.Title)`
	&> div {
		font-size: 1rem;
	}
`;

const StyledCardText = styled(Card.Text)`
	& div {
		font-size: 1rem;
	}
`;

const ImageContainer = styled.div`
	object-fit: fill;
	width: 90%;
	height: 50%;
	padding: 5px;
`;

const StyledImage = styled(Image)`
	width: 100%;
	height: 100%;
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
					<ImageContainer>
						<StyledImage src={team.team_photo} thumbnail />
					</ImageContainer>
					<StyledCardBody>
						<StyledCardTitle>
							<div>{team.teamName}</div>
						</StyledCardTitle>
						<StyledCardText>
							<div>{team.teamDesc}</div>
						</StyledCardText>
					</StyledCardBody>
				</StyledCard>
			</Link>
		</>
	);
};

export default TeamItem;
