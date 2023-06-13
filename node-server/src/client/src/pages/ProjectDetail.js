import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import Notification from "./notification";

const Main = styled.div`
	height: 100%;
	width: 100%;
`;

const Article = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	height: 100%;
	width: 100%;
`;

const BoardList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 80%;
`;
const BoardItem = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: 100%;
	width: 100%;
	margin: 1rem;
	padding: 20px;

	background-color: #aaaaaa;
`;

const ProjectDetail = (prjId) => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [boardName, setBoardName] = useState("");
	const [boardList, setBoardList] = useState([]);
	const [posts, setPosts] = useState([]);

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
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const fetchPosts = (boardId) => {
		axios
			.post("http://localhost:8002/api/post/list", {
				page: 1,
				size: 5,
				boardId: boardId,
			})
			.then((res) => {
				setPosts((prevPosts) => ({
					...prevPosts,
					[boardId]: res.data.dtoList,
				}));
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getBoardList();
	}, []);

	useEffect(() => {
		boardList.forEach((board) => {
			fetchPosts(board.brd_id);
		});
	}, [boardList]);

	const handleBoardSubmit = () => {
		axios
			.post("http://localhost:8002/api/board/create", {
				brd_name: boardName,
				prj_id: `${sessionStorage.getItem("prjid")}`,
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
		<Main>
			<Notification></Notification>
			<Header />
			<Article>
				<Sidebar />
				<Content>
					<div>
						<Button variant="primary" onClick={() => navigate(-1)}>
							프로젝트 목록
						</Button>
					</div>

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

					<BoardList>
						<h2>최근 이슈</h2>
						{boardList.map((board) => (
							<BoardItem
								key={board.brd_id}
								onClick={() => {
									navigate("/post");
									sessionStorage.setItem("boardid", board.brd_id);
								}}
							>
								<h4>{board.brd_name}</h4>
								<Table>
									<tr>
										<th>작성일</th>
										<th>제목</th>
										<th>작성자</th>
									</tr>
									{posts[board.brd_id]?.map((post) => (
										<tbody>
											<tr key={post.post_id}>
												<td>{post.createdAt}</td>
												<td>{post.post_name}</td>
												<td>{post.mem_id}</td>
											</tr>
										</tbody>
									))}
								</Table>
							</BoardItem>
						))}
					</BoardList>
				</Content>
			</Article>
		</Main>
	);
};

export default ProjectDetail;
