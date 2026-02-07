const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyExperiences } = require('../controllers/experienceController');

// Public routes
router.get('/', getCompanies);
router.get('/:companyName', getCompanyExperiences);

module.exports = router;
