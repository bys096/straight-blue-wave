import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setUserEmail("");
    setUserData(null);
  };

  const handleSearch = async () => {
    try {
      const response = await axios
        .get(`http://172.30.1.85:8002/api/member/${userEmail}`)
        .then((res) => {
          setUserData({ email: res.data.member_email });
        })
        .catch((err) => {
          alert("검색에 실패했습니다.");
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
    setUserEmail("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        유저 검색
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>유저 검색(이메일로 검색)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
          {userData ? (
            <div>
              User Email: {userData.email}
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
