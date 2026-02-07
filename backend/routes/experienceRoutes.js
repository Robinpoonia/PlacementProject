const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  getUserExperiences,
} = require('../controllers/experienceController');
const { protect, requireSenior } = require('../middlewares/auth');

// Public routes - anyone can view
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected routes - only authenticated users
router.get('/user/my-experiences', protect, getUserExperiences);

// Protected routes - only seniors and admins can create
router.post(
  '/',
  protect,
  requireSenior,
  [
    body('company').notEmpty().trim(),
    body('roundType').isIn(['OT', 'Technical', 'HR']),
    body('description').notEmpty().trim(),
    body('result').isIn(['Qualified', 'Not Qualified']),
  ],
  createExperience
);

// Protected routes - owner or admin can update/delete
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
