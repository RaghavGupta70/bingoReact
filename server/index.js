import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import profile from './routes/profile.js';
import game from './routes/game.js';
import http from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import * as room from './controllers/users.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(cors());
const corsOptions = {
  cors: true,
  origins: ["http://localhost:5000"],
};

const io = new Server(server, corsOptions);

app.use("/auth", auth);
app.use('/profile', profile);
app.use('/game', game);

app.use("/SignIn", (req, res) => {
  res.send({ tok: "session_token" });
});

io.on("connection", (socket) => {

  socket.on("create", (roomID, callback) => {

    socket.join(roomID);
    socket.to(roomID).emit("room", roomID);
  });

  socket.on("play", (roomID, callback) => {
    const played = true;
    let obj = { id: roomID };

    console.log(typeof (roomID))
    if (roomID) {
      socket.to(obj.id).emit("message", { gameValue: played, type: 'Start' });
    }
  });

  socket.on("win", (data, callback) => {
    const result = { type: 'Loser', sender: data.email };
    socket.broadcast.to(data.roomID).emit("message", {gameValue:result,type:'Lost'});
  });

  socket.on("join", async (Id, callback) => {
    socket.join(Id);
  }
  );

  socket.on("gameValue", (data, callback) => {

    if (data.gameVal[0].numbers.length > 0) {
      if (!data.gameVal[0].numbers.find((nums) => nums.value === data.num)) {
        data.gameVal.forEach(element => {
          element.numbers.push({ value: data.num, userName: data.user });
        })
      }
    }

    else {
      data.gameVal.forEach(element => {
        element.numbers.push({ value: data.num, userName: data.user });
      })
    }

    socket.broadcast.to(data.gameVal[0].roomID).emit("message", {gameValue:data.gameVal,type:'Cut'});
  });

  socket.on("disconnect", () => {
    
  });
});

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then;
try {
  console.log("Connected to Database");
} catch (error) {
  console.log(error.message);
}

app.get("/", (req, res) => {
  res.send("Hello Guys");
});

server.listen(5000, (req, res) => {
  console.log("Port successfully connected");
});