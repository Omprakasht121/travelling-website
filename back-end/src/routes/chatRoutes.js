import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat/message
router.post('/message', handleChatMessage);

export default router;
