const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

// ==========================================
// GET MY PROFILE
// GET /api/users/profile
// ==========================================

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
};


// ==========================================
// UPDATE MY PROFILE
// PUT /api/users/profile
// ==========================================

exports.updateMyProfile = async (req, res) => {
  try {

    const {
      phone,
      batch,
      selectedCompany,
      package: packageValue,
      profilePhoto,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // =========================
    // UPDATE FIELDS
    // =========================

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (batch !== undefined) {
      user.batch = batch || undefined;
    }

    if (selectedCompany !== undefined) {
      user.selectedCompany = selectedCompany.trim();
    }

    if (packageValue !== undefined) {
      user.package =
        packageValue === "" || packageValue === null
          ? null
          : Number(packageValue);
    }

    if (profilePhoto !== undefined) {
      user.profilePhoto = profilePhoto.trim();
    }


    await user.save();


    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        profilePhoto: user.profilePhoto,
        phone: user.phone,
        batch: user.batch,

        selectedCompany: user.selectedCompany,
        package: user.package,
      },
    });

  } catch (error) {

    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


// ============================================
// UPLOAD PROFILE PICTURE
// ============================================

exports.uploadProfilePicture = async (
  req,
  res
) => {
  try {
        console.log("========== PROFILE UPLOAD ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    console.log("====================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please choose an image",
      });
    }

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete previous manually uploaded image
    if (user.profilePicturePublicId) {
      try {
        await cloudinary.uploader.destroy(
          user.profilePicturePublicId,
          {
            resource_type: "image",
          }
        );
      } catch (error) {
        console.error(
          "Old profile image delete error:",
          error
        );
      }
    }

    // Save new Cloudinary image
    user.profilePicture = req.file.path;

    user.profilePicturePublicId =
      req.file.filename;

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Profile picture updated successfully",

      profilePicture:
        user.profilePicture,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        batch: user.batch,
        phone: user.phone,
        selectedCompany:
          user.selectedCompany,
        package: user.package,
        profilePicture:
          user.profilePicture,
      },
    });
  } catch (error) {
    console.error(
      "Profile picture upload error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to upload profile picture",
    });
  }
};
// ============================================
// GET ALL SENIORS / BOSS / ALUMNI
// GET /api/users/seniors
// ============================================

exports.getAllSeniors = async (req, res) => {
  try {
    const seniors = await User.find({
      role: {
        $in: ["senior", "boss", "alumni"],
      },
      isActive: true,
    })
      .select(
        "name email scholarNo profilePicture batch selectedCompany package role"
      )
      .sort({
        batch: -1,
        name: 1,
      });

    return res.status(200).json({
      success: true,
      count: seniors.length,
      users: seniors,
    });
  } catch (error) {
    console.error("GET SENIORS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch seniors",
    });
  }
};