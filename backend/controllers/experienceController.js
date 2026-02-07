const Experience = require('../models/Experience');
const { validationResult } = require('express-validator');

const createExperience = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, roundType, description, result, nextRoundDetails } = req.body;

    const experience = await Experience.create({
      user: req.user._id,
      company,
      roundType,
      description,
      result,
      nextRoundDetails,
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllExperiences = async (req, res) => {
  try {
    const { company, roundType } = req.query;
    const filter = {};

    if (company) filter.company = company;
    if (roundType) filter.roundType = roundType;

    const experiences = await Experience.find(filter)
      .select('-user') // Don't expose user IDs
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Experience.distinct('company');
    
    // Get experience count for each company
    const companiesWithCount = await Promise.all(
      companies.map(async (company) => {
        const count = await Experience.countDocuments({ company });
        return {
          name: company,
          totalExperiences: count
        };
      })
    );

    res.json(companiesWithCount.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyExperiences = async (req, res) => {
  try {
    const { companyName } = req.params;
    const { roundType } = req.query;

    const filter = { company: companyName };
    if (roundType) filter.roundType = roundType;

    const experiences = await Experience.find(filter)
      .select('-user')
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).select('-user');

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Check ownership or admin
    if (experience.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this experience' });
    }

    const { company, roundType, description, result, nextRoundDetails } = req.body;

    experience.company = company || experience.company;
    experience.roundType = roundType || experience.roundType;
    experience.description = description || experience.description;
    experience.result = result || experience.result;
    experience.nextRoundDetails = nextRoundDetails !== undefined ? nextRoundDetails : experience.nextRoundDetails;

    await experience.save();

    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Check ownership or admin
    if (experience.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this experience' });
    }

    await Experience.findByIdAndDelete(req.params.id);

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExperience,
  getAllExperiences,
  getCompanies,
  getCompanyExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  getUserExperiences,
};
