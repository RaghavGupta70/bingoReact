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
    console.log(error.message);
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
    console.log(id, "Hai bhai kaisi lagi");

    newPlayer.save();

    return res.status(200).json(newPlayer);
  } catch (error) {
    console.log(error.message);
  }
};

export const joinRoom = async (req, res) => {
  const { id, userName, userEmail } = req.body;

  try {
    const existingID = await game.find({ roomID: id });

    if (!existingID) {
      return res.status(404).json({ message: "Wrong room ID" });
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
    console.log(error.message);
  }
};
