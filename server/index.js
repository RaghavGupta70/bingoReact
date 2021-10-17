import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import profile from './routes/profile.js';
import game from './routes/game.js';
import http from "http";
import { Server } from "socket.io";
import * as room from './controllers/users.js';

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
app.use('/profile',profile);
app.use('/game',game);

app.use("/SignIn", (req, res) => {
  res.send({ tok: "session_token" });
});

io.on("connection", (socket) => {
  console.log("User has connected with socket.io");

  socket.on("create",(roomID,callback) => {

      socket.join(roomID);
    socket.to(roomID).emit("room", roomID);
      console.log(roomID,'AA gaye swaad')
  });

  socket.on("play", (roomID, callback) => {
    console.log(roomID, "here i am");
    const played = true;
    let obj = { id: roomID };
    // const roomId = roomID.toString();

    console.log(typeof(roomID))
    if(roomID)
    {
  socket.to(obj.id).emit("playStart", played);
  console.log("Working");
    }
  
    // io.on("connection", (socket) => {
    //   socket.to(roomID).emit('playStart',(played));
    // });
  });

  socket.on("join", async (Id, callback) => {
  
     
      socket.join(Id);
    }
  );

  socket.on("gameValue", (gameVal,num, callback) => {
    console.log(gameVal,num);

  gameVal.forEach(element => {
      element.numbers.push(num);
    });
    console.log(gameVal,gameVal[0].roomID);

    socket.broadcast.to(gameVal[0].roomID).emit("message", gameVal);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const mongoUrl =
  "mongodb+srv://sukhanDeo:Raghav@70@cluster0.4pnog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then;
try {
  console.log("Connected to MongoDb");
} catch (error) {
  console.log(error.message);
}

app.get("/", (req, res) => {
  res.send("Hello Sucker");
});

server.listen(5000, (req, res) => {
  console.log("Port successfully connected");
});

