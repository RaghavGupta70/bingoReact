import express from 'express';
import {createRoom,joinRoom,fetchRoom,lockRoom} from '../controllers/game.js';

const router = express.Router();

router.get("/fetchRoomData/:id",fetchRoom);
router.post("/createPlayer",createRoom);
router.post("/joinPlayer", joinRoom);
router.patch('/lockRoom/:roomID',lockRoom);

export default router;