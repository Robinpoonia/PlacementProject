require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
      console.error('Usage: node createAdmin.js <email>');
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`User with email ${email} not found`);
      console.log('Please register this user first, then run this script');
      process.exit(1);
    }

    // Update user to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully updated ${email} to admin role`);
    console.log(`User details:`, {
      email: user.email,
      role: user.role,
      name: user.name || 'Not set'
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
