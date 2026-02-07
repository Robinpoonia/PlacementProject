# 🚀 Role-Based Authentication Implementation Guide
## Interview Platform - Code Review & Implementation Checklist

---

## 📋 Overview
This guide provides step-by-step implementation for adding **Admin**, **Senior**, and **Junior** roles to your interview platform with OAuth support.

---

## ✅ PHASE 1: Database Schema Updates

### User Model Enhancement
**File:** `backend/models/User.js`

- [ ] **Add role field** to user schema
  - Type: String, enum: ['admin', 'senior', 'junior']
  - Default: 'junior'
  - Required: true
  
- [ ] **Add name field** (optional but recommended)
  - Type: String
  - Helps with admin dashboard and user management

- [ ] **Add isActive field** (for admin control)
  - Type: Boolean
  - Default: true
  - Allows admins to disable accounts

**Code to Add:**
```javascript
role: {
  type: String,
  enum: ['admin', 'senior', 'junior'],
  default: 'junior',
  required: true,
},
name: {
  type: String,
  trim: true,
},
isActive: {
  type: Boolean,
  default: true,
},
```

**Review Points:**
- ✓ Does migration handle existing users?
- ✓ Is there a default admin account setup?
- ✓ Are indexes optimized for role queries?

---

## ✅ PHASE 2: Authentication Controller Updates

### Registration Enhancement
**File:** `backend/controllers/authController.js`

- [ ] **Update register function** to accept role
  - Validate role from request body
  - Default to 'junior' if not specified
  - Prevent self-assigned 'admin' role
  
- [ ] **Return role in response**
  - Include role in JWT payload
  - Include role in API response

**Code Changes:**
```javascript
// In register function
const { email, password, role, name } = req.body;

// Prevent self-assigned admin
const userRole = role === 'admin' ? 'junior' : (role || 'junior');

const user = await User.create({
  email,
  password,
  role: userRole,
  name,
});

// Update response
res.status(201).json({
  _id: user._id,
  email: user.email,
  role: user.role,
  name: user.name,
  token,
});
```

**Review Points:**
- ✓ Can users self-assign admin role? (Should be NO)
- ✓ Is role validation happening?
- ✓ Are error messages clear?

---

### Login Enhancement
**File:** `backend/controllers/authController.js`

- [ ] **Update login response** to include role
- [ ] **Check if user is active** before allowing login

**Code Changes:**
```javascript
// In login function
if (user && (await user.comparePassword(password))) {
  // Check if user is active
  if (!user.isActive) {
    return res.status(403).json({ message: 'Account is disabled. Contact admin.' });
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    token,
  });
}
```

**Review Points:**
- ✓ Does login check account status?
- ✓ Is role returned in response?
- ✓ Are error messages user-friendly?

---

### OAuth Enhancement
**File:** `backend/config/passport.js`

- [ ] **Update Google OAuth** to handle roles
- [ ] **Assign default role** to OAuth users
- [ ] **Extract name** from Google profile

**Code Changes:**
```javascript
// In GoogleStrategy callback
if (!user) {
  user = await User.findOne({ email: profile.emails[0].value });
  
  if (user) {
    user.googleId = profile.id;
    if (!user.name && profile.displayName) {
      user.name = profile.displayName;
    }
    await user.save();
  } else {
    user = await User.create({
      email: profile.emails[0].value,
      googleId: profile.id,
      name: profile.displayName,
      role: 'junior', // Default role for OAuth
    });
  }
}
```

- [ ] **Fix callback URL** in passport config
  - Change from `/api/auth/google/callback`
  - To: `process.env.GOOGLE_CALLBACK_URL`

**Review Points:**
- ✓ Does OAuth use environment variable for callback?
- ✓ Do OAuth users get default role?
- ✓ Is name extracted from profile?

---

## ✅ PHASE 3: JWT Token Updates

### Token Generation
**File:** `backend/controllers/authController.js`

- [ ] **Include role in JWT payload**

**Code Changes:**
```javascript
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
```

- [ ] **Update all generateToken calls** to pass role
  - In register: `generateToken(user._id, user.role)`
  - In login: `generateToken(user._id, user.role)`
  - In googleCallback: `generateToken(req.user._id, req.user.role)`

**Review Points:**
- ✓ Is role included in JWT?
- ✓ Are all generateToken calls updated?
- ✓ Is token expiry appropriate?

---

## ✅ PHASE 4: Authorization Middleware

### Create Role-Based Middleware
**File:** `backend/middlewares/auth.js`

- [ ] **Add restrictTo middleware** for role checking

**Code to Add:**
```javascript
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action',
        requiredRoles: roles,
        yourRole: req.user.role
      });
    }

    next();
  };
};

const requireAdmin = restrictTo('admin');
const requireSenior = restrictTo('senior', 'admin');
const requireJunior = restrictTo('junior', 'senior', 'admin');

module.exports = { 
  protect, 
  restrictTo, 
  requireAdmin, 
  requireSenior, 
  requireJunior 
};
```

**Review Points:**
- ✓ Does middleware check for authentication first?
- ✓ Are error messages clear about permissions?
- ✓ Is it flexible for multiple role requirements?

---

## ✅ PHASE 5: Route Protection

### Experience Routes
**File:** `backend/routes/experienceRoutes.js`

- [ ] **Protect POST routes** (create experience)
  - Should require 'senior' or 'admin' role
  
- [ ] **Protect PUT/DELETE routes** (edit/delete)
  - Should require ownership OR admin role
  
- [ ] **Keep GET routes public** (read experiences)
  - Anyone can view experiences

**Example Implementation:**
```javascript
const { protect, requireSenior, requireAdmin } = require('../middlewares/auth');

// Public - anyone can view
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected - only seniors can create
router.post('/', protect, requireSenior, createExperience);

// Protected - owner or admin can update/delete
router.put('/:id', protect, updateExperience); // Add ownership check in controller
router.delete('/:id', protect, deleteExperience); // Add ownership check in controller
```

**Review Points:**
- ✓ Can juniors create experiences? (Should be NO)
- ✓ Can seniors create experiences? (Should be YES)
- ✓ Can anyone view experiences? (Should be YES)
- ✓ Can users edit others' experiences? (Should be NO, unless admin)

---

### Admin Routes (NEW)
**File:** `backend/routes/adminRoutes.js` (create this)

- [ ] **Create admin-only routes**
  - GET `/api/admin/users` - List all users
  - PUT `/api/admin/users/:id/role` - Change user role
  - PUT `/api/admin/users/:id/status` - Activate/deactivate user
  - DELETE `/api/admin/users/:id` - Delete user
  - GET `/api/admin/stats` - Platform statistics

**Code Template:**
```javascript
const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

// All admin routes require authentication + admin role
router.use(protect);
router.use(requireAdmin);

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/status', adminController.toggleUserStatus);
router.delete('/users/:id', adminController.deleteUser);
router.get('/stats', adminController.getPlatformStats);

module.exports = router;
```

**Review Points:**
- ✓ Are all admin routes protected?
- ✓ Can non-admins access admin endpoints? (Should be NO)
- ✓ Are dangerous operations (delete, role change) logged?

---

## ✅ PHASE 6: Controller Logic Updates

### Experience Controller Ownership
**File:** `backend/controllers/experienceController.js`

- [ ] **Add ownership check** in update function
- [ ] **Add ownership check** in delete function

**Code to Add:**
```javascript
// In updateExperience
const experience = await Experience.findById(req.params.id);

if (!experience) {
  return res.status(404).json({ message: 'Experience not found' });
}

// Check ownership or admin
if (experience.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
  return res.status(403).json({ message: 'Not authorized to update this experience' });
}

// In deleteExperience
const experience = await Experience.findById(req.params.id);

if (!experience) {
  return res.status(404).json({ message: 'Experience not found' });
}

// Check ownership or admin
if (experience.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
  return res.status(403).json({ message: 'Not authorized to delete this experience' });
}
```

**Review Points:**
- ✓ Can users edit their own experiences? (Should be YES)
- ✓ Can users edit others' experiences? (Should be NO)
- ✓ Can admins edit any experience? (Should be YES)

---

### Admin Controller (NEW)
**File:** `backend/controllers/adminController.js` (create this)

- [ ] **Implement getAllUsers**
- [ ] **Implement updateUserRole**
- [ ] **Implement toggleUserStatus**
- [ ] **Implement deleteUser**
- [ ] **Implement getPlatformStats**

**Code Template:**
```javascript
const User = require('../models/User');
const Experience = require('../models/Experience');

const getAllUsers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (status) filter.isActive = status === 'active';
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['admin', 'senior', 'junior'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent self-demotion if last admin
    if (user._id.toString() === req.user._id.toString() && role !== 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount === 1) {
        return res.status(400).json({ message: 'Cannot demote the last admin' });
      }
    }

    user.role = role;
    await user.save();

    res.json({ message: 'User role updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent self-deactivation if admin
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ 
      message: `User ${user.isActive ? 'activated' : 'deactivated'}`, 
      user 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent self-deletion
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Also delete user's experiences
    await Experience.deleteMany({ user: user._id });
    await user.deleteOne();

    res.json({ message: 'User and associated experiences deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const seniorCount = await User.countDocuments({ role: 'senior' });
    const juniorCount = await User.countDocuments({ role: 'junior' });
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalExperiences = await Experience.countDocuments();

    const experiencesByRound = await Experience.aggregate([
      { $group: { _id: '$roundType', count: { $sum: 1 } } }
    ]);

    res.json({
      users: {
        total: totalUsers,
        admins: adminCount,
        seniors: seniorCount,
        juniors: juniorCount,
        active: activeUsers,
      },
      experiences: {
        total: totalExperiences,
        byRound: experiencesByRound,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getPlatformStats,
};
```

**Review Points:**
- ✓ Can admins delete themselves? (Should be NO)
- ✓ Can last admin be demoted? (Should be NO)
- ✓ Are cascading deletes handled?
- ✓ Are statistics accurate?

---

## ✅ PHASE 7: Environment & Config

### OAuth Callback Fix
**File:** `backend/config/passport.js`

- [ ] **Update callbackURL** to use environment variable

**Current (WRONG):**
```javascript
callbackURL: '/api/auth/google/callback',
```

**Fixed (CORRECT):**
```javascript
callbackURL: process.env.GOOGLE_CALLBACK_URL,
```

**Review Points:**
- ✓ Is callback URL using environment variable?
- ✓ Does .env file have correct callback URL?
- ✓ Does callback URL match Google Console settings?

---

### Server.js Updates
**File:** `backend/server.js`

- [ ] **Add admin routes** to server

**Code to Add:**
```javascript
const adminRoutes = require('./routes/adminRoutes');

// After other routes
app.use('/api/admin', adminRoutes);
```

**Review Points:**
- ✓ Are admin routes registered?
- ✓ Is route order correct? (more specific routes first)

---

## ✅ PHASE 8: Frontend Updates

### Auth Context/Store
**Files:** Frontend state management

- [ ] **Store role** in auth state
- [ ] **Include role** in localStorage/sessionStorage
- [ ] **Add role to API requests**

**Example:**
```javascript
// After successful login/register
localStorage.setItem('user', JSON.stringify({
  _id: data._id,
  email: data.email,
  role: data.role,
  name: data.name,
  token: data.token,
}));
```

**Review Points:**
- ✓ Is role persisted on login?
- ✓ Is role cleared on logout?
- ✓ Is role validated on page refresh?

---

### Role-Based UI
**Files:** Various component files

- [ ] **Hide/show features** based on role
  - Create experience button (seniors only)
  - Admin dashboard link (admins only)
  - Edit/delete buttons (owners + admins)

**Example:**
```javascript
// Only show "Add Experience" for seniors
{user?.role === 'senior' || user?.role === 'admin' ? (
  <button onClick={handleAddExperience}>
    Add Experience
  </button>
) : null}

// Only show Admin link for admins
{user?.role === 'admin' && (
  <Link to="/admin">Admin Dashboard</Link>
)}
```

**Review Points:**
- ✓ Are UI elements hidden for unauthorized roles?
- ✓ Is there proper fallback for unauthenticated users?
- ✓ Are role checks consistent across components?

---

### Admin Dashboard (NEW)
**File:** Create admin dashboard component

- [ ] **User management table**
- [ ] **Role change functionality**
- [ ] **User activation/deactivation**
- [ ] **Platform statistics**

**Review Points:**
- ✓ Can admins view all users?
- ✓ Can admins change roles?
- ✓ Are confirmations shown for dangerous actions?
- ✓ Are changes reflected immediately?

---

## ✅ PHASE 9: Testing Checklist

### Manual Testing

#### Authentication Tests
- [ ] Register as junior (default)
- [ ] Register as senior
- [ ] Try registering as admin (should default to junior)
- [ ] Login with email/password
- [ ] Login with Google OAuth
- [ ] Verify role in JWT token
- [ ] Verify role persists across page refresh

#### Authorization Tests - Juniors
- [ ] Can view experiences ✓
- [ ] Cannot create experiences ✗
- [ ] Cannot edit any experiences ✗
- [ ] Cannot delete any experiences ✗
- [ ] Cannot access admin routes ✗

#### Authorization Tests - Seniors
- [ ] Can view experiences ✓
- [ ] Can create experiences ✓
- [ ] Can edit own experiences ✓
- [ ] Cannot edit others' experiences ✗
- [ ] Can delete own experiences ✓
- [ ] Cannot delete others' experiences ✗
- [ ] Cannot access admin routes ✗

#### Authorization Tests - Admins
- [ ] Can view experiences ✓
- [ ] Can create experiences ✓
- [ ] Can edit any experience ✓
- [ ] Can delete any experience ✓
- [ ] Can access admin dashboard ✓
- [ ] Can view all users ✓
- [ ] Can change user roles ✓
- [ ] Can activate/deactivate users ✓
- [ ] Can delete users ✓
- [ ] Cannot delete self ✗
- [ ] Cannot demote last admin ✗

#### OAuth Tests
- [ ] Google login creates user with default role
- [ ] Callback URL works correctly
- [ ] Name extracted from Google profile
- [ ] User redirected correctly after OAuth

#### Edge Cases
- [ ] Deactivated user cannot login
- [ ] Invalid token returns 401
- [ ] Expired token returns 401
- [ ] Missing role defaults to junior
- [ ] Role validation prevents invalid values

---

## ✅ PHASE 10: Security Review

### Critical Security Checks
- [ ] **No self-assigned admin roles**
- [ ] **JWT includes role** (prevents client-side manipulation)
- [ ] **Server validates role** on every protected route
- [ ] **Ownership checks** before update/delete
- [ ] **Admin cannot delete/demote themselves**
- [ ] **Last admin cannot be demoted**
- [ ] **Input validation** on all role changes
- [ ] **Rate limiting** on auth endpoints
- [ ] **CORS configured** correctly
- [ ] **Environment variables** not exposed

---

## 🎯 Priority Implementation Order

### Week 1: Core Role System
1. Update User model with role field
2. Update auth controllers (register, login, OAuth)
3. Fix OAuth callback URL
4. Update JWT generation
5. Create role middleware

### Week 2: Route Protection & Admin
6. Protect experience routes
7. Create admin controller
8. Create admin routes
9. Add ownership checks
10. Register admin routes

### Week 3: Frontend & Testing
11. Update frontend auth state
12. Add role-based UI elements
13. Create admin dashboard
14. Manual testing (all roles)
15. Security review

---

## 📝 Final Checklist

Before deploying:
- [ ] All environment variables set correctly
- [ ] Google OAuth callback URL updated in Google Console
- [ ] At least one admin account created
- [ ] All routes tested with Postman/Thunder Client
- [ ] Frontend role-based UI working
- [ ] Admin dashboard functional
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Migration plan for existing users

---

## 🔧 Quick Commands

### Create first admin (MongoDB shell):
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Test JWT payload:
```javascript
// Decode at jwt.io or in Node:
const jwt = require('jsonwebtoken');
const decoded = jwt.decode(yourToken);
console.log(decoded); // Should include: { id, role, iat, exp }
```

---

## 🚨 Common Pitfalls to Avoid

1. **Callback URL mismatch** - Ensure Google Console matches .env
2. **Self-assigned admin** - Always prevent in registration
3. **Missing role in JWT** - Must be in token payload
4. **Client-side only checks** - Server must validate
5. **No ownership checks** - Users can edit others' data
6. **Hard-coded roles** - Use enums and constants
7. **Last admin deletion** - Prevent system lockout
8. **Token includes password** - Always exclude sensitive fields

---

## 📚 Additional Resources

- JWT Best Practices: https://jwt.io/introduction
- Passport.js Docs: http://www.passportjs.org/
- MongoDB Roles Pattern: https://www.mongodb.com/docs/manual/core/authorization/
- OWASP Auth Cheatsheet: https://cheatsheetseries.owasp.org/

---

**Good luck with implementation! 🚀**
