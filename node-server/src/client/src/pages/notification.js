import io from "socket.io-client";
import React, { useRef, useEffect } from "react";

function Notification() {
  const socket = io();
  const messageRef = useRef(null);
  const projectCode = useRef(null);

  const generateRandomCode = (length) => {
    // 랜덤코드
    console.log("generateRandomCode");
    return Math.random().toString(36).substring(length);
  };

  const showNotification = (message) => {
    // 알람 표시
    console.log("showNotification:", message);
  };

  useEffect(() => {
    console.log("Connected to notification server");

    const prjId = sessionStorage.getItem("prjid");
    const userId = sessionStorage.getItem("memid");

    const prjName = 'testNoti';
    
    socket.emit("join_prj", prjName);


    socket.on("join_accept", () => {
      console.log('accept test success');
    });
    

    socket.on("accept_prj", async (userObjArr) => {
      console.log("방 입장");      
    });

    socket.on("newNotification", (msg, type) => {
      const messageLogs = messageRef.current;
      const div = document.createElement("div");
      const text = document.createElement("div");
      text.innerText = msg;
      div.className = type;
      text.className = "cm-msg-text";

      console.log("New message: " + msg);

      div.appendChild(text);
      messageLogs.appendChild(div);

      // Trigger a notification when a new message is received
      showNotification(msg);

      console.log("New Notification:", msg);
    });

    socket.on("left", (user) => {
      console.log(user.msg);
      console.log(`left socket id: ${user.side}`);
      console.log(`left my user id: ${user.mid}`);
    });

    socket.on("leave_prj", (participantId) => {
      console.log(`${participantId} 나감`);
    });
  }, []);

  return (
    <div>
      <div ref={messageRef}></div>
    </div>
  );
}

export default Notification;
