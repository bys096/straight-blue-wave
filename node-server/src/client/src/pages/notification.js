import io from "socket.io-client";
import React, { useRef, useEffect, useState } from "react";

function Notification() {
  const socket = io();
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
      console.log('accept test success');
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


    //알림

    socket.on("eventData", (eventData) => {
      console.log("Received event data:", eventData);
    
      setEventData(eventData);
    });


    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("left");
      socket.off("leave_prj");
    };



  }, []);




  return (
    <div>
      <div ref={messageRef}></div>
    </div>

    
    
  );
}

export default Notification;
