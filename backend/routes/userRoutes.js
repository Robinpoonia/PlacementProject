const express = require("express");

const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  uploadProfilePicture,
  getAllSeniors,
} = require("../controllers/userController");

const {
  protect,
} = require("../middlewares/auth");

// ✅ CORRECT
const profileUpload = require("../middlewares/profileUpload");


// ================================
// GET MY PROFILE
// ================================

router.get(
  "/profile",
  protect,
  getMyProfile
);


// ================================
// UPDATE MY PROFILE
// ================================

router.put(
  "/profile",
  protect,
  updateMyProfile
);


// ================================
// UPLOAD PROFILE PICTURE
// ================================

router.put(
  "/profile/picture",
  protect,
  profileUpload.single("profilePicture"),
  uploadProfilePicture
);
// ============================================
// PUBLIC SENIORS
// ============================================

router.get(
  "/seniors",
  getAllSeniors
);


module.exports = router;