const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middlewares/auth');
const {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getPlatformStats,
} = require('../controllers/adminController');

// All admin routes require authentication + admin role
router.use(protect);
router.use(requireAdmin);

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/status', toggleUserStatus);
router.delete('/users/:id', deleteUser);
router.get('/stats', getPlatformStats);

module.exports = router;
