const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/me', authMiddleware, authController.getMe);

module.exports = router;