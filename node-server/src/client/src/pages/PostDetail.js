import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsArrowReturnRight } from "react-icons/bs";

import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";

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
	flex-direction: column;
	width: 100%;
`;

const PostTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
`;

const PostContent = styled(Card)`
	display: flex;
	width: 100%;
	min-height: 50%;
`;

const CommentSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
	margin: 5px;
`;

const CommentInput = styled.input`
	position: sticky;
	width: 90%;
	padding: 10px;
	margin: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
`;

const ReplySection = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	border-bottom: 1px solid gray;
`;

const Comments = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const CommentItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: 1px solid gray;
`;

const Replies = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 10px;
`;

const ReplyHeader = styled.div`
	width: 100%;
`;

const PostDetail = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useSelector((state) => state.authReducer.user);
	const post = location.state.post;
	const board = location.state.board;

	// const post = useSelector((state) => state.postReducer.post);
	// const board = useSelector((state) => state.boardReducer.board);

	console.log(post);

	const [activeCommentId, setActiveCommentId] = useState(null);

	const [comments, setComments] = useState(
		localStorage.getItem(post.post_id)
			? JSON.parse(localStorage.getItem(post.post_id))
			: []
	);

	const [replies, setReplies] = useState(
		localStorage.getItem(post.post_id + "_replies")
			? JSON.parse(localStorage.getItem(post.post_id + "_replies"))
			: []
	);

	// 댓글을 로컬스토리지에 추가하는 함수
	const addComment = (event) => {
		if (event.key === "Enter" && event.target.value !== "") {
			const newComment = {
				id: Math.random().toString(36).substr(2, 9),
				text: event.target.value,
				createdAt: new Date().toISOString(),
				member: auth.memberNick,
			};

			// If there's an active comment, add a reply to it
			if (activeCommentId) {
				const newReply = {
					...newComment,
					parentId: activeCommentId,
				};
				setReplies((prevReplies) => [...prevReplies, newReply]);
				localStorage.setItem(
					post.post_id + "_replies",
					JSON.stringify([...replies, newReply])
				);
				setActiveCommentId(null); // Reset the active comment ID
			} else {
				// Otherwise, add a new comment
				setComments((prevComments) => [...prevComments, newComment]);
				localStorage.setItem(
					post.post_id,
					JSON.stringify([...comments, newComment])
				);
			}

			event.target.value = "";
		}
	};

	const handlePostDelete = async () => {
		if (post.mem_id === auth.memberId) {
			await axios
				.delete(`http://localhost:8002/api/post/delete/${post.post_id}`)
				.then((res) => {
					console.log("글 삭제 완료", res.data);
					alert("글 삭제가 완료되었습니다.");
					navigate(-1);
				})
				.catch((error) => {
					console.error(error);
					console.log(error);
				});
		} else {
			alert("권한이 없습니다.");
		}
	};

	const handlePostModify = () => {
		if (post.mem_id === auth.memberId) {
			navigate(`/post/modify/${post.post_id}`, {
				state: { posts: post, isModify: true },
			});
		} else {
			alert("권한이 없습니다.");
		}
	};

	return (
		<Main>
			<Header />
			<Article>
				<Sidebar />
				<Content>
					<Button onClick={() => navigate(-1)}>글 목록</Button>
					<PostContent border="primary">
						<PostContent.Header>
							<PostTitle>
								<h5>
									[{board.brd_name}] {post.post_name}
								</h5>
								<div>작성자 : {post.mem_nick}</div>
								<div>{post.createdAt}</div>
							</PostTitle>
						</PostContent.Header>
						<PostContent.Body>
							<div>{post.post_content}</div>
						</PostContent.Body>
						<PostContent.Footer>
							<CommentSection>
								{comments.map((comment) => (
									<Comments key={comment.id}>
										<CommentItem
											onClick={() => setActiveCommentId(comment.id)}
											style={
												activeCommentId === comment.id
													? { backgroundColor: "lightgray" }
													: {}
											}
										>
											<div>{comment.member}</div>
											<div>{comment.text}</div>
											<div>{new Date(comment.createdAt).toLocaleDateString()}</div>
										</CommentItem>
										{/* Render replies */}
										<Replies>
											{replies
												.filter((reply) => reply.parentId === comment.id)
												.map((reply) => (
													<ReplySection key={reply.id}>
														<div style={{ display: "flex", alignItems: "center" }}>
															<BsArrowReturnRight style={{ marginLeft: "20px" }} />
															<div style={{ marginLeft: "10px" }}>
																<ReplyHeader>{post.mem_nick}</ReplyHeader>
																<div>{reply.text}</div>
																<div>{new Date(reply.createdAt).toLocaleDateString()}</div>
															</div>
														</div>
													</ReplySection>
												))}
										</Replies>
									</Comments>
								))}
							</CommentSection>
							<CommentInput
								type="text"
								placeholder={
									activeCommentId ? "대댓글을 입력하세요..." : "댓글을 입력하세요..."
								}
								onKeyDown={addComment}
							/>
							{activeCommentId ? (
								<Button onClick={() => setActiveCommentId(null)}>답글 취소</Button>
							) : null}
							<br />
						</PostContent.Footer>
					</PostContent>
					<ButtonGroup>
						<Button variant="secondary" onClick={handlePostModify}>
							수정
						</Button>
						<Button variant="danger" onClick={handlePostDelete}>
							삭제
						</Button>
					</ButtonGroup>
				</Content>
			</Article>
		</Main>
	);
};

export default PostDetail;
