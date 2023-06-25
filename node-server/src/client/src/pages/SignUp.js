import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Register&Login.css";
import { Button, Form, Image } from "react-bootstrap";
import styled from "styled-components";

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

const ImageLabel = styled(Form.Label)`
	margin: 5px 0 20px 0;
	font-weight: bold;
	font-size: 13px;
	// color: #0095f6;
	display: inline-block;
	cursor: pointer;
`;

const AddImage = styled(Image)`
	width: 25vh;
	height: 25vh;
	object-fit: fill;
	margin: 15px;
`;

const SignUp = () => {
	const [member_email, setEmail] = useState("");
	const [member_pw, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [member_name, setName] = useState("");
	const [member_nick, setNick] = useState("");
	const [validEmail, setValidEmail] = useState(false);

	const imgRef = useRef(null);
	const navigate = useNavigate();

	const [imgFile, setImgFile] = useState(
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
	);
	const [presignedUrl, setPresignedUrl] = useState("");
	const [encodedFileName, setEncodedFileName] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	const saveImgFile = async () => {
		const file = imgRef.current.files[0];
		setSelectedFile(file);
		setImgFile(file);
		const maxSize = 5 * 1024 * 1024;
		const fileSize = file.size;

		if (fileSize > maxSize) {
			alert("5MB 이상의 사진은 업로드하실 수 없습니다.");
			return;
		}

		const filename = file.name;
		const filetype = file.type;

		try {
			const res = await axios.get("http://localhost:8002/api/aws/s3/url", {
				params: { filename, filetype },
			});

			setEncodedFileName(res.data.encodedFileName);
			setPresignedUrl(res.data.preSignedUrl);

			console.log("presignedUrl: " + res.data.preSignedUrl);
			console.log("encodedFileName: " + res.data.encodedFileName);
		} catch (err) {
			console.log(err);
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImgFile(reader.result);
		};
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (member_pw !== passwordCheck) {
			return setPasswordError(true);
		}
	};

	// Coustom Hook 이전
	const onChangeEmail = (e) => {
		const inputValue = e.target.value;
		setEmail(inputValue);
		setValidEmail(validateEmail(inputValue));
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

	const addMember = async () => {
    console.log(presignedUrl);
		let imageUrl = "";
		if (!selectedFile || !presignedUrl) {
			imageUrl =
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
		}

		await axios
			.put(presignedUrl, selectedFile)
			.then((res) => {
				console.log(res);
				imageUrl = presignedUrl.split("?")[0];
			})
			.catch((err) => {
				if (err.response.status === 419) {
					this.$store.dispatch("handleTokenExpired");
				} else console.error("s3 upload error:", err);
			});

		if (!validEmail) {
			alert("이메일 형식이 맞지 않습니다.");
			return;
		}
		if (passwordError) {
			alert("비밀번호가 다릅니다");
			return;
		}
		const currentDate = new Date();
		const formattedDateTime = currentDate
			.toISOString()
			.replace("T", " ")
			.split(".")[0];

		await axios
			.post("http://localhost:8002/api/auth/signup", {
				member_email: member_email,
				member_pw: member_pw,
				member_name: member_name,
				member_nick: member_nick,
				createdAt: formattedDateTime,
				profile_photo: imageUrl,
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

	const checkEmail = async () => {
		if (member_email === "") {
			alert("값이 비어있습니다");
			return;
		}
		await axios
			.get(`http://localhost:8002/api/auth/exist/${member_email}`)
			.then((res) => {
				if(res.data === true) {
					alert("이미 가입한 이메일 입니다.")
				} else {
					alert("사용 가능한 이메일 입니다.")
				}
			})
			.catch(() => {

			});
	};

	const validateEmail = (email) => {
		// 이메일 형식을 확인하는 정규식
		const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailPattern.test(email);
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
					{!validEmail && (
						<p className="error-message">유효한 이메일 형식을 입력해주세요.</p>
					)}
					<Button
						style={{ backgroundColor: "white", margin: "0 0 10px" }}
						onClick={checkEmail}
					>
						중복체크
					</Button>
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
					<Form.Group>
						<ImageContainer>
							<AddImage src={imgFile} roundedCircle />
							<Form.Control
								style={{ display: "none" }}
								id="teamImage"
								type="file"
								accept="image/*"
								onChange={saveImgFile}
								ref={imgRef}
							/>
						</ImageContainer>
						<ImageLabel htmlFor="teamImage">이미지 삽입</ImageLabel>
					</Form.Group>
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
