import React, { useState } from "react";
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

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

const AddImage = styled.img`
  width: 50px;
  height: 50px;
`;

const TeamCreateCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setTeamName("");
    setTeamDesc("");
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCreateTeam = async () => {
    await axios
      .post(
        `http://localhost:8002/api/team/joinTeam/${sessionStorage.getItem(
          "memid"
        )}`,
        {
          teamName: teamName,
          teamDesc: teamDesc,
        }
      )
      .then((res) => {
        // Team created successfully
        alert("팀 생성이 완료되었습니다");
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        alert("팀 생성에 실패하였습니다");
        console.log(err);
        // Handle error
      });
  };

  return (
    <>
      <StyledCard className="team_create" onClick={handleShow}>
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
              <Form.Label>팀 이름</Form.Label>
              <Form.Control
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>팀 설명</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={teamDesc}
                onChange={(e) => setTeamDesc(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleCreateTeam}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TeamCreateCard;
