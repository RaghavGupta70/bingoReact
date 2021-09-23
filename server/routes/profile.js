import express from 'express';
import { getProfile,createProfile } from '../controllers/profile.js';

const router = express.Router();

router.get('/getMyProfile/:email',getProfile);
router.post('/createProfile',createProfile);

export default router;