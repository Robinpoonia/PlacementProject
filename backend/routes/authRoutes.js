const express = require("express");
const passport = require("passport");

const {
    googleCallback,
    getCurrentUser,
    logout,
} = require("../controllers/authController");

const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
    }),
    googleCallback
);

router.get("/me", protect, getCurrentUser);

router.post("/logout", logout);

module.exports = router;