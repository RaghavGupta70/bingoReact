import express from 'express';
import { getUsers,signUp,signIn } from '../controllers/auth.js';

const router = express.Router();

router.get('/',getUsers);
router.post('/signUp',signUp);
router.post('/signIn',signIn);

export default router;