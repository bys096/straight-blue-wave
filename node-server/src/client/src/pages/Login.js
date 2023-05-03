import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Nav,
	ButtonGroup,
} from "react-bootstrap";
import axios from "axios";

const Login = () => {
	const [user_id, setId] = useState("");
	const [user_pw, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const history = useNavigate();

	// axios 임시
	/* const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/user/login', {
              id,
              password,
            });
      
            if (response.data.success) {
              sessionStorage.setItem('user', JSON.stringify(response.data.user));
              history.push('/');
            } else {
              alert('Invalid credentials');
            }
          } catch (error) {
            console.error('Login error:', error);
            alert("로그인 에러!");
          }
    }; */

	// sessionStorage에 저장된 내용을 storedUser에 저장
	const storedUser = sessionStorage.getItem("user");
	let storedName = "";

	if (storedUser) {
		const {user_name} = JSON.parse(storedUser);
		storedName = user_name;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (storedUser) {
			const {user_id: storedId, user_pw: storedPassword} = JSON.parse(storedUser);
			if (user_id === storedId && user_pw === storedPassword) {
				setIsLoggedIn(true);
				history("/");
			} else {
				alert("ID 혹은 비밀번호가 틀립니다.");
			}
		} else {
			alert("해당 사용자가 존재하지 않습니다.");
		}
	};

	//로그아웃시 sessionStorage에 저장된 내용 삭제
	const handleLogout = () => {
		sessionStorage.removeItem("user");
		setIsLoggedIn(false);
		history("/");
		setId("");
		setPassword("");
	};

	const onChangeId = (e) => {
		setId(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<Container className="justify-content-end">
			{isLoggedIn ? (
				<Row className="justify-content-end">
					<Col xs="auto">
						<div>Hello, {storedName}</div>
						<ButtonGroup className="mt-2">
						<Button variant="primary" onClick={handleLogout} className="me-2">
							로그아웃
						</Button>
						<Nav>
							<Link to="/Update">
								<Button variant="primary">정보수정</Button>
							</Link>
						</Nav>
						</ButtonGroup>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-end">
					<Col xs="auto">
						<Form onSubmit={onSubmit}>
							<Row>
								<Col xs="auto">
									<Form.Group controlId="formId">
										<Form.Label>ID :</Form.Label>
										<Form.Control
											type="text"
											name="id"
											value={user_id}
											onChange={onChangeId}
											required
										/>
									</Form.Group>
								</Col>
								<Col xs="auto">
									<Form.Group controlId="formPassword">
										<Form.Label>P/W :</Form.Label>
										<Form.Control
											type="password"
											name="password"
											value={user_pw}
											onChange={onChangePassword}
											required
										/>
									</Form.Group>
								</Col>
							</Row>
							<ButtonGroup className="mt-2">
								<Button variant="primary" type="submit" className="me-5">
									로그인
								</Button>
								<Link to="/SignUp">
									<Button variant="primary">회원가입</Button>
								</Link>
							</ButtonGroup>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default Login;
