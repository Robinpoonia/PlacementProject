# Interview Experience Platform - Backend

Role-based authentication system for the Interview Experience Platform.

## Features

- ✅ JWT Authentication with roles (Admin, Senior, Junior)
- ✅ Google OAuth 2.0 Integration
- ✅ Role-based Access Control (RBAC)
- ✅ Admin Dashboard APIs
- ✅ User Management
- ✅ Experience Management

## Roles & Permissions

### Junior (Default)
- View all experiences
- Cannot create experiences
- Cannot edit/delete any experiences

### Senior
- All Junior permissions
- Create new experiences
- Edit/delete own experiences

### Admin
- All Senior permissions
- Manage users (view, edit role, activate/deactivate, delete)
- Edit/delete any experience
- View platform statistics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
- MongoDB URI
- JWT Secret
- Google OAuth credentials
- Callback URL

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### Experiences
- `GET /api/experiences` - Get all experiences (public)
- `GET /api/experiences/:id` - Get experience by ID (public)
- `POST /api/experiences` - Create experience (senior+)
- `PUT /api/experiences/:id` - Update experience (owner/admin)
- `DELETE /api/experiences/:id` - Delete experience (owner/admin)
- `GET /api/experiences/user/my-experiences` - Get user's experiences (protected)

### Companies
- `GET /api/companies` - Get all companies with experience count
- `GET /api/companies/:companyName` - Get company experiences

### Admin (Admin Only)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/status` - Toggle user active status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get platform statistics

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Ownership verification for updates/deletes
- Account deactivation support
- Self-deletion prevention for admins
- Last admin demotion prevention

## Database Schema

### User
```javascript
{
  email: String (unique),
  password: String (hashed),
  googleId: String,
  name: String,
  role: String (admin/senior/junior),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Experience
```javascript
{
  user: ObjectId (ref: User),
  company: String,
  roundType: String (OT/Technical/HR),
  description: String,
  result: String (Qualified/Not Qualified),
  nextRoundDetails: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Creating First Admin

After setting up, create an admin user via MongoDB:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Or update the first registered user to admin.

## Testing

Use Postman/Thunder Client to test endpoints:

1. Register a user
2. Login to get JWT token
3. Add token to Authorization header: `Bearer YOUR_TOKEN`
4. Test protected routes

## Important Notes

- Default role for new users is `junior`
- Cannot self-assign `admin` role during registration
- Google OAuth users default to `junior` role
- Admins can change any user's role except their own if they're the last admin
- Users cannot delete/deactivate themselves
