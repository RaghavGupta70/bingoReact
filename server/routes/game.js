import express from 'express';
import {createRoom,joinRoom,fetchRoom} from '../controllers/game.js';

const router = express.Router();

router.get("/fetchRoomData/:id",fetchRoom);
router.post("/createPlayer",createRoom);
router.post("/joinPlayer", joinRoom);


export default router;