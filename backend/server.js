require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const resumeRoutes= require('./routes/resumeRoutes');
const passport = require("./config/passport");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const app = express();
const dns = require('dns');
dns.setServers([
	'1.1.1.1',
	'8.8.8.8'
])
// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mcalaunchpad.vercel.app"
    ],
    credentials: true
  })
);
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use(
'/uploads',
express.static(
'uploads'
)
);
app.use("/api/users", userRoutes);

app.use(
'/api/resume',
resumeRoutes
);
app.use(
  '/api/experience',
  experienceRoutes
);

app.use(
  '/api/companies',
  companyRoutes
);

app.use(
  '/api/admin',
  adminRoutes
);
app.use("/api/dashboard", dashboardRoutes);


// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server Running',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});