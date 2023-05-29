import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Register&Login.css";

const SignUp = () => {
  const [member_email, setEmail] = useState("");
  const [member_pw, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [member_name, setName] = useState("");
  const [member_nick, setNick] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (member_pw !== passwordCheck) {
      return setPasswordError(true);
    }
  };

  // Coustom Hook 이전
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    setPasswordError(e.target.value !== member_pw);
    setPasswordCheck(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNick = (e) => {
    setNick(e.target.value);
  };

  const addMember = () => {
    const currentDate = new Date();
    const formattedDateTime = currentDate
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    return axios
      .post("http://172.30.1.85:8002/api/auth/signup", {
        member_email: member_email,
        member_pw: member_pw,
        member_name: member_name,
        member_nick: member_nick,
        createdAt: formattedDateTime,
      })
      .then((res) => {
        alert("회원가입이 완료되었습니다");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("회원가입에 실패하였습니다.");
      });
  };

  return (
    <div className="SignUp">
      <div className="auth-form-container">
        <h2>회원가입</h2>
        <form className="register-form" onSubmit={onSubmit}>
          <label htmlFor="member_email" className="register-label">
            이메일
          </label>
          <input
            className="register-input"
            id="member_email"
            type="text"
            value={member_email}
            required
            onChange={onChangeEmail}
          ></input>
          <label htmlFor="member_pw" className="register-label">
            비밀번호
          </label>
          <input
            className="register-input"
            id="member_pw"
            type="password"
            value={member_pw}
            required
            onChange={onChangePassword}
          ></input>
          <label htmlFor="member-password-check" className="register-label">
            비밀번호확인
          </label>
          <input
            className="register-input"
            id="member-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordChk}
          ></input>
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
          <label htmlFor="member_name" className="register-label">
            이름
          </label>
          <input
            className="register-input"
            id="member_name"
            type="text"
            value={member_name}
            required
            onChange={onChangeName}
          ></input>
          <label htmlFor="member_nick" className="register-label">
            닉네임
          </label>
          <input
            className="register-input"
            id="member_nick"
            type="text"
            value={member_nick}
            required
            onChange={onChangeNick}
          ></input>
          <br></br>
          <button
            className="register-button"
            onClick={() => addMember()}
            type="submit"
            style={{
              borderRadius: "10px",
              cursor: "pointer",
              padding: "20px",
              margin: "20px 0",
            }}
          >
            가입하기
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/")}>
          홈으로 이동하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
