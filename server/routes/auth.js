import express from 'express';
import { getUsers,signUp,signIn,googleSignIn } from '../controllers/auth.js';

const router = express.Router();

router.get('/',getUsers);
router.post('/signUp',signUp);
router.post('/signIn',signIn);
router.post('/googleSignIn',googleSignIn);

export default router;