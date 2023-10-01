const express = require("express");
const { v4 } = require("uuid");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.static("client"));
app.get("/video-call", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});
app.get("/", (req, res) => {
  res.send("hello world");
});

const serverWithSocket = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${process.env.PORT || 3000}`);
});

const io = require("socket.io")(serverWithSocket);
io.on("connection", (socket) => {
  socket.emit("connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("generate:socket:room", () => {
    const roomId = v4();
    socket.join(roomId);
    socket.emit("socket:room:generated", roomId);
  });

  socket.on("join:socket:room", (roomId) => {
    socket.join(roomId);
    socket.emit("socket:room:joined");
    socket.to(roomId).emit("new:user:joined", socket.id);
  });

  socket.on("send:offer", (offer, roomId) => {
    socket.to(roomId).emit("received:offer", offer);
  });

  socket.on("send:answer", (answer, roomId) => {
    socket.to(roomId).emit("received:answer", answer);
  });

  socket.on("answer:accepted", (roomId) => {
    socket.emit("connection:steps:completed");
    socket.to(roomId).emit("connection:steps:completed");
  });

  socket.on("send:negotiation:offer", (offer, roomId) => {
    socket.to(roomId).emit("received:negotiation:offer", offer);
  });

  socket.on("send:negotiation:answer", (answer, roomId) => {
    socket.to(roomId).emit("received:negotiation:answer", answer);
  });

  socket.on("new:ice:candidate", (iceCandidate, roomId) => {
    socket.to(roomId).emit("new:ice:candidate:received", iceCandidate);
  });

  socket.on("end:call:start", (roomId) => {
    socket.emit("end:call");
    socket.to(roomId).emit("end:call");
  });

  socket.on("video:track:toggle", (roomId, value) => {
    socket.to(roomId).emit("video:track:toggle", value);
  });

  socket.on("audio:track:toggle", (roomId, value) => {
    socket.to(roomId).emit("audio:track:toggle", value);
  });
});
