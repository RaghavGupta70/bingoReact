import express from 'express';
import { getProfile,createProfile,getAllOpponentMatches,getLeaderboardData,updatePlayerData } from '../controllers/profile.js';

const router = express.Router();

router.get('/getMyProfile/:email',getProfile);
router.post('/createProfile',createProfile);
router.get('/getAllOpponents/:email',getAllOpponentMatches);
router.get('/getLeaderboardData',getLeaderboardData);
router.patch('/updateProfile/:email',updatePlayerData);

export default router;