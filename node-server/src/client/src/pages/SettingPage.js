import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [member_email, setEmail] = useState("");
  const [member_password, setPassword] = useState("");
  const [member_name, setName] = useState("");
  const [member_nick, setNick] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://172.30.1.85:8002/api/member/member/${sessionStorage.getItem(
          "memid"
        )}`
      )
      .then((res) => {
        setEmail(res.data.member_email);
        setPassword(res.data.member_pw);
        setName(res.data.member_name);
        setNick(res.data.member_nick);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const userUpdateButton = () => {
    handleShowModal();
  };

  const handleUserUpdate = () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    axios
      .put(
        `http://172.30.1.85:802/api/member/update/${sessionStorage.getItem(
          "memid"
        )}`,
        {
          member_email: member_email,
          member_pw: member_password,
          member_name: member_name,
          member_nick: member_nick,
          updatedAt: formattedDateTime,
        }
      )
      .then(alert("수정이 완료되었습니다."))
      .catch(alert("수정이 실패했습니다."));

    handleCloseModal();
  };

  const userDeleteButton = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(
          `http://172.30.1.85:8002/api/member/delete/${sessionStorage.getItem(
            "memid"
          )}`
        )
        .then((res) => {
          console.log("회원 탈퇴 완료", res.data);
          alert("회원 삭제가 완료되었습니다.");
          sessionStorage.clear();
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Header></Header>
      <div>
        <Button variant="warning" onClick={userUpdateButton}>
          회원정보수정
        </Button>
        <Button variant="danger" onClick={userDeleteButton}>
          회원탈퇴
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                value={member_email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={member_password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={member_name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                value={member_nick}
                onChange={(e) => setNick(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            취소
          </Button>
          <Button variant="primary" onClick={handleUserUpdate}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SettingPage;
