import React, { useState } from "react";
import { Button, Form, FormCheck } from "react-bootstrap";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Notification from "./notification";
import io from "socket.io-client";

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

const CreateForm = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
`;


const CreatePostPage = () => {
	const navigate = useNavigate();
	const [post, setPost] = useState({
		attendees_id: "",
		brd_id: "",
		file_status: false,
		meeting_date: "",
		mem_id: "",
		post_content: "",
		post_create_at: "",
		post_modify: "",
		post_name: "",
		voting_status: false,
	});

	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = (event) => {
		setIsChecked(event.target.checked);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};

	const socket = io();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(
				"http://localhost:8002/api/post/create",
				post,
				(post.brd_id = sessionStorage.getItem("boardid"))
			); // url은 백엔드 API 주소로 변경해주어야 합니다.
			alert("게시글이 등록되었습니다.");
			navigate("/post");

			const eventData = {
				prjRoom: sessionStorage.getItem('prjroom'), 
				post_name: post.post_name,
				post_content: post.post_content,
				meeting_date: post.meeting_date
			};

			socket.emit("eventData", eventData);

		} catch (error) {
			alert("게시글 등록에 실패하였습니다.");
			navigate("/post");
			console.error(error);
		}
	};

	return (
		<Main>
			<Notification></Notification>
			<Header />
			<Article>
				<Sidebar />
				<Content>
					<div>
						<h2>게시글 작성</h2>
					</div>
					<CreateForm>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>게시글 제목</Form.Label>
								<Form.Control
									type="text"
									name="post_name"
									value={post.post_name}
									onChange={handleInputChange}
									placeholder="게시글 제목을 입력해주세요."
									required
									size="lg"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>게시글 내용</Form.Label>
								<Form.Control
									as="textarea"
									name="post_content"
									value={post.post_content}
									onChange={handleInputChange}
									placeholder="게시글 내용을 입력해주세요."
									required
								/>
							</Form.Group>
							<Form.Group>
								<FormCheck
									type="checkbox"
									id="toCalendar"
									label="일정 추가"
									onChange={handleCheckboxChange}
								/>
								<Form.Label>일정 날짜</Form.Label>
								<Form.Control
									type="date"
									name="meeting_date"
									value={post.meeting_date}
									onChange={handleInputChange}
									required
									disabled={!isChecked}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								등록
							</Button>
						</Form>
					</CreateForm>
				</Content>
			</Article>
		</Main>
	);
};

export default CreatePostPage;
