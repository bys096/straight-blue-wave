import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [member_name, setName] = useState("");
  const [member_nick, setNick] = useState("");

  useEffect(() => {
    async function fetchMemberData() {
      console.log("fetch start");
      await axios
        .get(`http://localhost:8002/api/member/me`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("fetch success");
          console.log(res);
          setName(res.data.member_name);
          setNick(res.data.member_nick);
        })
        .catch((err) => {
          console.log("fetch fail");
          console.log(err);
        });
    }
    fetchMemberData();
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

  const handleUserUpdate = async () => {
    await axios
      .put(
        `http://localhost:8002/api/member/update`,
        {
          member_name: member_name,
          member_nick: member_nick,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("수정완료했습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("수정실패했습니다.");
      });

    handleCloseModal();
  };

  const userDeleteButton = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await axios
        .delete(`http://localhost:8002/api/member/delete`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
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
            <Form.Group controlId="name">
              <Form.Label>변경할 이름</Form.Label>
              <Form.Control
                type="text"
                value={member_name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>변경할 닉네임</Form.Label>
              <Form.Control
                type="text"
                value={member_nick || ""}
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
