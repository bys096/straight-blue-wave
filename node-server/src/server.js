import http from "http";
import SocketIO from "socket.io";
import express from "express";
import cors from "cors"; // 추가


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
// const wsServer = SocketIO(httpServer);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: "http://localhost:3000", // 클라이언트 도메인을 허용합니다.
    methods: ["GET", "POST"],
  },
});

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

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(4000, handleListen);