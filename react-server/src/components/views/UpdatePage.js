import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Container, Form, Button, Alert} from "react-bootstrap";

const Update = () => {
	const storedUser = sessionStorage.getItem("user");
	let storedId,
		storedName,
		storedBirth,
		storedGender,
        storedEmail,
        storedClass = "";

	// sessionStorage에서 값 불러오기
	if (storedUser) {
		const {user_id, user_name, gender, user_birth, user_email, user_class} = JSON.parse(storedUser);
		storedId = user_id;
		storedName = user_name;
		storedGender = gender;
		storedBirth = user_birth;
        storedEmail = user_email;
        storedClass = user_class;
	}

	const [id, setId] = useState(storedId);
	const [name, setName] = useState(storedName);
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [term, setTerm] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);
	const [gender, setGender] = useState(storedGender);
    const [user_birth, setBirth] = useState(storedBirth);
    const [user_email, setEmail] = useState(storedEmail);
    const [user_class, setUserClass] = useState(storedClass);

	const history = useNavigate();

	// axios 임시
	//  const onSubmit = async (e) => {
	//     e.preventDefault();
	//     /**검증 로직 만들기
	//      * 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
	//      * 2. 약관 동의를 확인한다.
	//      */
	//     if(password !== passwordCheck){
	//         return setPasswordError(true);
	//     }
	//     if(!term){
	//         return setTermError(true);
	//     }
	//     console.log({
	//         id,
	//         nick,
	//         password,
	//         passwordCheck,
	//         gender,
	//         age,
	//         term
	//     });
	//     try {
	//         const response = await axios.post('http://localhost:8080/api/signup', {
	//           id,
	//           nick,
	//           password,
	//           gender,
	//           age,
	//         });

	//         if (response.data.success) {
	//           sessionStorage.setItem('user', JSON.stringify(response.data.user));
	//           history.push('/login');
	//         } else {
	//           alert('Signup failed');
	//         }
	//       } catch (error) {
	//         console.error('Signup error:', error);
	//         alert("회원가입 오류!")
	//       }
	// };

	//Submit 버튼 동작
	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
		console.log({
			id,
			name,
			password,
			passwordCheck,
			gender,
			user_birth,
			term,
		});

		sessionStorage.setItem(
			"user",
			JSON.stringify({id, password, name, gender, user_birth, user_class, user_email})
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
		setPasswordError(e.target.value !== password);
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

	const onChangeAge = (e) => {
		setBirth(e.target.value);
	};

	return (
		<Container>
			<h1>정보 수정</h1>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label htmlFor="user-id">아이디</Form.Label>
					<Form.Control
						name="user-id"
						value={id}
						required
						onChange={onChangeId}
						readOnly
					/>
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
					<Form.Label htmlFor="user-name">이름</Form.Label>
					<Form.Control
						name="user-name"
						value={name}
						required
						onChange={onChangeName}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="gender">성별</Form.Label>
					<Form.Control
						as="select"
						name="gender"
						value={gender}
						onChange={onChangeGender}>
						<option value="male">남성</option>
						<option value="female">여성</option>
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="user_birth">생일</Form.Label>
					<Form.Control
						type="date"
						name="birth"
						onChange={onChangeAge}
						required></Form.Control>
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
			<div style={{marginTop: 10}}>
				<Link to="/">
					<Button>홈으로 돌아가기</Button>
				</Link>
			</div>
		</Container>
	);
};

export default Update;
