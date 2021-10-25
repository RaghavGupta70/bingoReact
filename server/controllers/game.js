import game from "../models/game.js";
import { randomString } from "./users.js";

let passingID = "";
export const idFetch = () => {
  return passingID;
};

export const fetchRoom = async (req, res) => {
  const id = req.params.id;

  try {
    const existingID = await game.find({ roomID: id });

    if (!existingID) {
      return res.status(404).json({ message: "No room exists with this ID" });
    }

    return res.status(200).json(existingID);
  } catch (error) {

  }
};

export const createRoom = async (req, res) => {
  const id = randomString(
    11,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );

  const { userName, userEmail } = req.body;

  try {
    const newID = await game.find({ roomID: id });

    if (newID === id) {
      return res.status(404).json({ message: "Connection Refused" });
    }

    passingID = id;

    const newCreator = {
      roomID: id,
      userName: userName,
      userEmail: userEmail,
      numbers: [],
    };

    const newPlayer = new game(newCreator);

    newPlayer.save();

    return res.status(200).json(newPlayer);
  } catch (error) {

  }
};

export const lockRoom = async (req,res) => {
  try {

    const roomID = req.params.roomID;

    const roomExist = await game.findOne({roomID: roomID});

    if(!roomExist)
    {
      return res.status(404).json({ message: "Wrong room ID" });
    }

    roomExist.lock = true;

    const newRoom = await game.findOneAndUpdate({ roomID: roomID }, { $set: roomExist }, { new: true, upsert: true });

    return res.status(200).json(newRoom);

  } catch (error) {

  }
}

export const joinRoom = async (req, res) => {
  const { id, userName, userEmail } = req.body;

  try {
    const existingID = await game.findOne({ roomID: id });

    if (!existingID) {
      return res.status(404).json({ message: "Wrong room ID" });
    }

    if(existingID.lock)
    {
      return res.status(404).json({message: 'Match already started find another'});
    }

    const newPlayer = {
      roomID: id,
      userName: userName,
      userEmail: userEmail,
      numbers: [],
    };

    const newData = new game(newPlayer);

    newData.save();

    return res.status(200).json(newData);
  } catch (error) {
    
  }
};
