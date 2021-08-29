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

        const {error,users} = room.createRoom(userName);
        // console.log(userName)
        // console.log(newRoom)
        if(error) return callback(error);

        socket.join(users.roomId);

        socket.emit('room',(users.roomId), (error) => {
            console.log(error)
        })
        console.log(users.roomId)
    })

    socket.on('join',async(Id,userName,callback) =>{
        const {err,roomNo} = await room.joinRoom(Id,userName);
        const usersInRoom = room.getUserInRoom(Id);

        if(err) return console.log(err);

        console.log('room',roomNo);

        if(roomNo){
        socket.emit('room',(roomNo.roomId), (error) => {
            console.log(error);
        })
        socket.broadcast.to(roomNo.roomId).emit('message',(`${userName} has joined!`));
        socket.join(roomNo.roomId);
       }
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