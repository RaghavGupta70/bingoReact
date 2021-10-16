import express from 'express';
import {createRoom} from '../../controllers/game.js';

const router = express.Router();

router.post("/createPlayer",createRoom);

export default router;