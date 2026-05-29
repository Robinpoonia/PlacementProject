const Experience = require('../models/Experience');

const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create({
      user: req.user._id,
      company: req.body.company,
      roundType: req.body.roundType,
      description: req.body.description,
      result: req.body.result,
      nextRoundDetails: req.body.nextRoundDetails,
      anonymous: true
    });

    const populated = await Experience.findById(experience._id)
      .populate('user', 'name resumeUrl');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllExperiences = async (req, res) => {
  try {
    const { company, roundType } = req.query;
    const filter = {};

    if (company) filter.company = company;
    if (roundType) filter.roundType = roundType;

    const experiences = await Experience.find(filter)
      .populate('user', 'name resumeUrl')
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Experience.distinct('company');

    const data = await Promise.all(
      companies.map(async (company) => ({
        name: company,
        totalExperiences: await Experience.countDocuments({ company })
      }))
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCompanyExperiences = async (req, res) => {
  try {
    const filter = { company: req.params.companyName };

    if (req.query.roundType) {
      filter.roundType = req.query.roundType;
    }

    const data = await Experience.find(filter)
      .populate('user', 'name resumeUrl')
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('user', 'name resumeUrl');

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Authorization Check
    if (
      experience.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(experience, req.body);
    await experience.save();

    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Authorization Check
    if (
      experience.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserExperiences = async (req, res) => {
  try {
    const data = await Experience.find({ user: req.user._id })
      .populate('user', 'name resumeUrl')
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  getUserExperiences
};