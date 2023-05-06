import {Container} from "react-bootstrap";
import React, {useRef, useState, useEffect} from "react";
import io from "socket.io-client";
import "./MainPage.css";
import "../assets/css/ChatUI.css";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";









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
  const [roomName, setRoomName] = useState("");
  const [userId, setUserId] = useState("");
  const senderRef = useRef(null);
  const chatLogsRef = useRef(null);
  const chatInputRef = useRef(null);
  let myStream;
  let muted = false;
  let cameraOff = false;
  let myPeerConnection;
  let myDataChannel;
  let peopleInRoom = 1;
  let pcObj = {};

  useEffect(() => {
    setUserId(sessionStorage.getItem("user_id"));

  //   $(function() {
  // var INDEX = 0; 
  // $("#chat-submit").click(function(e) {
  //   e.preventDefault();
  //   var msg = $("#chat-input").val(); 
  //   if(msg.trim() == ''){
  //     return false;
  //   }
  //   generate_message(msg, 'self');
  //   var buttons = [
  //       {
  //         name: 'Existing User',
  //         value: 'existing'
  //       },
  //       {
  //         name: 'New User',
  //         value: 'new'
  //       }
  //     ];
  //   setTimeout(function() {      
  //     generate_message(msg, 'user');  
  //   }, 1000)
    
  // })
  
  // function generate_message(msg, type) {
  //   INDEX++;
  //   var str="";
  //   str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
  //   str += "          <span class=\"msg-avatar\">";
  //   str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
  //   str += "          <\/span>";
  //   str += "          <div class=\"cm-msg-text\">";
  //   str += msg;
  //   str += "          <\/div>";
  //   str += "        <\/div>";
  //   $(".chat-logs").append(str);
  //   $("#cm-msg-"+INDEX).hide().fadeIn(300);
  //   if(type == 'self'){
  //    $("#chat-input").val(''); 
  //   }    
  //   $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  // }  
  
  // function generate_button_message(msg, buttons){    
    /* Buttons should be object array 
      [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ]
    */
    // INDEX++;
    // var btn_obj = buttons.map(function(button) {
    //    return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
    // }).join('');
    // var str="";
    // str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
    // str += "          <span class=\"msg-avatar\">";
    // str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    // str += "          <\/span>";
    // str += "          <div class=\"cm-msg-text\">";
    // str += msg;
    // str += "          <\/div>";
    // str += "          <div class=\"cm-msg-button\">";
    // str += "            <ul>";   
    // str += btn_obj;
    // str += "            <\/ul>";
    // str += "          <\/div>";
    // str += "        <\/div>";
    // $(".chat-logs").append(str);
    // $("#cm-msg-"+INDEX).hide().fadeIn(300);   
    // $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    // $("#chat-input").attr("disabled", true);
  // }
  
  // $(document).delegate(".chat-btn", "click", function() {
  //   var value = $(this).attr("chat-value");
  //   var name = $(this).html();
  //   $("#chat-input").attr("disabled", false);
  //   generate_message(name, 'self');
  // })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
// })
 
  }, []);


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
    await getMedia();
  }

  async function handleWelcomeSubmit(event) {
    event.preventDefault();
    const roomForm = welcomeFormRef.current.querySelector("input");

    if(socket.disconnected) {
      socket.connect();
    }
    socket.emit("join_room", roomForm.value, userId);
    setRoomName(roomForm.value);
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
    // generate_message(msg, 'user');

    const chatLogs = chatLogsRef.current;
    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");
    const text = document.createElement("div");
    text.innerText = msg;
    div.className = type;
    span.className="mssg-avatar";
    text.className="cm-msg-text";

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

    console.log(msg);
    alert('send Button Click! ' + msg);
    const chat = {
      roomName: roomName,
      msg: msg,
      sid: socket.id,
      userId: userId
    }

    socket.emit("sendChat", chat);
    chatBox.value = "";
    senderRef.current = socket.id;
  }

  socket.on("newMessage", chat => {
    console.log("recieve msg: " + chat.msg);

    if(userId == chat.userId) {
      addMessage(`${chat.userId}: ${chat.msg}`, 'chat-msg user');
    }
    else
    addMessage(`${chat.userId}: ${chat.msg}`, 'chat-msg self');


  });

  socket.on("welcome", (user) => {
    addMessage(user.msg);
  });



  socket.on("left", (user) => {
    console.log(user.msg);
    console.log(`left socket id: ${user.sid}`);
    console.log(`left my user id: ${user.mid}`);
    addMessage(`${user.mid} 님이 퇴실하셨습니다`);

    const streamArr = myStreamRef.current.querySelectorAll('div');

    streamArr.forEach((e) => {
      console.log(`현재 등록된 div id: ${e.id}`)
      if(e.id === user.mid) {
        myStreamRef.current.removeChild(e);
      }
    });    
  });

  
  function leaveRoom() {
    console.log(`try to leave sokcet id: ${socket.id}`);
    window.location.href = 'http://localhost:4000';

    socket.disconnect();
  }



  
  

  return (
    <Container>
      <h1>영상통화</h1>
      <div className="video">
        <div>
            <div id="welcome" ref={welcomeRef} 
                style={{display: welHidden ? "none" : "block"}}>
                <form ref={welcomeFormRef}>
                    <input placeholder="room name" required type="text"/>
                    <button onClick={handleWelcomeSubmit}>Enter room</button>
                </form>
            </div>
            <div id="call" ref={callRef}
                style={{ display: hidden ? "none" : "block" }}>
                <div id="myStream" ref={myStreamRef}>
                    <video id="myFace"ref={myFaceRef} autoPlay playsInline width="400" height="400"></video>
                    <button id="mute" ref={muteRef} onClick={handleMuteClick}>Mute</button>
                    <button id="camera" ref={cameraRef} onClick={handleCameraClick}>Turn Camera Off</button>
                    <select id="cameras" ref={camerasRef} onChange={handleCameraChange}></select>
                    <video id="peerFace" ref={peerFaceRef} autoPlay playsInline width="400" height="400"></video>
                </div>

                <button onClick={leaveRoom}>Leave</button>
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






       
<div id="chat-circle" className="btn btn-raised">
        <div id="chat-overlay"></div>
		    <i className="material-icons">speaker_phone</i>
	</div>
  
  <div className="chat-box">
    <div class="chat-box-header">
      ChatBot
      <span className="chat-box-toggle"><i className="material-icons">close</i></span>
    </div>
    <div className="chat-box-body">
      <div className="chat-box-overlay">   
      </div>
      <div className="chat-logs" ref={chatLogsRef}>
       
      </div>
    </div>
    <div className="chat-input">      
      <form>
        <input ref={chatInputRef} type="text" id="chat-input" placeholder="Send a message..."/>
        <button type="submit" class="chat-submit" id="chat-submit" onClick={sendChat}><i class="material-icons">send</i></button>
      </form>      
    </div>
  </div>
  
    </Container>
  );

}

export default MainPage;
