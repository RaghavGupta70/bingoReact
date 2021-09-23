import express from 'express';
import { getProfile,createProfile } from '../controllers/profile.js';

const router = express.Router();

router.get('/getMyProfile',getProfile);
router.post('/createProfile',createProfile);

export default router;