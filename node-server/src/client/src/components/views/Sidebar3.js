import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [friendId, setFriendId] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriend = async () => {
      await axios
        .get(
          `http://localhost:8002/api/member/friendList/${sessionStorage.getItem(
            "memid"
          )}`
        )
        .then((res) => {
          const data = res.data;
          const names = data.map((item) => item.friendName);
          setFriends(names);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchFriend();
  }, [friendId]);

  const handleCloseModal = () => {
    setShowModal(false);
    setUserEmail("");
    setUserData(null);
  };

  const handleSearch = async () => {
    try {
      if (userEmail === sessionStorage.getItem("email")) {
        alert("자기 자신은 검색할 수 없습니다.");
      } else {
        const response = await axios
          .get(`http://localhost:8002/api/member/${userEmail}`)
          .then((res) => {
            setUserData({ email: res.data.member_email });
            setFriendId(res.data.member_id);
          })
          .catch((err) => {
            alert("검색에 실패했습니다.");
            console.error(err);
          });
      }
    } catch (error) {
      console.error(error);
    }
    setUserEmail("");
  };

  const addFriend = async () => {
    await axios
      .post(
        `http://localhost:8002/api/member/addFriend?memId=${sessionStorage.getItem(
          "memid"
        )}&friendId=${friendId}`
      )
      .then(() => {
        alert("친구 관계가 되었습니다");
      })
      .catch((err) => {
        alert("오류가 발생했습니다");
        console.log(err);
      });
    setFriendId(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        유저 검색
      </Button>
      {friends.map((friend, index) => (
        <p key={index} style={{ margin: "20px 0 20px" }}>
          {friend}
        </p>
      ))}

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
              <Button variant="primary" onClick={addFriend}>
                친구요청
              </Button>
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
