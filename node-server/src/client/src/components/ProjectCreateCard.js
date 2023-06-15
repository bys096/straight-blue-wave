import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

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
  text-decoration : none;
  
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

const ProjectCreateCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [prjName, setPrjName] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setPrjName("");
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCreateProject = async () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    await axios
      .post("http://localhost:8002/api/project/create", {
        prj_name: prjName,
        team_id: sessionStorage.getItem("tmid"),
      })
      .then((res) => {
        alert("프로젝트 생성이 완료되었습니다");
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        alert("프로젝트 생성에 실패하였습니다");
        console.log(err);
      });
  };

  return (
    <>
      <StyledCard className="project_create" onClick={handleShow}>
        <Card.Body>
          <AiOutlinePlusCircle size={100} />
        </Card.Body>
      </StyledCard>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>팀 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>프로젝트 이름</Form.Label>
              <Form.Control
                type="text"
                value={prjName}
                onChange={(e) => setPrjName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleCreateProject}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCreateCard;
