import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Form, Image} from "react-bootstrap";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

const StyledCard = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	cursor: pointer;
	width: 20vh; // 원하는 너비 지정
	height: 25vh; // 원하는 높이 지정
	border-radius: 10px; // 카드 모서리 둥글게 처리
	text-decoration: none;

	&:hover {
		transform: scale(1.05);
		transition: all 0.2s ease-in-out;
	}
`;

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

const Plus = styled(AiOutlinePlusCircle)`
	width: 100%;
	height: 100%;
	padding: 1em;
`;

const ProjectCreateCard = () => {
	const [showModal, setShowModal] = useState(false);
	const [prjName, setPrjName] = useState("");

	const imgRef = useRef(null);

	const [imgFile, setImgFile] = useState(
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
	);
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
		setPrjName("");
		setImgFile(
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
		);
	};

	const handleShow = () => {
		setShowModal(true);
	};

	const handleCreateProject = async () => {
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

		const currentDate = new Date();
		const formattedDateTime = currentDate
			.toISOString()
			.replace("T", " ")
			.split(".")[0];

		await axios
			.post("http://localhost:8002/api/project/create", {
				prj_name: prjName,
				team_id: sessionStorage.getItem("tmid"),
        prj_photo: imageUrl
			})
			.then((res) => {
				alert("프로젝트 생성이 완료되었습니다");
				handleClose();
				window.location.reload();
			})
			.catch((err) => {
				alert("프로젝트 생성에 실패하였습니다");
				console.log(err);
			});
	};

	return (
		<>
			<StyledCard className="project_create" onClick={handleShow}>
				<Card.Body>
					<Plus />
				</Card.Body>
			</StyledCard>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>팀 생성</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<ImageContainer>
								<AddImage src={imgFile} roundedCircle />
								<Form.Control
									style={{ display: "none" }}
									id="prjImage"
									type="file"
									accept="image/*"
									onChange={saveImgFile}
									ref={imgRef}
								/>
							</ImageContainer>
							<ImageLabel htmlFor="prjImage">이미지 삽입</ImageLabel>
						</Form.Group>
						<Form.Group>
							<Form.Label>프로젝트 이름</Form.Label>
							<Form.Control
								type="text"
								value={prjName}
								onChange={(e) => setPrjName(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						취소
					</Button>
					<Button variant="primary" onClick={handleCreateProject}>
						생성
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ProjectCreateCard;
