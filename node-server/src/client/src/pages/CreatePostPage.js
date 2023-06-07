import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};

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
		} catch (error) {
			alert("게시글 등록에 실패하였습니다.");
			navigate("/post");
			console.error(error);
		}
	};

	return (
		<div>
			<Header />
			<div className="main">
				<div className="article">
					<Sidebar />
					<div className="section">
						<h2>게시글 작성</h2>
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
							<Button variant="primary" type="submit">
								등록
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePostPage;
