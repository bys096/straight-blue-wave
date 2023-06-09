import React, { useState, useEffect } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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


const PostList = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
`;

const PostPage = () => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [show, setShow] = useState(false);
	const [selectedPost, setSelectedPost] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = (post) => {
		setSelectedPost(post);
		setShow(true);
	};

	const fetchPosts = () => {
		axios
			.post("http://localhost:8002/api/post/list", {
				page: 1,
				size: 10,
				boardId: sessionStorage.getItem("boardid"),
			})
			.then((res) => {
				setPosts(res.data.dtoList);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<Main>
				<Header />
				<Article>
					<Sidebar />
					<Content>
						<PostList>
							<div>
								<h2>게시글 목록</h2>
								<Button onClick={() => navigate("/createpost")}>게시글 작성</Button>
								<Button onClick={() => navigate(-1)}>이전 화면</Button>
							</div>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>제목</th>
                    <th>약속일</th>
                    <th>작성자</th>
										<th>작성일</th>
                    
									</tr>
								</thead>
								<tbody>
									{posts.map((post) => (
										<tr key={post.post_id} onClick={() => handleShow(post)}>
											<td>{post.post_id}</td>
											<td>{post.post_name}</td>
                      <td>{post.meeting_date}</td>
                      <td>{post.memId}</td>
											<td>{new Date(post.createdAt).toLocaleDateString()}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</PostList>
					</Content>
				</Article>
			</Main>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{selectedPost.post_name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{selectedPost.post_content}</Modal.Body>
			</Modal>
		</div>
	);
};

export default PostPage;
