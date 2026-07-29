const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
const getRoleFromScholar = require("../utils/getRole");
const getPassingBatch = require("../utils/getPassingBatch");
const validateScholar = require("../utils/validateScholar");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("========== GOOGLE LOGIN ==========");

        const email = profile.emails[0].value.toLowerCase();
        console.log("Email:", email);

        // Only MANIT students
        if (!email.endsWith("@stu.manit.ac.in")) {
          console.log("❌ Invalid email domain");
          return done(null, false, {
            message: "Only MANIT students are allowed.",
          });
        }

        const scholarNo = email.split("@")[0];
        console.log("Scholar Number:", scholarNo);

        const isValid = validateScholar(scholarNo);

        if (!isValid) {
          console.log("❌ Scholar number rejected");
          return done(null, false, {
            message: "Scholar number is not allowed.",
          });
        }

        // Calculate role & batch
        const role = getRoleFromScholar(scholarNo);
        const batch = getPassingBatch(scholarNo);

        console.log("Calculated Role :", role);
        console.log("Calculated Batch:", batch);

        let user = await User.findOne({ email });

        if (!user) {
          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            scholarNo,
            role,
            batch,
            profilePicture:
              profile.photos?.length > 0
                ? profile.photos[0].value
                : "",
          });

          console.log("✅ New user created");
        } else {
          // Update existing user
          user.googleId = profile.id;
          user.name = profile.displayName;
          user.scholarNo = scholarNo;
          user.role = role;
          user.batch = batch;

          user.profilePicture =
            profile.photos?.length > 0
              ? profile.photos[0].value
              : user.profilePicture;

          await user.save();

          console.log("✅ Existing user updated");
        }

        console.log("Final Role :", user.role);
        console.log("Final Batch:", user.batch);

        return done(null, user);

      } catch (err) {
        console.log("❌ Passport Error");
        console.error(err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err, null);
  }
});

module.exports = passport;