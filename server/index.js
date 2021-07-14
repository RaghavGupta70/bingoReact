import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from './routes/auth.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({extended: true,limit: '50mb'}));

app.use(cors());

app.use('/auth',auth);

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

app.listen(5000, (req,res) => {
    console.log("Port successfully connected")
});