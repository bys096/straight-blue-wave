import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "../components/views/Header";

const UpdatePage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [gender, setGender] = useState("");
  const [user_birth, setBirth] = useState("");
  const [user_email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://172.30.1.7:8002/api/member/${sessionStorage.getItem(
          "user_num"
        )}`
      )
      .then((res) => {
        setId(res.data.user_id);
        setPassword(res.data.user_pw);
        setName(res.data.user_name);
        setGender(res.data.user_gender);
        setEmail(res.data.user_email);
        setBirth(res.data.user_birth);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const history = useNavigate();

  //Submit 버튼 동작
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://172.30.1.7:8002/api/update/${sessionStorage.getItem(
          "user_num"
        )}`,
        {
          user_id: id,
          user_pw: password,
          user_name: name,
          user_gender: gender,
          user_email: user_email,
          user_birth: user_birth,
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("수정이 완료되었습니다.");
        history("/LoggedIn");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Coustom Hook 이전
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordChk = (e) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };
  const onChangeTerm = (e) => {
    //체크박스 초기화
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Header></Header>
      <Container>
        <h1>정보 수정</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label htmlFor="user-id">아이디</Form.Label>
            <Form.Control name="user-id" value={id} required readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="user_name">이름</Form.Label>
            <Form.Control name="user_name" value={name} required readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="user-password">비밀번호</Form.Label>
            <Form.Control
              name="user-password"
              type="password"
              value={password}
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
            <Form.Label htmlFor="user-email">이메일</Form.Label>
            <Form.Control
              name="user-email"
              type="email"
              value={user_email}
              required
              onChange={onChangeEmail}
            />
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
          <Button type="primary" htmltype="submit">
            정보수정
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UpdatePage;
