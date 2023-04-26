import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const SignUp = () =>{
    const [user_id,setId] = useState('');
    const [user_name,setName] = useState('');
    const [user_pw,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [user_gender, setGender] = useState('');
    const [user_birth, setBirth] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_class, setUserClass] = useState('');

    const history = useNavigate();
     


    // 세션 스토리지에 회원가입 정보 저장
    
    const onSubmit = (e) => {
        e.preventDefault();

        if(user_pw!== passwordCheck){
            return setPasswordError(true);
        }
         if(!term){
            return setTermError(true);
        }
        console.log({
            user_id,
            user_name,
            user_pw,
            passwordCheck,
            user_gender,
            user_birth,
            term
        });

        sessionStorage.setItem('user', JSON.stringify({ user_id, user_pw, user_name, user_gender, user_email }));

        if(sessionStorage.getItem("user") != null) {
           history('/');
        }
    } 

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
        setGender(e.target.value)
    }

    const onChangeBirth = (e) => {
        setBirth(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeUserClass = (e) => {
      setUserClass(e.target.value)
  }

  
    // axios 임시
    /*
    const onSubmit = async (e) => {
      e.preventDefault();
      //검증 로직 만들기
      // 1. 비밀번호와 비밀번호 체크가 다를 경우를 검증한다
      // 2. 약관 동의를 확인한다.
       
      if(user_pw !== passwordCheck){
          return setPasswordError(true);
      }
      if(!term){
          return setTermError(true);
      }
      console.log({
        user_id,
        user_pw,
        passwordCheck,
        user_name,
        user_gender,
        user_birth,
        user_email,
        term
      });
      try {
          const response = await axios.post('http://localhost:8080/user/join', {
            user_id:user_id,
            user_pw,
            user_name,
            user_birth,
            user_email,
            user_class,
            user_gender
          });
    
          if (response.data.success) {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            history('/');
          } else {
            history('/');
          }
        } catch (error) {
          console.error('Signup error:', error);
          alert("회원가입 오류!")
        }
  }; */

    return (
        <Container>
          <h1>Sign Up</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="user_id">아이디</Form.Label>
              <Form.Control name="user_id" value={user_id} required onChange={onChangeId} />
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
              <Form.Control name="user_name" value={user_name} required onChange={onChangeName} />
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
              <Form.Label htmlFor="user_class"></Form.Label>
              <Form.Control
                type="text"
                name="user_class"
                value={user_class}
                onChange={onChangeUserClass}
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
            <Button type="primary" htmltype="submit">
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