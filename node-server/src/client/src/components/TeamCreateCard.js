import React, { useRef, useState } from "react";
import { Card, Button, Modal, Form, Image } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateTeamImage } from "../actions/team";

import { PiPlusThin } from 'react-icons/pi';

// const StyledCard = styled(Card)`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	text-align: center;
// 	cursor: pointer;
// 	width: 10rem; // 원하는 너비 지정
// 	height: 12rem; // 원하는 높이 지정
// 	border-radius: 10px; // 카드 모서리 둥글게 처리
// 	text-decoration: none;

// 	&:hover {
// 		transform: scale(1.05);
// 		transition: all 0.2s ease-in-out;
// 	}
// `;

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
	color: #0095f6;
	display: inline-block;
	cursor: pointer;
`;

const AddImage = styled(Image)`
	width: 25vh;
	height: 25vh;
	object-fit: fill;
	margin: 15px;
`;

const Plus = styled(PiPlusThin)`
	width: 100%;
	height: 100%;
	padding: 1em;
	color: #0085AD;
`;

const TeamCreateCard = () => {
	const imgRef = useRef(null);
	const dispatch = useDispatch();

	const [imgFile, setImgFile] = useState(
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
	);
	const [showModal, setShowModal] = useState(false);
	const [teamName, setTeamName] = useState("");
	const [teamDesc, setTeamDesc] = useState("");
	const [presignedUrl, setPresignedUrl] = useState("");
	const [encodedFileName, setEncodedFileName] = useState("");

	const [selectedFile, setSelectedFile] = useState(null);

	// 이미지 업로드 input의 onChange
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

	const handleClose = () => {
		setShowModal(false);
		setTeamName("");
		setTeamDesc("");
		setImgFile(
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
		);
	};

	const handleShow = () => {
		setShowModal(true);
	};

	const handleCreateTeam = async () => {
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

		console.log(imageUrl);

		await axios
			.post(
				`http://localhost:8002/api/team/joinTeam/${sessionStorage.getItem(
					"memid"
				)}`,
				{
					teamName: teamName,
					teamDesc: teamDesc,
					team_photo: imageUrl,
				}
			)
			.then((res) => {
				// Team created successfully
				alert("팀 생성이 완료되었습니다");
				handleClose();
				window.location.reload();
			})
			.catch((err) => {
				alert("팀 생성에 실패하였습니다");
				console.log(err);
				// Handle error
			});
	};

	return (
		<>
			<div class="card cardPuls hover" onClick={handleShow} >
				<Card.Body>
					<Plus />
				</Card.Body>
			</div>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title tyle={{ fontWeight: 'bold' }}>팀 생성</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
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
							<ImageLabel htmlFor="teamImage" style={{ color:'#0085AD' }}>
								이미지 삽입
							</ImageLabel>
						</Form.Group>
						<Form.Group>
							<Form.Label>팀 이름</Form.Label>
							<input
								type="text"
								value={teamName}
								onChange={(e) => setTeamName(e.target.value)}
								required
								className="inputLong"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>팀 설명</Form.Label>
							<textarea
								as="textarea"
								rows={3}
								value={teamDesc}
								onChange={(e) => setTeamDesc(e.target.value)}
								required
								className="textArea"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						취소
					</Button>
					<Button variant="primary" onClick={handleCreateTeam}>
						생성
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TeamCreateCard;
