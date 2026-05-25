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

const {
  protect,
  requireSenior,
} = require('../middlewares/auth');


// PUBLIC
router.get('/', getAllExperiences);

// IMPORTANT → BEFORE :id
router.get(
  '/user/my-experiences',
  protect,
  getUserExperiences
);

// Dynamic route LAST
router.get('/:id', getExperienceById);


// CREATE
router.post(
  '/',
  protect,
  requireSenior,
  [
    body('company').notEmpty().trim(),
    body('roundType')
      .isIn([
        'OT',
        'Technical',
        'HR'
      ]),
    body('description')
      .notEmpty()
      .trim(),
    body('result')
      .isIn([
        'Qualified',
        'Not Qualified'
      ]),
  ],
  createExperience
);


// UPDATE
router.put(
  '/:id',
  protect,
  updateExperience
);


// DELETE
router.delete(
  '/:id',
  protect,
  deleteExperience
);

module.exports = router;