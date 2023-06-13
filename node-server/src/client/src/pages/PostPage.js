import React, { useState, useEffect } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Notification from "./notification";

const PostList = styled.div`
  display : flex;
  justify-content : between;
  align-items: center;
  flex-wrap: wrap;
`

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
        "page" : 1,
        "size" : 10,
        "boardId" : sessionStorage.getItem("boardid")
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
      <Notification></Notification>
      <div className="main">
        <Header />
        <div className="article">
          <Sidebar />
          <PostList>
            <div className="d-flex justify-content-between align-items-center">
              <h2>게시글 목록</h2>
              <Button onClick={() => navigate("/createpost")}>
                게시글 작성
              </Button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>제목</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.post_id} onClick={() => handleShow(post)}>
                    <td>{post.post_id}</td>
                    <td>{post.post_name}</td>
                    <td>{post.post_content}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PostList>
        </div>
      </div>
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
