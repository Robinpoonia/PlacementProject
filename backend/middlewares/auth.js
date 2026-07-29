const jwt = require("jsonwebtoken");
const User = require("../models/User");

/*
|--------------------------------------------------------------------------
| Protect Routes (JWT Authentication)
|--------------------------------------------------------------------------
*/

const protect = async (req, res, next) => {
    try {
        console.log("========== AUTH ==========");

        console.log("Authorization:", req.headers.authorization);

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id);

        console.log("User:", user);

        req.user = user;

        next();
    } catch (err) {
        console.log("JWT ERROR:");
        console.error(err);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
/*
|--------------------------------------------------------------------------
| Role Authorization
|--------------------------------------------------------------------------
*/

const restrictTo = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to perform this action.",
                yourRole: req.user.role,
                requiredRoles: roles
            });
        }

        next();

    };

};

/*
|--------------------------------------------------------------------------
| Ready-to-use Middlewares
|--------------------------------------------------------------------------
*/

// Only Admin
const requireAdmin = restrictTo("admin");

// Boss + Admin
const requireBoss = restrictTo(
    "boss",
    "admin"
);

// Senior + Boss + Admin
const requireSenior = restrictTo(
    "senior",
    "boss",
    "admin"
);

// Junior + Senior + Boss + Admin
const requireJunior = restrictTo(
    "junior",
    "senior",
    "boss",
    "admin"
);

// Alumni + Everyone Above
const requireAlumni = restrictTo(
    "alumni",
    "junior",
    "senior",
    "boss",
    "admin"
);

module.exports = {
    protect,
    restrictTo,
    requireAdmin,
    requireBoss,
    requireSenior,
    requireJunior,
    requireAlumni
};