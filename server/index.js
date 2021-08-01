import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from './routes/auth.js';
import http from 'http';
import {Server} from 'socket.io';
import * as room from './controllers/users.js';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({extended: true,limit: '50mb'}));
app.use(cors());
const corsOptions={
    cors: true,
    origins:["http://localhost:5000"],
}

const io = new Server(server,corsOptions);

app.use('/auth',auth);

app.use("/SignIn", (req,res) =>
{
    res.send({tok: "session_token"});
})

io.on('connection',(socket) => {
    console.log('User has connected with socket.io');

    socket.on('create',(userName ,callback) => {

        const {error,newRoom} = room.createRoom(userName);
        // console.log(userName)
        // console.log(newRoom)
        if(error) return callback(error);

        socket.join(newRoom.roomId);
        socket.emit('room',(newRoom.roomId), (error) => {
            console.log(error)
        })
        console.log(newRoom.roomId)
    })

    socket.on('join',(roomId,userName,callback) => {

        console.log(userName);
        const {error,newRoom} = room.joinRoom(roomId,userName);
        // console.log(userName)
        console.log(newRoom)
        if(error) return console.log(error);

        socket.join(newRoom.roomId);
        socket.emit('room',(newRoom.roomId), (error) => {
            console.log(error);
        })
        console.log(newRoom.roomId)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const mongoUrl = "mongodb+srv://sukhanDeo:Raghav@70@cluster0.4pnog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{useNewUrlParser: true,useFindAndModify: false,useUnifiedTopology: true,useCreateIndex: true})
        .then
           try {
               console.log("Connected to MongoDb");
           } catch (error) {
               console.log(error.message);
           }


app.get("/", (req, res) => {
    res.send("Hello Sucker")
});

server.listen(5000, (req,res) => {
    console.log("Port successfully connected")
});