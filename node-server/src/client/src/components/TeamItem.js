import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TeamItem = ({ id, onDelete, onEdit }) => {
	const handleDelete = () => {
		onDelete(id);
	};

	const handleEdit = () => {
		onEdit(id);
	};

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


	return (
		<Link to={`/team/${id.id}`} className="text-decoration-none">
			<StyledCard className="team_item">
				<Card.Body>

					<hr />
					<Card.Title>{id.team_name}</Card.Title>
					<Card.Text>{id.team_description}</Card.Text>
					{/* <Button onClick={handleEdit}>수정</Button>
					<Button onClick={handleDelete} className="ml-2">
						삭제
					</Button> */}
				</Card.Body>
			</StyledCard>
		</Link>
	);
};

export default TeamItem;
