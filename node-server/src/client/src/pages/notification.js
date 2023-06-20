import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

function Notification() {
  const messageRef = useRef(null);
  const projectCode = useRef(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    console.log("Connected to notification server");

    const prjId = sessionStorage.getItem("prjid");
    const userId = sessionStorage.getItem("memid");
    const prjRoom = sessionStorage.getItem("prjroom");

    socket.emit("join_prj", prjRoom);

    socket.on("join_accept", () => {
      console.log("accept test success");
    });

    socket.on("accept_prj", async (userObjArr) => {
      console.log("방 입장");
    });

    socket.on("left", (user) => {
      console.log(user.msg);
      console.log(`left socket id: ${user.side}`);
      console.log(`left my user id: ${user.mid}`);
    });

    socket.on("leave_prj", (prjId) => {
      console.log(`${prjId} 나감`);
    });

    // 알림 이벤트 수신
    socket.on("eventData", (eventData) => {
      console.log("Received event data:", eventData);
      setEventData(eventData);
      const { prjName, post_name, post_content } = eventData;
      const notificationMessage = `${prjName}프로젝트에 새로운 글이 등록되었습니다.\n프로젝트: ${prjName}\n제목: ${post_name}\n내용: ${post_content}`;
      console.log(notificationMessage);
      alert(notificationMessage);
    });

    // 컴포넌트 언마운트 시 소켓 연결 정리
    return () => {
      socket.off("left");
      socket.off("leave_prj");
      socket.off("eventData");
    };
  }, []);

  return (
    <div>
      <div ref={messageRef}></div>
    </div>
  );
}

export default Notification;
