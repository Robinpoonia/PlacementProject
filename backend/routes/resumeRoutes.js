const router = require("express").Router();

const upload = require("../middlewares/upload");

const {
  uploadResume,
  getMyResumes,
  getResume,
  setDefaultResume,
  getAllResumes,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middlewares/auth");

// Upload a new resume
router.post(
  "/",
  protect,
  upload.single("resume"),
  uploadResume
);

// Get all resumes of logged-in user
router.get(
  "/my",
  protect,
  getMyResumes
);

// Get a resume by ID
router.get(
  "/:id",
  protect,
  getResume
);

// Make a resume default
router.put(
  "/default/:id",
  protect,
  setDefaultResume
);
router.get(
  "/",
  protect,
  getAllResumes
);

// Delete a resume
router.delete(
  "/:id",
  protect,
  deleteResume
);

module.exports = router;