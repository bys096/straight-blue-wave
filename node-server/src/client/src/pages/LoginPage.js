import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function LoginPage() {
  const navigate = useNavigate();
  const [user_id, setUserid] = useState("");
  const [user_pw, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios

      .post("http://172.30.1.7:8002/api/member/login", {
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
          navigate("/LoggedIn");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Userid</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userid"
                value={user_id}
                onChange={(e) => setUserid(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={user_pw}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ margin: "10px" }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
