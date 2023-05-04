import http from "http";
import SocketIO from "socket.io";
import express from "express";
import cors from "cors"; // 추가



const path = require('path');
const app = express();

 //app.use(cors({
// origin: 'http://192.168.0.79:8002'
// }));

app.use(express.static(path.join(__dirname, "/client/build")));

// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
// const wsServer = SocketIO(httpServer, {
//   cors: {
//     origin: ["http://localhost:3000", "http://172.26.20.111:3000"], // 클라이언트 도메인을 허용합니다.
//     methods: ["GET", "POST"],
//   },
// });

let roomObjArr = [
  // {
  //   roomName,
  //   currentNum,
  //   users: [
  //     {
  //       socketId,
  //       nickname,
  //     },
  //   ],
  // },
];
const MAXIMUM = 5;

wsServer.on("connection", (socket) => {
  let myRoomName = null;
  // let myNickname = null;

  socket.on("join_room", (roomName, userId) => {
    myRoomName = roomName;
    const joinUser = {
      userId: userId,
      msg: `${userId}님이 방에 참가하셨습니다.`
    }

    let isRoomExist = false;
    let targetRoomObj = null;

    // forEach를 사용하지 않는 이유: callback함수를 사용하기 때문에 return이 효용없음.
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === roomName) {
        // Reject join the room
        if (roomObjArr[i].currentNum >= MAXIMUM) {
          socket.emit("reject_join");
          return;
        }

        isRoomExist = true;
        targetRoomObj = roomObjArr[i];
        break;
      }
    }

    // Create room
    if (!isRoomExist) {
      targetRoomObj = {
        roomName,
        currentNum: 0,
        users: [],
      };
      roomObjArr.push(targetRoomObj);
    }

    //Join the room
    targetRoomObj.users.push({
      socketId: socket.id,
      
    });
    ++targetRoomObj.currentNum;


    socket.join(roomName);
    socket.emit("accept_join", targetRoomObj.users);
    socket.to(roomName).emit("welcome", joinUser);
  });

  socket.on("offer", (offer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("offer", offer, socket.id);
  });

  socket.on("answer", (answer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("answer", answer, socket.id);
  });

  socket.on("ice", (ice, remoteSocketId) => {
    socket.to(remoteSocketId).emit("ice", ice, socket.id);
  });

  socket.on("disc", (user) => {
    console.log("leaving room: " + user.roomName);
    socket.to(user.roomName).emit("leave_room", user.userId);

    let isRoomEmpty = false;
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === myRoomName) {
        const newUsers = roomObjArr[i].users.filter(
          (user) => user.socketId != socket.id
        );
        roomObjArr[i].users = newUsers;
        --roomObjArr[i].currentNum;

        if (roomObjArr[i].currentNum == 0) {
          isRoomEmpty = true;
        }
      }
    }

    // Delete room
    if (isRoomEmpty) {
      const newRoomObjArr = roomObjArr.filter(
        (roomObj) => roomObj.currentNum != 0
      );
      roomObjArr = newRoomObjArr;
    }
  });

  
  
  socket.on("sendChat", (chat) => {
    // console.log(`roomName: ${roomName}, msg: ${msg}, sid: ${socket.id}`);
    // console.log(`myroomName: ${myRoomName}, msg: ${msg}`);
    

    socket.to(chat.roomName).emit("newMessage", chat);
    
  });

});

const handleListen = () => console.log(`Listening on http://localhost:4000`);
httpServer.listen(4000, handleListen);
