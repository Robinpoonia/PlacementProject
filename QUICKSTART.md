# 🚀 Quick Start Guide

## Step-by-Step Setup

### 1. Prerequisites Check
- [ ] Node.js 16+ installed (`node --version`)
- [ ] MongoDB Atlas account created
- [ ] Google OAuth credentials ready

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://your-domain.com/api/auth/google/callback` (production)
6. Copy Client ID and Client Secret

### 3. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your credentials
nano .env  # or use your preferred editor
```

**Required .env values:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewDB
JWT_SECRET=any-random-string-min-32-chars
SESSION_SECRET=another-random-string
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

```bash
# Start backend
npm run dev

# You should see:
# "Server running on port 5000"
# "MongoDB connected successfully"
```

### 4. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start frontend
npm run dev

# You should see:
# "Local: http://localhost:5173"
```

### 5. First User Setup

1. Open browser: `http://localhost:5173`
2. Click "Sign In"
3. Register with email and password
4. Select role: Senior (or Junior)

### 6. Create Admin User

In backend terminal:

```bash
# Replace with your registered email
node createAdmin.js your-email@example.com

# You should see:
# "✅ Successfully updated your-email@example.com to admin role"
```

### 7. Verify Everything Works

**Test Authentication:**
- [ ] Register new user
- [ ] Login with email/password
- [ ] Login with Google OAuth

**Test Junior Features:**
- [ ] View companies
- [ ] View experiences
- [ ] Cannot create experience

**Test Senior Features:**
- [ ] Create new experience
- [ ] Edit own experience
- [ ] Delete own experience

**Test Admin Features:**
- [ ] Access admin dashboard
- [ ] View all users
- [ ] Change user roles
- [ ] View statistics

## 🎯 Your First Experience

As a Senior/Admin user:

1. Click "Share Your Story" or "Share Experience"
2. Select a company
3. Choose round type (OT, Technical, HR)
4. Write your experience
5. Select result (Qualified/Not Qualified)
6. If qualified, add next round details (optional)
7. Submit

Your experience will appear anonymously!

## 🐛 Common Issues

### "MongoDB connection error"
- Check MONGO_URI is correct
- Ensure IP whitelist includes your IP (0.0.0.0/0 for all)
- Verify database user has read/write permissions

### "Google OAuth not working"
- Verify callback URL matches Google Console
- Check GOOGLE_CLIENT_ID and SECRET are correct
- Ensure Google+ API is enabled

### "Cannot create experience"
- Check user role is senior or admin
- Verify JWT token in localStorage
- Check browser console for errors

### "Admin dashboard shows nothing"
- Ensure you ran createAdmin.js script
- Check user role in MongoDB: `db.users.findOne({email: "..."})`
- Verify API endpoint `/api/admin/users` returns data

## 📝 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Backend: Uses nodemon, auto-restarts on file changes
- Frontend: Uses Vite HMR, instant updates

### Database Viewing
Use MongoDB Compass:
1. Download from mongodb.com/try/download/compass
2. Connect using your MONGO_URI
3. View/edit data visually

### API Testing
Use Thunder Client (VS Code) or Postman:
1. Register/Login to get token
2. Add header: `Authorization: Bearer YOUR_TOKEN`
3. Test protected endpoints

### Clear Data
```bash
# In MongoDB shell or Compass
db.users.deleteMany({})
db.experiences.deleteMany({})
```

## 🎨 Customization

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  'dark-bg': '#0a0f1a',      // Change this
  'dark-card': '#1a1f2e',    // Change this
  'cyan-primary': '#00d9ff', // Change this
}
```

### Add New Round Types
1. Update `backend/models/Experience.js`:
   ```javascript
   enum: ['OT', 'Technical', 'HR', 'Your New Type']
   ```
2. Update frontend form options

### Change Default Role
Edit `backend/models/User.js`:
```javascript
default: 'junior'  // Change to 'senior' if you want
```

## 🚀 Ready to Deploy?

See [Deployment Guide](./DEPLOYMENT.md) for production setup.

## 🤝 Need Help?

- Check [README.md](./README.md) for detailed docs
- Review [Implementation Guide](./ROLE_BASED_AUTH_IMPLEMENTATION.md)
- Open GitHub issue

---

**Happy coding! 🎉**
