
import http from "http";
import SocketIO from "socket.io";
import express from "express";
import cors from "cors"; // 추가
import axios from 'axios';

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

//app.use(cors({
// origin: 'http://192.168.0.79:8002'
// }));



// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));


app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});




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

let roomContext = {};
// const roomContext = { 1: "apple", 2: "banana", 3: "orange" };
let ncnt = 0;



wsServer.on("connection", (socket) => {
  

  let myRoomName = null;
  let myUserId = null;
  // let myNickname = null;

  socket.on("join_room", (roomName, userId) => {
    ncnt++;
    console.log("참가자수: " + ncnt);
  // for (let key in obj) {
    // console.log('key: ', key);
    
  // }
    myRoomName = roomName;
    myUserId = userId;
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
      userId: userId
    });
    ++targetRoomObj.currentNum;


    socket.join(roomName);
    socket.emit("accept_join", targetRoomObj.users);
    socket.to(roomName).emit("welcome", joinUser);
  });

  socket.on("offer", (offer, remoteSocketId, localUserId) => {
    socket.to(remoteSocketId).emit("offer", offer, socket.id, localUserId);
  });

  socket.on("answer", (answer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("answer", answer, socket.id);
  });

  socket.on("ice", (ice, remoteSocketId) => {
    socket.to(remoteSocketId).emit("ice", ice, socket.id);
  });





  socket.on("disconnecting", () => {
    // console.log("disconnecting socket id from server: " + socket.id);
    // console.log("disconect id? " + myUserId);
    // console.log('disconnect');
    // console.log(roomContext);
    const user = {
      sid: socket.id,
      msg: `나감`,
      mid: myUserId
    }
    socket.rooms.forEach((room) =>
      socket.to(room).emit("left", user)
    );
  });
  


  socket.on("sendChat", (chat) => {
    // console.log(`roomName: ${roomName}, msg: ${msg}, sid: ${socket.id}`);
    // console.log(`myroomName: ${myRoomName}, msg: ${msg}`);
    socket.to(chat.roomName).emit("newMessage", chat);

  });

  socket.on("speak", (context) => {
    const keys = Object.keys(roomContext);
    if(keys.includes(context.roomName)) {
      if(context.roomName == '' || context.text == '')
        return;
      console.log("Key found:", context.roomName);
      roomContext[context.roomName].push(`누가(참석자): ${context.userNick}: 대화 내용: ${context.text}`);
      console.log('------------');
      console.log(roomContext);
    }
    else {
      roomContext = { [context.roomName] : [context.text] };
      // roomContext = { ...roomContext, ...additionalInfo };
      console.log('not key found');
      // console.log(roomContext);
      
      console.log("---------------------------");
      console.log(roomContext);
    }
  });
  socket.on("summarize", (prjid) => {
    console.log('summarize: ', prjid);
    const combinedString = roomContext[prjid].join("\n");
    console.log('combiend', combinedString);
    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      n: 1,
      messages: [
        {'role': 'user', 'content': combinedString},
        {'role': 'assistant', 'content': '대화를 요약, 오타 수정을 해서 한국어로된 회의록으로 작성해줘. 회의록 내용으로는 일시, 참석자, 안건, 내용 요약, 결론, 회의록 작성자의 양식으로 작성해줘.\n 문맥에 맞지 않는 표현은 잘못 입려된 단어이니, 문맥에 맞는 단어로 대체해줘.'}
      ],
    };
    summarize(data);

    

  });  


});
async function summarize(data) {
  try {
    //   // ChatGPT API 호출
      // console.log('check data');
      // console.log(data);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer secret",
          },
        }
      );
      const answer = response.data.choices[0].message.content;
      console.log(answer);
      // console.log(response.data);
      // setMessages([...messages, { role: "assistant", content: answer }]);
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
}



const handleListen = () => console.log(`Listening on http://localhost:4000`);
httpServer.listen(4000, handleListen);





// notification

wsServer.on('connection', (socket) => {
  // console.log('notification connected');

socket.on("join_prj", (prjRoom) => {
  let targetRoomObj = roomObjArr.find((roomObj) => roomObj.roomName === prjRoom);

  if (!targetRoomObj) {
    targetRoomObj = {
      roomName: prjRoom,
      currentNum: 0,
      users: [],
    };
    roomObjArr.push(targetRoomObj);
  }

  targetRoomObj.users.push({
    socketId: socket.id,
  });
  targetRoomObj.currentNum++;

  socket.join(prjRoom);
  socket.to(prjRoom).emit("join_accept");

  // console.log(`Socket ${socket.id} joined room: ${prjRoom}`);
});


  socket.on('disconnect', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("left", user)
    );
  });



  socket.on("eventData", (eventData) => {
    // console.log("Received event data:", eventData);

    socket.to(eventData.prjRoom).emit("eventData", eventData);
  });
  

});
