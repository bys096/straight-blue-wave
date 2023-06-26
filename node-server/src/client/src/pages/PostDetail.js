import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { BsArrowReturnRight } from "react-icons/bs";

import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Viewer } from '@toast-ui/react-editor';

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
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;
  // width: 100%;
  margin: 2rem;
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

  const [comments, setComments] = useState([]);

  const [replies, setReplies] = useState(
    localStorage.getItem(post.post_id + "_replies")
      ? JSON.parse(localStorage.getItem(post.post_id + "_replies"))
      : []
  );

  const fetchReply = async () => {
    await axios
      .get(`http://localhost:8002/api/reply/replies/${post.post_id}`)
      .then((res) => {
        setComments(res.data);
        setReplies(res.data.children);
        console.log(replies);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 추가 함수
  const addComment = async (event) => {
    try {
      if (event.key === "Enter" && event.target.value !== "") {
        const newComment = {
          replyContent: event.target.value,
          memId: auth.memberId,
          postId: post.post_id,
          // id: Math.random().toString(36).substr(2, 9),
          // text: event.target.value,
          // createdAt: new Date().toISOString(),
          // member: auth.memberNick,
        };

        // If there's an active comment, add a reply to it
        if (activeCommentId) {
          const newReply = {
            ...newComment,
            parentId: activeCommentId,
          };
          // setReplies((prevReplies) => [...prevReplies, newReply]);
          await axios.post("http://localhost:8002/api/reply/create", newReply);
          // localStorage.setItem(
          //    post.post_id + "_replies",
          //    JSON.stringify([...replies, newReply])
          // );
          setActiveCommentId(null); // Reset the active comment ID
        } else {
          // Otherwise, add a new comment
          // setComments((prevComments) => [...prevComments, newComment]);
          await axios.post(
            "http://localhost:8002/api/reply/create",
            newComment
          );
          // localStorage.setItem(
          //    post.post_id,
          //    JSON.stringify([...comments, newComment])
          // );
        }
        await fetchReply();
        event.target.value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostDelete = async () => {
    if (post.mem_id === auth.memberId || post.mem_nick === "AI 어시스턴트") {
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
        <Content style={{ margin: "3rem", paddingLeft: "280px" }}>
          <Button
            onClick={() => navigate(-1)}
            className="mb-4 MybtnDe"
            style={{ width: "6rem", marginRight: "auto" }}
          >
            글 목록
          </Button>
          <div className="cardsb">
            <div>
              <PostTitle>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "-0.1rem",
                    color: "#0085AD",
                  }}
                >
                  {board.brd_name}
                </p>
                <h4 style={{ fontWeight: "bold" }}>{post.post_name}</h4>
                <div style={{ fontWeight: "bold" }}>{post.mem_name}</div>
                <div style={{ fontSize: "12px" }}>
                  {new Date(post.post_createAt).toLocaleDateString()}
                </div>
              </PostTitle>
            </div>
            <PostContent.Body>
              <Viewer initialValue={post.post_content}></Viewer>
            </PostContent.Body>
            <PostContent.Footer>
              <CommentSection>
                {comments.map((comment) => (
                  <Comments key={comment.replyId}>
                    <CommentItem
                      onClick={() => setActiveCommentId(comment.replyId)}
                      style={
                        activeCommentId === comment.replyId
                          ? { backgroundColor: "lightgray" }
                          : {}
                      }
                    >
                      <div style={{ fontWeight: "bold" }}>{comment.writer}</div>
                      <div>{comment.replyContent}</div>
                      <div style={{ fontSize: "12px" }}>
                        {new Date(comment.replyCreateAt).toLocaleDateString()}
                      </div>
                    </CommentItem>
                    {/* Render replies */}
                    <Replies>
                      {comment.children.map((reply) => (
                        <ReplySection key={reply.replyId}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <BsArrowReturnRight
                              style={{ marginLeft: "20px" }}
                            />
                            <div style={{ marginLeft: "10px" }}>
                              <ReplyHeader style={{ fontWeight: "bold" }}>
                                {reply.writer}
                              </ReplyHeader>
                              <div>{reply.replyContent}</div>
                              <div style={{ fontSize: "12px" }}>
                                {new Date(
                                  reply.replyCreateAt
                                ).toLocaleDateString()}
                              </div>
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
                  activeCommentId
                    ? "대댓글을 입력하세요..."
                    : "댓글을 입력하세요..."
                }
                onKeyDown={addComment}
              />
              {activeCommentId ? (
                <Button onClick={() => setActiveCommentId(null)}>
                  답글 취소
                </Button>
              ) : null}
              <br />
            </PostContent.Footer>
          </div>
          <ButtonGroup style={{ width: "6rem", marginLeft: "auto" }}>
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
