import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [user_id, setUserid] = useState("");
  const [user_pw, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("http://172.30.1.7:8002/api/login", {
        user_id: user_id,
        user_pw: user_pw,
      })
      .then((res) => {
        console.log("res.data.user_id : ", res.data.user_id);
        console.log("res.data.user_pw : ", res.data.user_pw);
        if (res.data.user_id === undefined) {
          alert("입력하신 로그인 정보가 일치하지 않습니다.");
        } else if (res.data.user_id === user_id) {
          sessionStorage.setItem("user_num", res.data.id);
          sessionStorage.setItem("user_id", user_id);
          alert("로그인 성공");
          navigate("/LoggedIn");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Userid"
          value={user_id}
          onChange={(e) => setUserid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={user_pw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginPage;
