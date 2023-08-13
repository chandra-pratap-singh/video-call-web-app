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

const serverWithSocket = app.listen(3000, () => {
  console.log("App running on port 3000");
});

const roomsDb = {};

const io = require("socket.io")(serverWithSocket);
io.on("connection", (socket) => {
  socket.emit("connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("generate:socket:room", () => {
    const roomId = v4();
    socket.join(roomId);
    // roomsDb[roomId] = {
    //   host: socket.id,
    // };
    socket.emit("socket:room:generated", roomId);
  });

  socket.on("join:socket:room", (roomId) => {
    console.log("roomId ", roomId);
    socket.join(roomId);
    // roomsDb[roomId] = {
    //   ...roomsDb[roomId],
    //   participants: [...(roomsDb[roomId].participants || []), socket.id],
    // };
    socket.emit("socket:room:joined");
    socket.to(roomId).emit("new:user:joined", socket.id);
  });

  socket.on("send:offer", (offer, roomId) => {
    socket.to(roomId).emit("received:offer", offer);
  });

  socket.on("send:answer", (answer, roomId) => {
    socket.to(roomId).emit("received:answer", answer);
  });

  socket.on("send:negotiation:offer", (offer, roomId) => {
    socket.to(roomId).emit("received:negotiation:offer", offer);
  });

  socket.on("send:negotiation:answer", (answer, roomId) => {
    socket.to(roomId).emit("received:negotiation:answer", answer);
  });
});
