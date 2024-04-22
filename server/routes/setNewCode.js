import express from 'express';
const router = express.Router();
import newcodeController from '../controllers/setnewroomCode.js';

router.post('/', newcodeController.setNewCode);

export default router