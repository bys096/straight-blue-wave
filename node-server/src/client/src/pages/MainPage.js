import {Container} from "react-bootstrap";
import React, {useRef, useState} from 'react';
import io from 'socket.io-client';

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

    const chatListRef = useRef(null);
    const chatBoxRef = useRef(null);


    const [hidden, setHidden] = useState(true);
    const [welHidden, setWelHidden] = useState(false);

    let myStream;
    let muted = false;
    let cameraOff = false;
    let roomName;
    let myPeerConnection;
    let myDataChannel;
    let peopleInRoom = 1;

    let pcObj = {};
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
  // select 한 camera id를 기준으로 다시 getMedia를 통해 미디어 스트림을 가져옴
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
  await getMedia();
  // myPeerConnection = makeConnection(); // 수정된 부분
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeFormRef.current.querySelector("input");
  // await initCall();
  // await getMedia();
  // 추후에 닉네임 추가

  if(socket.disconnected) {
    socket.connect();
  }
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}



socket.on("reject_join", () => {
  // Paint modal
  // paintModal("Sorry, The room is already full.");

  // Erase names
  // const nicknameContainer = document.querySelector("#userNickname");
  // nicknameContainer.innerText = "";
  roomName = "";
  // nickname = "";
});

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
        // userObjArr[i].nickname
      );
      const offer = await newPC.createOffer();
      await newPC.setLocalDescription(offer);
      socket.emit("offer", offer, userObjArr[i].socketId);
      // writeChat(`__${userObjArr[i].nickname}__`, NOTICE_CN);
    } catch (err) {
      console.error(err);
    }
  }
  // writeChat("is in the room.", NOTICE_CN);
});

socket.on("offer", async (offer, remoteSocketId) => {
  try {
    const newPC = createConnection(remoteSocketId);
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

socket.on("chat", (message) => {
  // writeChat(message);
});

socket.on("leave_room", (leavedSocketId) => {
  // removeVideo(leavedSocketId);
  // writeChat(`notice! ${nickname} leaved the room.`, NOTICE_CN);
  // --peopleInRoom;
  // sortStreams();
});

// RTC code

function createConnection(remoteSocketId) {
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
    handleAddStream(event, remoteSocketId);
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

function handleAddStream(event, remoteSocketId) {
  const peerStream = event.streams[0];
  paintPeerFace(peerStream, remoteSocketId);
}

function paintPeerFace(peerStream, id) {
  const streams = myStreamRef.current;
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement("div");
    div.id = id;
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

function sendChat() {
  const chatBox = chatBoxRef.current;
  const chatList = chatListRef.current;
  const msg = chatBox.value;
  socket.emit("sendChat", roomName, msg, () => {
    const li = document.createElement("li");
    li.innerText = msg;
    chatList.appendChild(li);
  });
}

socket.on("newMessage", (msg) => {
  console.log(`newMessage: ${msg}`);
});




  return (
    <Container>
      <h1>영상통화</h1>
      <div className="video">
        <div>
            <div id="welcome" ref={welcomeRef} 
                style={{display: welHidden ? "none" : "block"}}
            >
                <form ref={welcomeFormRef}>
                    <input placeholder="room name" required type="text"/>
                    <button onClick={handleWelcomeSubmit}>Enter room</button>
                </form>
            </div>
            <div id="call" ref={callRef}
                style={{ display: hidden ? "none" : "block" }}
            >
                <div id="myStream" ref={myStreamRef}>
                    <video id="myFace"ref={myFaceRef} autoPlay playsInline width="400" height="400"></video>
                    <button id="mute" ref={muteRef} onClick={handleMuteClick}>Mute</button>
                    <button id="camera" ref={cameraRef} onClick={handleCameraClick}>Turn Camera Off</button>
                    <select id="cameras" ref={camerasRef} onChange={handleCameraChange}></select>
                    <video id="peerFace" ref={peerFaceRef} autoPlay playsInline width="400" height="400"></video>
                </div>
            </div>
            
            <div className="chat" >
              <h2>Chatting</h2>
              <ul ref={chatListRef}></ul>
              <form>
                <input ref={chatBoxRef} type="text" required placeholder="채팅을 입력하세요"/>
                <button onClick={sendChat}>Send</button>
              </form>
            </div>
        </div>
      </div>
    </Container>
  );
}

export default MainPage;

