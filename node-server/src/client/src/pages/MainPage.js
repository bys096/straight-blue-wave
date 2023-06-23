import { Container } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import "./MainPage.css";
import "../assets/css/ChatUI.css";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import "../assets/css/styles.min.css";
import styled from "styled-components";

import axios from "axios";

const BoxCommon = styled.div`
  width: ${(props) => (props.isBig ? 200 : 100)}px; // (1)
  height: 50px;
  background-color: #aaaaaa;
`;

function MainPage(props) {
  const socket = io();
  const myFaceRef = useRef(null);
  const muteRef = useRef(null);
  const cameraRef = useRef(null);
  const camerasRef = useRef(null);
  const callRef = useRef(null);
  const welcomeRef = useRef(null);
  const welcomeFormRef = useRef(null);
  const peerFaceRef = useRef(null);
  const myStreamRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [welHidden, setWelHidden] = useState(false);
  const [chatHidden, setChatHidden] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [userId, setUserId] = useState("");

  let [transText, setTransText] = useState("");
  let [summarizeResult, setSummarizeResult] = useState(null);
  let [date, setDate] = useState("");
  let [attendees, setAttendees] = useState("");
  let [summary, setSummary] = useState("");
  let [conclusion, setConclusion] = useState("");
  let [speaker, setSpeaker] = useState("");
  let [content, setContent] = useState("");
  let [writer, setWriter] = useState("");

  const senderRef = useRef(null);
  const chatLogsRef = useRef(null);
  const chatInputRef = useRef(null);
  const navigate = useNavigate();

  // stt
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [result, setResult] = useState("결과가 없습니다.");

  let myStream;
  let muted = false;
  let cameraOff = false;
  let myPeerConnection;
  let myDataChannel;
  let peopleInRoom = 1;
  let pcObj = {};

  useEffect(() => {
    setUserId(sessionStorage.getItem("user_id"));
    setChatHidden(true);
    console.log("nic, prj check");
    console.log(sessionStorage.getItem("memnick"));
    console.log(sessionStorage.getItem("prjid"));

    // stt
    // stt code
    const recognition = new window.webkitSpeechRecognition();
    console.log("logged in page");
    recognition.interimResults = true;
    recognition.lang = "ko";
    recognition.continuous = true;
    recognition.autoRestart = true;
    // let final = '';
    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interim);
      setFinalTranscript(final);
      setResult(`중간값: ${interim}<br/>결과값: ${final}`);
      setTransText(final);

      const context = {
        // userNick: 'nick1',
        userNick: sessionStorage.getItem("memnick"),
        roomName: sessionStorage.getItem("prjid"),
        text: final,
      };
      socket.emit("speak", context);
    };

    recognition.start();

    $("#chat-circle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });

    $(".chat-box-toggle").click(function () {
      $("#chat-circle").toggle("scale");
      $(".chat-box").toggle("scale");
    });
  }, []);

  // gpt

  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    console.log("summarize in client: ", sessionStorage.getItem("prjid"));
    const prjid = sessionStorage.getItem("prjid");

    const minutesid = sessionStorage.getItem("minutesid");
    const memid = sessionStorage.getItem("memid");
    socket.emit("summarize", prjid, minutesid, memid);
    // 사용자 입력과 대화 기록을 API 요청의 본문에 포함합니다.
    // await axios.get()
  };

  socket.on("summarizeResult", (acceptData) => {
    setSummarizeResult(acceptData);
    setAttendees(acceptData.attendees);
    setDate(acceptData.date);
    setSummary(acceptData.setSummary);
    setConclusion(acceptData.conclusion);
    setWriter(acceptData.writer);
    console.log("accpeted Data: ");
    console.log(acceptData);
    console.log("summarizeResult");
    console.log(summarizeResult);
    // console.log('attendees: ', summarizeResult.attendees[0]);
    // setC
  });

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          option.selected = true;
        }
        camerasRef.current.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getMedia(deviceId) {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        // deviceId가 있다면 특정 camera로, 없다면 셀프 카메라로 설정
        deviceId ? cameraConstraints : initialConstrains
      );
      myFaceRef.current.srcObject = myStream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleMuteClick() {
    myStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!muted) {
      muteRef.class.innerText = "Unmute";
      muted = true;
    } else {
      muteRef.class.innerText = "Mute";
      muted = false;
    }
  }

  function handleCameraClick() {
    myStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
      cameraRef.current.innerText = "Turn Camera Off";
      cameraOff = false;
    } else {
      cameraRef.current.innerText = "Turn Camera On";
      cameraOff = true;
    }
  }

  async function handleCameraChange() {
    await getMedia(camerasRef.current.value);
    if (myPeerConnection) {
      const videoTrack = myStream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  }

  async function initCall() {
    setWelHidden(true);
    setHidden(false);
    setChatHidden(false);
    await getMedia();
  }

  async function handleWelcomeSubmit(event) {
    event.preventDefault();
    const roomForm = welcomeFormRef.current.querySelector("input");

    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit("join_room", roomForm.value, userId);
    setRoomName(roomForm.value);
    console.log("방입장: ", roomName);
    // console.log(`입장, 방이름: ${roomName}`);
    roomForm.value = "";
    // console.log(`입장, 방이름?: ${roomName}`);
  }

  // socket.on("reject_join", () => {
  //   // Paint modal
  //   // paintModal("Sorry, The room is already full.");

  //   // Erase names
  //   // const nicknameContainer = document.querySelector("#userNickname");
  //   // nicknameContainer.innerText = "";
  //   console.log("roomname 초기화");
  //   roomName = "";
  //   // nickname = "";
  // });

  socket.on("accept_join", async (userObjArr) => {
    await initCall();

    const length = userObjArr.length;
    if (length === 1) {
      return;
    }

    // writeChat("Notice!", NOTICE_CN);
    for (let i = 0; i < length; ++i) {
      try {
        const newPC = createConnection(
          userObjArr[i].socketId,
          userObjArr[i].userId
        );
        const offer = await newPC.createOffer();
        await newPC.setLocalDescription(offer);
        socket.emit("offer", offer, userObjArr[i].socketId, userId);
        // writeChat(`__${userObjArr[i].nickname}__`, NOTICE_CN);
      } catch (err) {
        console.error(err);
      }
    }
    // writeChat("is in the room.", NOTICE_CN);
  });

  socket.on("offer", async (offer, remoteSocketId, remoteUserId) => {
    try {
      const newPC = createConnection(remoteSocketId, remoteUserId);
      await newPC.setRemoteDescription(offer);
      const answer = await newPC.createAnswer();
      await newPC.setLocalDescription(answer);
      socket.emit("answer", answer, remoteSocketId);
      // writeChat(`notice! __${remoteNickname}__ joined the room`, NOTICE_CN);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("answer", async (answer, remoteSocketId) => {
    await pcObj[remoteSocketId].setRemoteDescription(answer);
  });

  socket.on("ice", async (ice, remoteSocketId) => {
    await pcObj[remoteSocketId].addIceCandidate(ice);
  });

  socket.on("leave_room", (leavedSocketId) => {
    // removeVideo(leavedSocketId);
    // writeChat(`notice! ${nickname} leaved the room.`, NOTICE_CN);
    --peopleInRoom;
    // sortStreams();
  });

  // RTC code
  function createConnection(remoteSocketId, remoteUserId) {
    const myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", (event) => {
      handleIce(event, remoteSocketId);
    });
    myPeerConnection.addEventListener("track", (event) => {
      handleAddStream(event, remoteSocketId, remoteUserId);
    });
    // myPeerConnection.addEventListener(
    //   "iceconnectionstatechange",
    //   handleConnectionStateChange
    // );
    myStream //
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));

    pcObj[remoteSocketId] = myPeerConnection;

    ++peopleInRoom;
    // sortStreams();
    return myPeerConnection;
  }

  function handleIce(event, remoteSocketId) {
    if (event.candidate) {
      socket.emit("ice", event.candidate, remoteSocketId);
    }
  }

  function handleAddStream(event, remoteSocketId, remoteUserId) {
    const peerStream = event.streams[0];
    paintPeerFace(peerStream, remoteSocketId, remoteUserId);
  }

  function paintPeerFace(peerStream, id, remoteUserId) {
    const streams = myStreamRef.current;
    let div = document.getElementById(remoteUserId);
    if (!div) {
      div = document.createElement("div");
      div.id = remoteUserId;
      streams.appendChild(div);
    }
    const video = div.querySelector("video") || document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.width = "400";
    video.height = "400";
    video.srcObject = peerStream;
    div.appendChild(video);
  }

  // function sortStreams() {
  //   const streams = document.querySelector("#streams");
  //   const streamArr = streams.querySelectorAll("div");
  //   streamArr.forEach((stream) => (stream.className = `people${peopleInRoom}`));
  // }

  // chatting
  function addMessage(msg, type) {
    const chatLogs = chatLogsRef.current;
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const text = document.createElement("div");
    text.innerText = msg;
    div.className = type;
    span.className = "mssg-avatar";
    text.className = "cm-msg-text";

    console.log("text divtag " + text.value);

    div.appendChild(text);
    chatLogs.appendChild(div);
    div.appendChild(span);
    span.appendChild(img);

    // chatList.appendChild(li);
  }

  function sendChat(event) {
    event.preventDefault();
    const chatBox = chatInputRef.current;
    const msg = chatInputRef.current.value;

    // console.log(msg);
    const chat = {
      roomName: roomName,
      msg: msg,
      sid: socket.id,
      userId: userId,
    };

    socket.emit("sendChat", chat);
    chatBox.value = "";
    senderRef.current = socket.id;
  }

  socket.on("newMessage", (chat) => {
    // console.log("recieve msg: " + chat.msg);

    if (userId === chat.userId) {
      addMessage(`${chat.userId}: ${chat.msg}`, "chat-msg self");
    } else addMessage(`${chat.userId}: ${chat.msg}`, "chat-msg user");
  });

  socket.on("welcome", (user) => {
    addMessage(user.msg);
  });

  socket.on("left", (user) => {
    console.log(user.msg);
    console.log(`left socket id: ${user.sid}`);
    console.log(`left my user id: ${user.mid}`);
    addMessage(`${user.mid} 님이 퇴실하셨습니다`);

    const streamArr = myStreamRef.current.querySelectorAll("div");

    streamArr.forEach((e) => {
      console.log(`현재 등록된 div id: ${e.id}`);
      if (e.id === user.mid) {
        myStreamRef.current.removeChild(e);
      }
    });
  });

  function leaveRoom() {
    // console.log(`try to leave sokcet id: ${socket.id}`);
    navigate("/project/:prjid");
    setChatHidden(true);
    socket.disconnect();
  }
  socket.on("hii", (text) => {
    console.log("socket id로부터 수신");
    console.log(text);
  });

  return (
    <Container>
      <h1>영상통화</h1>
      <div className="video">
        <div>
          <div
            id="welcome"
            ref={welcomeRef}
            style={{ display: welHidden ? "none" : "block" }}
          >
            <form ref={welcomeFormRef}>
              <input placeholder="room name" required type="text" />
              <button onClick={handleWelcomeSubmit}>Enter room</button>
            </form>
          </div>

          <div
            id="call"
            ref={callRef}
            style={{ display: hidden ? "none" : "block" }}
          >
            <div
              id="myStream"
              ref={myStreamRef}
              class="rounded mx-auto d-block"
            >
              <video
                id="myFace"
                ref={myFaceRef}
                autoPlay
                playsInline
                width="400"
                height="400"
              ></video>
              {/* <button id="mute" ref={muteRef} onClick={handleMuteClick}>
                Mute
              </button>
              <button id="camera" ref={cameraRef} onClick={handleCameraClick}>
                Turn Camera Off
              </button>
              <select
                id="cameras"
                ref={camerasRef}
                onChange={handleCameraChange}
              ></select> */}
              <video
                id="peerFace"
                ref={peerFaceRef}
                autoPlay
                playsInline
                width="400"
                height="400"
              ></video>
            </div>

            <button class="btn btn-primary" onClick={leaveRoom}>
              Leave
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: chatHidden ? "none" : "block" }}>
        <div id="chat-circle" className="btn btn-raised">
          <div id="chat-overlay"></div>
          <i className="material-icons">speaker_phone</i>
        </div>

        <div className="chat-box">
          <div class="chat-box-header">
            ChatBot
            <span className="chat-box-toggle">
              <i className="material-icons">close</i>
            </span>
          </div>
          <div className="chat-box-body">
            <div className="chat-box-overlay"></div>
            <div className="chat-logs" ref={chatLogsRef}></div>
          </div>
          <div className="chat-input">
            <form>
              <input
                ref={chatInputRef}
                type="text"
                id="chat-input"
                placeholder="Send a message..."
              />
              <button
                type="submit"
                class="chat-submit"
                id="chat-submit"
                onClick={sendChat}
              >
                <i class="material-icons">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="container-fluid">
          <div class="card" style={{ width: "500px", height: "800px" }}>
            <div class="card-body" style={{ height: "0px" }}>
              <h5 class="card-title fw-semibold mb-4">대화 내용</h5>
              <div class="card" style={{ width: "465px" }}>
                <div class="card-body">
                  <form>
                    <div class="mb-3">
                      {/* <label for="exampleInputEmail1" class="form-label">중간값</label> */}
                      <div dangerouslySetInnerHTML={{ __html: result }}></div>

                      <div
                        id="emailHelp"
                        class="form-text"
                        value={transText}
                      ></div>
                    </div>
                    <div class="mb-3">
                      {/* <label for="exampleInputPassword1" class="form-label">결과값</label> */}
                      {/* <div id="emailHelp" class="form-text" value={transText}></div> */}
                    </div>
                    <button
                      class="btn btn-primary"
                      onClick={handleMessageSubmit}
                    >
                      SUBMIT
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="card-body"
              style={{ position: "relative", bottom: "100px" }}
            >
              <h5 class="card-title fw-semibold mb-4">요약 내용</h5>
              <div class="card" style={{ width: "465px", height: "450px" }}>
                <div class="card-body">
                  <div class="mb-3">
                    {/* <div>{summarizeResult}</div> */}
                    <label for="exampleInputEmail1" class="form-label">
                      안건
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {summarizeResult.date}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      참석자
                    </label>
                    {/* {summarizeResult && <div id="emailHelp" class="form-text">{summarizeResult.attendees}</div> } */}
                    {summarizeResult &&
                      Array.isArray(summarizeResult.attendees) &&
                      summarizeResult.attendees.map((attendee, index) => (
                        <div key={index} id="emailHelp" className="form-text">
                          {attendee}
                        </div>
                      ))}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      시간
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {summarizeResult.date}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      내용
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {/* <span>{ summarizeResult.contents.speaker } : { summarizeResult.contents.content }</span> */}
                        {/* {summarizeResult && summarizeResult.contents.map((content, index) => (
                      <div key={index} id="emailHelp" className="form-text">{content}</div>
                    ))} */}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      요약
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {summarizeResult.summary}
                      </div>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      결론
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {summarizeResult.conclusion}
                      </div>
                    )}
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      작성자
                    </label>
                    {summarizeResult && (
                      <div id="emailHelp" class="form-text">
                        {summarizeResult.writer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MainPage;
