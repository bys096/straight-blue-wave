import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import { Button, Modal, Form, Table, ButtonGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { boardConnect } from "../actions/board";

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
  user-select: none;
`;
const BoardItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 1rem;
  padding: 20px;
  user-select: none;

  background-color: #aaaaaa;
`;

const ProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showButton, setShowButton] = useState(false);

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

  const whoIsAdmin = async () => {
    await axios
      .get(
        `http://localhost:8002/api/team/readTeam/${sessionStorage.getItem(
          "tmid"
        )}`
      )
      .then((res) => {
        if (
          parseInt(res.data.memberId) ===
          parseInt(sessionStorage.getItem("memid"))
        ) {
          setShowButton(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProject = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await axios
        .delete(
          `http://localhost:8002/api/project/delete/${sessionStorage.getItem(
            "prjid"
          )}`
        )
        .then((res) => {
          alert("프로젝트가 삭제되었습니다.");
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getBoardList = () => {
    axios
      .get(
        `http://localhost:8002/api/board/list/${sessionStorage.getItem(
          "prjid"
        )}`
      )
      .then((response) => {
        setBoardList(response.data);
        const brdIdList = response.data.map((item) => item.brd_id);
        if (brdIdList.length >= 2) {
          const secondBrdId = brdIdList[1];
          // 회의록 게시판 id를 세션에 저장
          sessionStorage.setItem("minutesid", secondBrdId);
        }
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBoardList();
    setShowButton(false);
    whoIsAdmin();
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
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate(-1)}>
              프로젝트 목록
            </Button>

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
            {showButton && (
              <Button variant="danger" onClick={deleteProject}>
                프로젝트삭제
              </Button>
            )}
          </ButtonGroup>
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
                  navigate("/post", { state: { board } });
                  sessionStorage.setItem("boardid", board.brd_id);
                  dispatch(boardConnect(board));
                }}
              >
                <h4>{board.brd_name}</h4>
                <Table hover>
                  <tr>
                    <th>작성일</th>
                    <th>제목</th>
                    <th>작성자</th>
                  </tr>
                  {posts[board.brd_id]?.map((post) => (
                    <tbody>
                      <tr key={post.createdAt}>
                        <td>{post.createdAt}</td>
                        <td>{post.post_name}</td>
                        <td>{post.mem_nick}</td>
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
