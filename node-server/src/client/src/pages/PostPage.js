import React, { useState, useEffect } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Table, Modal, Pagination, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { postConnect } from "../actions/post";

import Notification from "./notification";
import { io } from "socket.io-client";
import Footer from "../components/views/Footer";

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
  margin: 5rem;
`;

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = io();

  const [posts, setPosts] = useState([]);
  // const [show, setShow] = useState(false);
  // const [selectedPost, setSelectedPost] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState();

  const location = useLocation();
  const board = location.state?.board;
  console.log(board);

  const handleShow = (post) => {
    navigate(`/post/${post.post_id}`, { state: { post, board } });
    dispatch(postConnect(post));
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  const fetchPosts = async () => {
    await axios
      .post("https://yjubluewave.shop/api/post/list", {
        page: currentPage,
        size: pageSize,
        boardId: sessionStorage.getItem("boardid"),
      })
      .then((res) => {
        setPosts(res.data.dtoList);
        setPageTotal(res.data.totalPage);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, pageSize]);

  return (
    <div>
      <Main>
        <Notification></Notification>
        <Header />
        <Article>
          <Sidebar />
          <Content style={{ paddingLeft: "280px", margin: "0 0 100px" }}>
            <PostList>
              <div>
                <div style={{ marginBottom: "3rem" }}>
                  <h2>{board.brd_name}</h2>
                </div>
                <div>
                  <button
                    onClick={() => navigate("/createpost")}
                    style={{ marginRight: "1rem" }}
                    className="MybtnDe"
                  >
                    게시글 작성
                  </button>
                  <button
                    onClick={() => navigate(-1, { replace: true })}
                    style={{ marginRight: "1rem" }}
                    className="MybtnDe"
                  >
                    이전 화면
                  </button>
                </div>
              </div>
              <Form.Select
                onChange={handlePageSize}
                aria-label="글갯수"
                style={{
                  width: "6rem",
                  margin: "70px 0 0",
                  marginLeft: "auto",
                }}
              >
                <option value="10">10개</option>
                <option value="30">30개</option>
                <option value="50">50개</option>
              </Form.Select>
              <Table className="tableList">
                <thead>
                  <tr style={{ color: "#0085AD" }}>
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
                      <td style={{ color: "#0085AD", fontWeight: "bold" }}>
                        {post.post_id}
                      </td>
                      <td>{post.post_name}</td>
                      <td>{post.meeting_date}</td>
                      <td>{post.mem_name}</td>
                      <td>
                        {new Date(post.post_createAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </PostList>
            <Pagination>
              <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(pageTotal).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageTotal}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(pageTotal)}
                disabled={currentPage === pageTotal}
              />
            </Pagination>
          </Content>
        </Article>
        <Footer></Footer>
      </Main>
    </div>
  );
};

export default PostPage;
