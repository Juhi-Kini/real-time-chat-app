const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory } = require('../controllers/messageController');

router.post('/messages', sendMessage);
router.get('/messages', getChatHistory);

module.exports = router;