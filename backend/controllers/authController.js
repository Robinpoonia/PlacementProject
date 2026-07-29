const jwt = require("jsonwebtoken");

const googleCallback = async (req, res) => {
    try {
        const token = jwt.sign(
            {
                id: req.user._id,
                role: req.user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.redirect(
            `${process.env.FRONTEND_URL}/auth-success?token=${token}`
        );
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
};

const getCurrentUser = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

const logout = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

module.exports = {
    googleCallback,
    getCurrentUser,
    logout,
};