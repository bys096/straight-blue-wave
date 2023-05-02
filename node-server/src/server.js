import http from "http";
import SocketIO from "socket.io";
import express from "express";
import cors from "cors"; // 추가



const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, "build")));

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

wsServer.on("connection", (socket) => {
  console.log('Clienct Connected');
  socket.on("join_room", (roomName) => {
        console.log(wsServer.sockets.adapter);

        socket.join(roomName);
        console.log(`User joined room: ${roomName}`); // 여기에 콘솔 로그를 추가합니다.

    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`Listening on http://localhost:4000`);
httpServer.listen(4000, handleListen);