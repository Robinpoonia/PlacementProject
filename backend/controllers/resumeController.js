const Resume = require("../models/Resume");
const getPassingBatch = require("../utils/getPassingBatch");
const cloudinary = require("cloudinary").v2;

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Login required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Choose PDF",
      });
    }

    const count = await Resume.countDocuments({
      user: req.user._id,
    });

    const resume = await Resume.create({
      user: req.user._id,
      title: req.body.title,
      resumeUrl: req.file.path,
      publicId: req.file.filename,
      isDefault: count === 0,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Get My Resumes
exports.getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    })
      .populate("user", "name role profilePicture")
      .sort({
        createdAt: -1,
      });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get Resume By Id
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate(
      "user",
      "name role profilePicture"
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get All Resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate("user", "name role profilePicture batch")
      .sort({ createdAt: -1 });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Make Default Resume
exports.setDefaultResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Resume.updateMany(
      {
        user: req.user._id,
      },
      {
        isDefault: false,
      }
    );

    resume.isDefault = true;

    await resume.save();

    res.json({
      message: "Default resume updated",
      resume,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await resume.deleteOne();

    const remaining = await Resume.find({
      user: req.user._id,
    }).sort({
      createdAt: 1,
    });

    if (remaining.length && !remaining.some((r) => r.isDefault)) {
      remaining[0].isDefault = true;
      await remaining[0].save();
    }

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};