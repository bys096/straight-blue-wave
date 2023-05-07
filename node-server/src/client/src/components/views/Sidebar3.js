import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setUserId("");
    setUserData(null);
  };

  const handleSearch = async () => {
    try {
      const response = await axios
        .get("http://172.30.1.7:8002/api/member/listMember")
        .then((res) => {
          const members = res.data;
          const findMember = members.filter((mem) => mem.userId === userId);
          if (findMember.length > 0) {
            if (findMember[0].userId !== sessionStorage.getItem("user_id")) {
              setUserData({ id: findMember[0].userId });
            } else {
              alert("자기 자신은 검색할 수 없습니다.");
            }
          } else {
            alert("검색 하신 아이디는 존재하지 않습니다");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        유저 검색
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>유저 검색(ID로 검색)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
          {userData ? (
            <div>
              User ID: {userData.id}
              <Button variant="primary">친구요청</Button>
            </div>
          ) : (
            <p>No user found</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Sidebar;
