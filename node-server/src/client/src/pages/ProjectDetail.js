import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetail = (prjId) => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [boardName, setBoardName] = useState("");
	const [boardList, setBoardList] = useState([]);

	const goChattingRoom = () => {
		navigate("/chattingroom");
	};

	const goCalendar = () => {
		navigate("/calendar");
	};

	const goWBS = () => {
		navigate("/wbs");
	};

	const goGPT = () => {
		navigate("/gpt");
	};

	const makeBoard = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setBoardName("");
	};

	const handleBoardNameChange = (event) => {
		setBoardName(event.target.value);
	};

	const getBoardList = () => {
		axios
			.get(
				`http://localhost:8002/api/board/list/${sessionStorage.getItem("prjid")}`
			)
			.then((response) => {
				setBoardList(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getBoardList();
	}, []);

	const handleBoardSubmit = () => {
		axios
			.post("http://localhost:8002/api/board/create", { 
        brd_name: boardName,
        prj_id: `${sessionStorage.getItem("prjid")}`
      })
			.then((response) => {
				alert("게시판이 생성되었습니다.");
				getBoardList();
				setShowModal(false);
			})
			.catch((error) => {
				console.error(error);
				alert("게시판 생성에 실패하였습니다.");
			});
	};

	return (
		<div className="main">
			<Header />
			<div className="article">
				<Sidebar />
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						width: "100%",
					}}
				>
					<Button variant="primary" onClick={goChattingRoom}>
						채팅방
					</Button>
					<Button variant="primary" onClick={goCalendar}>
						캘린더
					</Button>
					<Button variant="primary" onClick={makeBoard}>
						게시판만들기
					</Button>
					<Button variant="primary" onClick={goWBS}>
						WBS
					</Button>
					<Button variant="primary" onClick={goGPT}>
						GPT
					</Button>
					<hr />
					<Modal show={showModal} onHide={handleModalClose}>
						<Modal.Header closeButton>
							<Modal.Title>게시판 만들기</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group>
								<Form.Label>게시판 이름</Form.Label>
								<Form.Control
									type="text"
									value={boardName}
									onChange={handleBoardNameChange}
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary" onClick={handleBoardSubmit}>
								만들기
							</Button>
						</Modal.Footer>
					</Modal>
					<br />
					<ListGroup>
						{boardList.map((board) => (
							<ListGroup.Item key={board.brdId} onClick={() => navigate("/post")}>
								{board.brdName}
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
