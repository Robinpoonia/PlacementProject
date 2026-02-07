# 🎓 InterviewXP - Interview Experience Platform

A modern platform where seniors anonymously share company-wise, round-wise interview experiences to help juniors prepare better for placements.

## ✨ Features

### Core Features
- 🔐 **Role-Based Authentication** (Admin, Senior, Junior)
- 👤 **Google OAuth 2.0** Integration
- 🏢 **Company-wise Organization** of experiences
- 📝 **Round-wise Categorization** (OT, Technical, HR)
- 🎭 **100% Anonymous** sharing
- ⚡ **Real-time Updates**
- 📊 **Admin Dashboard** for user management

### User Roles

#### 👶 Junior (Default)
- Browse all experiences anonymously
- Search by company and round type
- View qualification results and insights

#### 🎓 Senior
- All Junior permissions
- Share interview experiences anonymously
- Edit/delete own experiences
- Help juniors prepare better

#### 👑 Admin
- All Senior permissions
- User management (role changes, activation/deactivation)
- Delete any user or experience
- View platform statistics
- Full control panel

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Passport.js (Google OAuth)
- Express Validator

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials

### Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

5. Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

4. Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
interview-platform/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── passport.js           # Google OAuth config
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── experienceController.js
│   │   └── adminController.js    # Admin operations
│   ├── middlewares/
│   │   └── auth.js               # JWT & role middleware
│   ├── models/
│   │   ├── User.js               # User schema with roles
│   │   └── Experience.js         # Experience schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── experienceRoutes.js
│   │   ├── companyRoutes.js
│   │   └── adminRoutes.js        # Admin-only routes
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   └── SignInModal.jsx
│   │   │   ├── Layout/
│   │   │   │   └── Header.jsx
│   │   │   ├── Company/
│   │   │   │   └── CompanyCard.jsx
│   │   │   ├── Experience/
│   │   │   │   ├── ExperienceCard.jsx
│   │   │   │   └── ExperienceForm.jsx
│   │   │   └── Admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register (role: junior/senior)
- `POST /api/auth/login` - Login
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/google/callback` - OAuth callback

### Experiences
- `GET /api/experiences` - Get all (public)
- `GET /api/experiences/:id` - Get by ID
- `POST /api/experiences` - Create (senior+)
- `PUT /api/experiences/:id` - Update (owner/admin)
- `DELETE /api/experiences/:id` - Delete (owner/admin)

### Companies
- `GET /api/companies` - List all companies
- `GET /api/companies/:name` - Get company experiences

### Admin (Admin Only)
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id/role` - Change role
- `PUT /api/admin/users/:id/status` - Toggle status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Platform stats

## 🎨 Design System

### Colors
```css
--dark-bg: #0a0f1a
--dark-card: #1a1f2e
--cyan-primary: #00d9ff
--text-white: #ffffff
--text-gray: #9ca3af
```

### Effects
- Glassmorphism with backdrop blur
- Subtle 3D shadows
- Cyan glow on hover
- Smooth animations

## 👤 User Workflows

### Junior User
1. Browse companies and experiences
2. Filter by round type
3. Read anonymous experiences
4. Learn from others' journeys

### Senior User
1. Sign in (Email or Google)
2. Navigate to "Share Experience"
3. Select company and round type
4. Write detailed experience
5. Submit anonymously

### Admin User
1. Access admin dashboard
2. View all users and stats
3. Manage user roles
4. Activate/deactivate accounts
5. Monitor platform health

## 🔒 Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT tokens with role claims
- ✅ Route protection by role
- ✅ Ownership verification
- ✅ Account deactivation
- ✅ Self-deletion prevention
- ✅ Last admin protection

## 🎯 Creating First Admin

After first user registration:

```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register as junior
- [ ] Register as senior
- [ ] Login with email/password
- [ ] Login with Google OAuth
- [ ] Role persists after refresh

**Authorization - Junior:**
- [ ] Can view experiences ✓
- [ ] Cannot create experiences ✗
- [ ] Cannot edit experiences ✗
- [ ] Cannot access admin ✗

**Authorization - Senior:**
- [ ] Can create experiences ✓
- [ ] Can edit own experiences ✓
- [ ] Cannot edit others' ✗
- [ ] Cannot access admin ✗

**Authorization - Admin:**
- [ ] Can access admin dashboard ✓
- [ ] Can change user roles ✓
- [ ] Can delete users ✓
- [ ] Cannot delete self ✗

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=random-secret-key
SESSION_SECRET=random-session-key
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Add `VITE_API_URL` env variable
4. Deploy

**Important:** Update `GOOGLE_CALLBACK_URL` to production URL after deployment!

## 🐛 Troubleshooting

### OAuth Not Working
- Check Google Console callback URL matches `.env`
- Ensure `FRONTEND_URL` is correct
- Verify OAuth credentials

### Cannot Create Experiences
- Check user role (must be senior/admin)
- Verify JWT token in headers
- Check network tab for errors

### Admin Dashboard Empty
- Ensure user role is `admin`
- Create admin via MongoDB
- Check API endpoint returns data

## 📚 Additional Resources

- [Implementation Guide](./ROLE_BASED_AUTH_IMPLEMENTATION.md)
- [Frontend Design Guide](./FRONTEND_CODE_REVIEW.md)
- [Backend API Documentation](./backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License

## 👥 Support

For issues and questions:
- Open GitHub issue
- Email: support@interviewxp.com

---

**Built with ❤️ for students, by students**
