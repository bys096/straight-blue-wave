import React from "react";
import Header from "../components/views/Header";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
  const navigate = useNavigate();

  const userUpdateButton = () => {
    navigate("/update");
  };

  const userDeleteButton = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(
          `http://172.30.1.7:8002/api/delete/${parseInt(
            sessionStorage.getItem("user_num")
          )}`
        )
        .then((res) => {
          console.log("회원 탈퇴 완료", res.data);
          alert("회원 삭제가 완료되었습니다.");
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
    </div>
  );
};

export default SettingPage;
