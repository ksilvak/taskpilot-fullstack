const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const {
  getUser,
  updateUser,
} = require('../controllers/user.controller');

const router = express.Router();
const { changePassword } = require('../controllers/user.controller');

router.patch('/me/password', authMiddleware, changePassword);
router.get('/me', authMiddleware, getUser);
router.patch('/me', authMiddleware, updateUser);

module.exports = router;
