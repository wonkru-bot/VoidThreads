import express from 'express';
const router = express.Router();
import resetPassword from '../controllers/resetPassword.js';

router.post('/', resetPassword.handleResetPassword);

export default router;