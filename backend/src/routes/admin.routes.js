const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const {
  getAllUsers,
  deleteUser,
} = require('../controllers/admin.controller');

const router = express.Router();

// GET /api/admin/users
router.get(
  '/users',
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// DELETE /api/admin/users/:id
router.delete(
  '/users/:id',
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;
