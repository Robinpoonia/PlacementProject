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

// =====================================================
// UPLOAD RESUME
// POST /api/resumes
// =====================================================

router.post(
  "/",
  protect,
  upload.single("resume"),
  uploadResume
);

// =====================================================
// GET LOGGED-IN USER'S RESUMES
// GET /api/resumes/my
// =====================================================

router.get(
  "/my",
  protect,
  getMyResumes
);

// =====================================================
// GET ALL RESUMES
// GET /api/resumes
// =====================================================

router.get(
  "/",
  protect,
  getAllResumes
);

// =====================================================
// SET DEFAULT RESUME
// PUT /api/resumes/default/:id
// =====================================================

router.put(
  "/default/:id",
  protect,
  setDefaultResume
);

// =====================================================
// GET ONE RESUME
// GET /api/resumes/:id
// =====================================================

router.get(
  "/:id",
  protect,
  getResume
);

// =====================================================
// DELETE RESUME
// DELETE /api/resumes/:id
// =====================================================

router.delete(
  "/:id",
  protect,
  deleteResume
);

module.exports = router;