import game from "../models/game.js";
import { randomString } from "./users.js";

export const createRoom = async(req,res) => {

    const id = randomString(11, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const {userName,userEmail} = req.body;

    try {
        const newID = await game.find({roomID: id});

        if(newID === id)
        {
           return res.status(404).json({message: 'Connection Refused'});
        }

        const newCreator = {roomID: id,userName: userName,userEmail: userEmail,numbers: []};

        const newPlayer = new game(newCreator);

        newPlayer.save();

        return res.status(200).json({message: 'Room Created'});

    } catch (error) {
        console.log(error.message);
    }
}
