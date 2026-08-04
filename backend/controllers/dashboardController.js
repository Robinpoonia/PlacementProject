const Experience = require("../models/Experience");
const Resume = require("../models/Resume");

exports.getDashboard = async (req, res) => {
    try {

        const [posts, resumes] = await Promise.all([

            Experience.find({ user: req.user._id })
                .populate("resume", "title resumeUrl isDefault")
                .sort({ createdAt: -1 }),

            Resume.find({ user: req.user._id })
                .sort({ createdAt: -1 })

        ]);

        res.json({
            posts,
            resumes
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};