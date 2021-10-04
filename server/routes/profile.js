import express from 'express';
import { getProfile,createProfile,getAllOpponentMatches,getLeaderboardData } from '../controllers/profile.js';

const router = express.Router();

router.get('/getMyProfile/:email',getProfile);
router.post('/createProfile',createProfile);
router.get('/getAllOpponents/:email',getAllOpponentMatches);
router.get('/getLeaderboardData',getLeaderboardData);

export default router;