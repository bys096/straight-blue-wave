import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register&Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [member_email, setMemEmail] = useState("");
  const [member_pw, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:8002/api/auth/login", {
        member_email: member_email,
        member_pw: member_pw,
      })
      .then((res) => {
        if (res.data.accessToken === undefined) {
          alert("입력하신 로그인 정보가 일치하지 않습니다.");
        } else {
          sessionStorage.setItem("accessToken", res.data.accessToken);
          sessionStorage.setItem("refreshToken", res.data.refreshToken);
          const memberInfo = axios
            .get(`http://localhost:8002/api/member/${member_email}`)
            .then((res) => {
              sessionStorage.setItem("memid", res.data.member_id);
            })
            .catch((err) => {
              console.log(err);
            });
          alert("로그인 성공!");
          navigate("/LoggedIn");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("입력하신 로그인 정보가 일치하지 않습니다.");
      });
  };

  return (
    <>
      <div className="Login">
        <div className="auth-form-container">
          <h2 onClick={() => navigate("/")}>BlueWave</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="userid" className="register-label">
              이메일
            </label>
            <input
              className="register-input"
              type="text"
              placeholder="이메일을 입력해주세요..."
              value={member_email}
              onChange={(e) => setMemEmail(e.target.value)}
            ></input>
            <label htmlFor="password" className="register-label">
              비밀번호
            </label>
            <input
              className="register-input"
              type="password"
              placeholder="비밀번호를 입력해주세요..."
              value={member_pw}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            <button
              className="register-button"
              type="submit"
              style={{
                borderRadius: "10px",
                cursor: "pointer",
                padding: "20px",
                margin: "20px 0",
              }}
            >
              로그인
            </button>
          </form>
          <button className="link-btn" onClick={() => navigate("/SignUp")}>
            아직 회원이 아니신가요? 바로 여기서 회원가입을 진행할 수 있습니다.
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
