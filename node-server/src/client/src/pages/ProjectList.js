// TeamList.js
import React, { useState, useEffect } from "react";
import ProjectItem from "../components/ProjectItem";
import axios from "axios";
import ProjectCreateCard from "../components/ProjectCreateCard";
import Header from "../components/views/Header";
import Sidebar from "../components/views/Sidebar";
import Footer from "../components/views/Footer";
import styled from "styled-components";
import { Button, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeamTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 1rem;
  margin: 1rem;
`;

const Title = styled.p`
  font-size: 2.3em;
  color: black;
  text-align: center;

  padding: 1rem;
  margin-top: 5rem;
`;

const TeamImage = styled(Image)`
  width: 30vh;
  height: 30vh;
  object-fit: fill;
  margin-top: 2em;
`;

const TeamName = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 2em;
`;

const Container = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #aaa;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  height: 3px;
  width: 100%;
  margin: 0.5em 0;
`;

const Buttons = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const BLA = styled.div`
  margin-left: auto;
`

const ProjectList = () => {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const navigate = useNavigate();
  const Team = useSelector((state) => state.teamReducer.team);
  console.log(Team.teamName);
  const addUser = async (email) => {
    await axios
      .get(`http://localhost:8002/api/member/${email}`)
      .then((res) => {
        axios
          .post(
            `http://localhost:8002/api/team/inviteTeam?memberId=${
              res.data.member_id
            }&teamId=${sessionStorage.getItem("tmid")}`
          )
          .then(() => {
            alert("회원이 정상적으로 가입되었습니다");
            fetchMembers();
            setUserData(null);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseMemberModal = () => {
    setShowMemberModal(false);
  };

  const addUserFriend = async (id) => {
    await axios
      .post(`http://localhost:8002/api/team/member/list`, {
        pageNumber: 1,
        pageSize: 100,
        teamId: sessionStorage.getItem("tmid"),
      })
      .then((res) => {
        const findMember = res.data.dtoList.some(
          (item) => item.memberId === id
        );
        if (findMember) {
          alert("이미 가입되어있는 회원입니다.");
        } else {
          axios
            .post(
              `http://localhost:8002/api/team/inviteTeam?memberId=${id}&teamId=${sessionStorage.getItem(
                "tmid"
              )}`
            )
            .then((res) => {
              alert("회원이 정상적으로 가입되었습니다");
              fetchMembers();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserEmail("");
    setUserData(null);
  };

  const handleSearch = async () => {
    try {
      await axios
        .get(`http://localhost:8002/api/member/${userEmail}`)
        .then((res) => {
          const username = res.data.member_name;
          const foundEmail = res.data.member_email;
          axios
            .get(
              `http://localhost:8002/api/team/teamMemList/${sessionStorage.getItem(
                "tmid"
              )}`
            )
            .then((res) => {
              const teamMembers = res.data;
              const isMemberExist = teamMembers.some(
                (member) => member.teamName === username
              );
              if (isMemberExist) {
                alert("이미 가입되어 있는 회원입니다.");
              } else {
                setUserData({ email: foundEmail });
              }
            });
        })
        .catch((err) => {
          alert("검색에 실패했습니다.");
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
    setUserEmail("");
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8002/api/project/list/${sessionStorage.getItem(
          "tmid"
        )}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const removeMember = async (id) => {
    if (window.confirm("정말로 탈퇴시키겠습니까?")) {
      await axios
        .delete(
          `http://localhost:8002/api/team/leaveTeam?memberId=${id}&teamId=${sessionStorage.getItem(
            "tmid"
          )}`
        )
        .then((res) => {
          alert("팀에서 탈퇴시켰습니다.");
          fetchMembers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchMembers = async () => {
    await axios
      .get(
        `http://localhost:8002/api/team/teamMemList/${sessionStorage.getItem(
          "tmid"
        )}`
      )
      .then((res) => {
        const teamMembers = res.data.filter(
          (member) => member.teamPosition === "팀원"
        );
        setMembers(teamMembers);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const fetchFriendList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8002/api/member/friendList/${sessionStorage.getItem(
          "memid"
        )}`
      );
      setFriendList(response.data);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };

  const deleteTeam = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await axios
        .delete(
          `http://localhost:8002/api/team/deleteTeam/${sessionStorage.getItem(
            "tmid"
          )}`
        )
        .then((res) => {
          alert("팀이 삭제되었습니다.");
          navigate("/LoggedIn");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMembers();
    setShowButton(false);
    whoIsAdmin();
    fetchFriendList();
  }, [sessionStorage.getItem("tmid")]);

  const onProjectCreated = () => {
    fetchProjects();
  };

  return (
    <>
      <div className="main">
        <Header />
        <div className="article">
          <Sidebar />
          <div className="section">
            <Container>
              <TeamTitle>
                <TeamImage src={Team.team_photo} roundedCircle />
              </TeamTitle>
              <TeamName>{Team.teamName}</TeamName>
              <div class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
              <Title>프로젝트 목록</Title>
              </div>

              {showButton && (
                <Buttons>
                  <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    style={{
                      width: "150px",
                      height: "50px",
                      margin: "0.5em"
                    }}
                  >
                    회원 추가
                  </Button>

                  {/* <Button
                  variant="primary"
                  onClick={() => navigate("/memlist")}
                  style={{
                    width: "150px",
                    height: "50px",
                  }}
                >
                  회원 목록 조회
                </Button> */}

                  <Button
                    variant="primary"
                    onClick={() => setShowMemberModal(true)}
                    style={{ width: "150px", height: "50px", margin: "0.5em"}}
                  > 
                    회원관리
                  </Button>

                  <BLA>
                  <Button
                    variant="danger"
                    onClick={() => deleteTeam()}
                    style={{ width: "150px", height: "50px", margin: "0.5em" }}
                  >
                    팀 삭제
                  </Button>
                  </BLA>

                </Buttons>
              )}
              <Buttons>
                {!showButton && (
                  <Button
                    variant="danger"
                    onClick={() => console.log(1)}
                    style={{ width: "150px", height: "50px" }}
                  >
                    팀 탈퇴
                  </Button>
                )}
              </Buttons>
              {/* <Line /> */}
              <Projects>
                {showButton && (
                  <ProjectCreateCard onProjectCreated={onProjectCreated} />
                )}
                {projects.map((project, index) => (
                  <div key={index}>
                    <ProjectItem project={project} prjId={project.prjId} />
                  </div>
                ))}
              </Projects>
            </Container>
          </div>
        </div>
        <Footer />
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>회원 검색(이메일로 검색)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
          {userData ? (
            <div>
              User Email: {userData.email}
              <Button variant="primary" onClick={() => addUser(userData.email)}>
                회원추가
              </Button>
            </div>
          ) : (
            <p>No user found</p>
          )}
          <hr />
          <div>
            <h4>친구 목록</h4>
            <ul>
              {friendList.map((friend) => (
                <li key={friend.friendId}>
                  {friend.friendName}{" "}
                  <Button
                    variant="primary"
                    onClick={() => addUserFriend(friend.friendId)}
                  >
                    회원추가
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showMemberModal} onHide={handleCloseMemberModal}>
        <Modal.Header closeButton>
          <Modal.Title>회원목록</Modal.Title>
        </Modal.Header>
        <Line></Line>        
        <Modal.Body>
          {members.map((member) => (
            <div key={member.teamMemberId}>
              {member.teamName} ({member.teamPosition}){" "}
              <Button
                variant="danger"
                onClick={() => removeMember(member.memberId)}
              >
                탈퇴
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectList;
