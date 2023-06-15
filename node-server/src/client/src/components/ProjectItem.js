import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { projectConnect } from "../actions/project";

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

const ProjectItem = ({ project = [] }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Link
        to={`/project/${project.prjId}`}
        className="text-decoration-none"
        onClick={() => {
          sessionStorage.setItem("prjid", project.prjId);
          sessionStorage.setItem("prjroom", project.prjRoom);
          sessionStorage.setItem("prjname", project.prjName);
          dispatch(projectConnect(project));
        }}
      >
        <StyledCard>
          <Card.Body>
            <Card.Title>{project.prjName}</Card.Title>
          </Card.Body>
        </StyledCard>
      </Link>
    </>
  );
};

export default ProjectItem;
