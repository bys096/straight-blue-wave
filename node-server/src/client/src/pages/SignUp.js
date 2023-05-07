import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Container, Form } from "react-bootstrap";

const SignUp = () => {
  const [user_id, setId] = useState("");
  const [user_name, setName] = useState("");
  const [user_pw, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [user_gender, setGender] = useState("male");
  const [user_birth, setBirth] = useState("");
  const [user_email, setEmail] = useState("");

  const history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (user_pw !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log({
      user_id,
      user_name,
      user_pw,
      passwordCheck,
      user_gender,
      user_birth,
      term,
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({ user_id, user_pw, user_name, user_gender, user_email })
    );

    if (sessionStorage.getItem("user") != null) {
      history("/");
    }
  };

  // Coustom Hook 이전
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(e.target.value !== user_pw);
    setPasswordCheck(e.target.value);
  };
  const onChangeTerm = (e) => {
    //체크박스 초기화
    setTermError(false);
    setTerm(e.target.checked);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const addMember = () => {
    return axios
      .post("http://172.30.1.7:8002/api/member/register", {
        user_id: user_id,
        user_pw: user_pw,
        user_name: user_name,
        user_gender: user_gender,
        user_email: user_email,
        user_birth: user_birth,
      })
      .then((res) => {
        console.log(res);
        alert("회원가입이 완료되었습니다");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h1>회원가입</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label htmlFor="user_id">아이디</Form.Label>
          <Form.Control
            name="user_id"
            value={user_id}
            required
            onChange={onChangeId}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user_pw">비밀번호</Form.Label>
          <Form.Control
            name="user_pw"
            type="password"
            value={user_pw}
            required
            onChange={onChangePassword}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user-password-check">비밀번호체크</Form.Label>
          <Form.Control
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordChk}
          />
          {passwordError && (
            <Alert variant="danger">비밀번호가 일치하지 않습니다.</Alert>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user_name">이름</Form.Label>
          <Form.Control
            name="user_name"
            value={user_name}
            required
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user_birth">나이</Form.Label>
          <Form.Control
            type="date"
            name="user_birth"
            value={user_birth}
            onChange={onChangeBirth}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user_email">이메일</Form.Label>
          <Form.Control
            type="email"
            name="user_email"
            value={user_email}
            onChange={onChangeEmail}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="user_gender">성별</Form.Label>
          <Form.Control
            as="select"
            name="user_gender"
            value={user_gender}
            onChange={onChangeGender}
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            name="user-term"
            value={term}
            onChange={onChangeTerm}
            label="동의 합니까?"
          />
          {termError && (
            <Alert variant="danger">약관에 동의하셔야 합니다.</Alert>
          )}
        </Form.Group>
        <Button onClick={() => addMember()} type="primary" htmltype="submit">
          가입하기
        </Button>
      </Form>
      <div style={{ marginTop: 10 }}>
        <Link to="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </Container>
  );
};

export default SignUp;
