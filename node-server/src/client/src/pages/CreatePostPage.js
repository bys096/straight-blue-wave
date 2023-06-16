import React, { useState } from "react";
import { Button, Form, FormCheck } from "react-bootstrap";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
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
	const location = useLocation();
	const isModify = location.state?.isModify || false;
	const posts = location.state?.posts;
	

	const [post, setPost] = useState(
		isModify
			? posts
			: {
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
			  }
	);

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

			const modifiedPost = {
				...post,
				mem_id: sessionStorage.getItem("memid"),
				mem_nick: sessionStorage.getItem("memnick"),
				brd_id: sessionStorage.getItem("boardid"),
			};

			const eventData = {
				prjRoom: sessionStorage.getItem('prjroom'), 
				prjName: sessionStorage.getItem('prjname'),
				post_name: post.post_name,
				post_content: post.post_content,
				meeting_date: post.meeting_date,
				mem_id: post.mem_id
			};

			socket.emit("eventData", eventData);
			if (isModify) {
				await axios.put(
					`http://localhost:8002/api/post/modify/${posts.post_id}`,
					modifiedPost
				);
				alert("게시글이 수정되었습니다.");
				console.log(modifiedPost);
				navigate(-2);
			} else {
				await axios.post("http://localhost:8002/api/post/create", modifiedPost);
				alert("게시글이 등록되었습니다.");
				navigate(-1);
			}
		} catch (error) {
			alert("게시글 등록에 실패하였습니다.");
			navigate(-1);
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
					<div>{isModify ? <h2>게시글 수정</h2> : <h2>게시글 작성</h2>}</div>
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
									checked={isChecked}
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
