require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const resumeRoutes= require('./routes/resumeRoutes');
const app = express();

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

app.use(
'/api/resume',
resumeRoutes
);
app.use(
  '/api/experiences',
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