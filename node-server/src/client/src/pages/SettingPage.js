import React, { useEffect, useRef, useState } from "react";
import Header from "../components/views/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import foximg from "../assets/imgs/cat.jpg";
import Sidebar from "../components/views/Sidebar";
import "../assets/css/SettingPage.css";
import { useDispatch } from "react-redux";
import { updateTeamImage } from "../actions/team";
import Footer from "../components/views/Footer";

const SettingPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user);
  const [member_name, setName] = useState("");
  const [member_nick, setNick] = useState("");
  const [member_photo, setPhoto] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMemberData() {
      console.log("fetch start");
      console.log(auth);
      await axios
        .get(`http://localhost:8002/api/member/me`, {
          headers: {
            // Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("fetch success");
          console.log(res);
          setName(res.data.member_name);
          setNick(res.data.member_nick);
          setPhoto(res.data.profile_photo);
        })
        .catch((err) => {
          console.log("fetch fail");
          console.log(err);
        });
    }
    fetchMemberData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUserUpdate = async () => {
    await axios
      .put(
        `http://localhost:8002/api/member/update`,
        {
          member_name: member_name,
          member_nick: member_nick,
          profile_photo: selectedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("수정완료했습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("수정실패했습니다.");
      });
  };

  const userDeleteButton = async () => {
    if (
      window.confirm(
        "회원 탈퇴 시, 관련 데이터는 돌아오지 않습니다. 정말로 삭제하시겠습니까?"
      )
    ) {
      await axios
        .delete(`http://localhost:8002/api/member/delete`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log("회원 탈퇴 완료", res.data);
          alert("회원 삭제가 완료되었습니다.");
          sessionStorage.clear();
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <div style={{ paddingLeft: "280px", margin: "0 0 300px" }}>
        <div
          class="container-fluid d-flex justify-content-center align-items-center"
          style={{ margin: "50px 0 0 0" }}
        >
          <div class="container-fluid">
            <div
              class="cardsb d-flex align-items-stretch"
              style={{ height: "600px", width: "1200px" }}
            >
              <div class="card-body d-flex">
                <div class="col-md-4">
                  <h5 class="card-title fw-semibold mb-4">정보 수정 페이지</h5>
                  <div class="cardsb" style={{ width: "350px" }}>
                    <img
                      src={selectedImage || member_photo}
                      className="card-img-container"
                      alt="..."
                    />
                    <div class="card-body">
                      <button
                        onClick={() => {
                          document.getElementById("imageUpload").click();
                        }}
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "royalblue",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        프로필 사진 수정
                      </button>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-8 d-flex align-items-center">
                  <div
                    class="cardsb"
                    style={{
                      width: "100%",
                      height: "83%",
                      margin: "5px 0 0 0",
                    }}
                  >
                    <div class="card-body">
                      <form>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            이름
                          </label>
                          <input
                            type="text"
                            value={member_name || ""}
                            onChange={(e) => setName(e.target.value)}
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            별명
                          </label>
                          <input
                            type="text"
                            value={member_nick || ""}
                            onChange={(e) => setNick(e.target.value)}
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div class="d-flex justify-content-between">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={handleUserUpdate}
                            style={{
                              margin: "142px 0 0 0",
                              backgroundColor: "royalblue",
                              color: "white",
                            }}
                          >
                            정보 수정
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={userDeleteButton}
                            style={{
                              margin: "142px 0 0 0",
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            회원 탈퇴
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SettingPage;
