import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
`;


const ProjectCreateCard = () => {
	return (
		<Link to="/ProjectCreate" className="text-decoration-none">
			<StyledCard className="project_create">
				<Card.Body>
					<AiOutlinePlusCircle size={100} />
				</Card.Body>
			</StyledCard>
		</Link>
	);
};

export default ProjectCreateCard;