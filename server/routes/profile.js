import express from 'express';
import { getProfile,createProfile,getAllOpponentMatches } from '../controllers/profile.js';

const router = express.Router();

router.get('/getMyProfile/:email',getProfile);
router.post('/createProfile',createProfile);
router.get('/getAllOpponents/:email',getAllOpponentMatches);

export default router;