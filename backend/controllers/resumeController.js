const Resume = require("../models/Resume");
const cloudinary = require("cloudinary").v2;

// =====================================================
// UPLOAD RESUME
// POST /api/resumes
// =====================================================

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

      // First resume automatically becomes default
      isDefault: count === 0,
    });

    const populatedResume = await Resume.findById(
      resume._id
    ).populate(
      "user",
      "name email role profilePicture batch"
    );

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: populatedResume,
    });
  } catch (err) {
    console.error("UPLOAD RESUME ERROR:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message || "Failed to upload resume",
    });
  }
};

// =====================================================
// GET LOGGED-IN USER'S RESUMES
// GET /api/resumes/me
// =====================================================

exports.getMyResumes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const resumes = await Resume.find({
      user: req.user._id,
    })
      .populate(
        "user",
        "name email scholarNo role profilePicture batch"
      )
      .sort({
        isDefault: -1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (err) {
    console.error("GET MY RESUMES ERROR:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch your resumes",
    });
  }
};

// =====================================================
// GET ALL RESUMES
// GET /api/resumes
// =====================================================

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate(
        "user",
        `
          name
          email
          scholarNo
          role
          profilePicture
          batch
          selectedCompany
          package
        `
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (err) {
    console.error("GET ALL RESUMES ERROR:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch resumes",
    });
  }
};

// =====================================================
// GET RESUME BY ID
// GET /api/resumes/:id
// =====================================================

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(
      req.params.id
    ).populate(
      "user",
      `
        name
        email
        scholarNo
        role
        profilePicture
        batch
        selectedCompany
        package
      `
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (err) {
    console.error("GET RESUME ERROR:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch resume",
    });
  }
};

// =====================================================
// SET DEFAULT RESUME
// PUT /api/resumes/:id/default
// =====================================================

exports.setDefaultResume = async (req, res) => {
  try {
    const resume = await Resume.findById(
      req.params.id
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // User can only modify their own resume
    if (
      resume.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Remove default from all user's resumes
    await Resume.updateMany(
      {
        user: req.user._id,
      },
      {
        $set: {
          isDefault: false,
        },
      }
    );

    // Set selected resume as default
    resume.isDefault = true;

    await resume.save();

    const populatedResume =
      await Resume.findById(
        resume._id
      ).populate(
        "user",
        "name email role profilePicture batch"
      );

    return res.status(200).json({
      success: true,
      message: "Default resume updated",
      resume: populatedResume,
    });
  } catch (err) {
    console.error(
      "SET DEFAULT RESUME ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to update default resume",
    });
  }
};

// =====================================================
// DELETE RESUME
// DELETE /api/resumes/:id
// =====================================================

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(
      req.params.id
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // User can only delete their own resume
    if (
      resume.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const wasDefault = resume.isDefault;

    // =========================================
    // DELETE FROM CLOUDINARY
    // =========================================

    if (resume.publicId) {
      try {
        await cloudinary.uploader.destroy(
          resume.publicId,
          {
            resource_type: "raw",
          }
        );
      } catch (cloudinaryError) {
        console.error(
          "CLOUDINARY DELETE ERROR:",
          cloudinaryError
        );
      }
    }

    // =========================================
    // DELETE FROM MONGODB
    // =========================================

    await resume.deleteOne();

    // =========================================
    // IF DEFAULT WAS DELETED
    // MAKE ANOTHER RESUME DEFAULT
    // =========================================

    if (wasDefault) {
      const nextResume = await Resume.findOne({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

      if (nextResume) {
        nextResume.isDefault = true;

        await nextResume.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to delete resume",
    });
  }
};