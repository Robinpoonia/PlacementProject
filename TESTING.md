# ✅ Testing Checklist

Complete testing guide for the Interview Experience Platform.

## 🔧 Setup Testing Environment

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB connected successfully
- [ ] .env files configured correctly
- [ ] First admin user created

## 📝 Authentication Tests

### Registration
- [ ] Can register with email/password as junior
- [ ] Can register with email/password as senior
- [ ] Cannot register with duplicate email
- [ ] Cannot self-assign admin role (defaults to junior)
- [ ] Password must be 6+ characters
- [ ] Email validation works
- [ ] User receives JWT token on successful registration
- [ ] Token includes user ID and role

### Login
- [ ] Can login with correct email/password
- [ ] Cannot login with wrong password
- [ ] Cannot login with non-existent email
- [ ] Inactive user cannot login
- [ ] Token persists in localStorage
- [ ] Role persists across page refresh

### Google OAuth
- [ ] Google login button appears
- [ ] Clicking redirects to Google
- [ ] Successful OAuth creates user
- [ ] OAuth user gets default 'junior' role
- [ ] Name extracted from Google profile
- [ ] Redirect back to frontend works
- [ ] Token received after OAuth

## 🔐 Authorization Tests

### Junior User (Default Role)
**Can Do:**
- [ ] View all experiences
- [ ] Browse companies
- [ ] Filter by round type
- [ ] View company details
- [ ] Search experiences

**Cannot Do:**
- [ ] Create new experience (button hidden)
- [ ] Edit any experience
- [ ] Delete any experience
- [ ] Access admin dashboard
- [ ] Access /api/admin/* endpoints (403)

### Senior User
**Can Do:**
- [ ] All junior permissions above
- [ ] Create new experiences
- [ ] Edit own experiences
- [ ] Delete own experiences
- [ ] See "Share Experience" button
- [ ] Access experience form

**Cannot Do:**
- [ ] Edit others' experiences
- [ ] Delete others' experiences
- [ ] Access admin dashboard
- [ ] Change any user's role

### Admin User
**Can Do:**
- [ ] All senior permissions above
- [ ] Access admin dashboard
- [ ] View all users
- [ ] Change any user's role
- [ ] Activate/deactivate users
- [ ] Delete any user (except self)
- [ ] Edit any experience
- [ ] Delete any experience
- [ ] View platform statistics

**Cannot Do:**
- [ ] Delete own account
- [ ] Deactivate own account
- [ ] Demote self if last admin

## 📊 Experience Management Tests

### Create Experience (Senior+)
- [ ] Form is accessible to seniors
- [ ] Form is accessible to admins
- [ ] Form redirects juniors to home
- [ ] Company dropdown populates
- [ ] Can select round type (OT, Technical, HR)
- [ ] Description is required
- [ ] Can select result (Qualified, Not Qualified)
- [ ] "Next Round Details" appears when Qualified
- [ ] Experience created successfully
- [ ] Redirect after creation
- [ ] Experience appears in list

### View Experiences
- [ ] All experiences shown publicly
- [ ] User ID not visible in response
- [ ] Shows "Anonymous Senior"
- [ ] Sorted by newest first
- [ ] Round badges show correct colors
- [ ] Result badges show correct colors
- [ ] Date formatted correctly
- [ ] Long descriptions are truncated with "Read more"

### Edit Experience
- [ ] Edit button visible to owner
- [ ] Edit button visible to admin
- [ ] Edit button hidden for non-owners
- [ ] Clicking edit opens form with data
- [ ] Can update all fields
- [ ] Changes saved successfully
- [ ] Ownership verified server-side

### Delete Experience
- [ ] Delete button visible to owner
- [ ] Delete button visible to admin
- [ ] Delete button hidden for non-owners
- [ ] Confirmation dialog appears
- [ ] Experience deleted successfully
- [ ] Ownership verified server-side

## 🏢 Company Management Tests

### Company Listing
- [ ] All companies listed
- [ ] Sorted alphabetically
- [ ] Experience count shown per company
- [ ] Company cards have hover effect
- [ ] Clicking navigates to company page

### Company Detail Page
- [ ] Shows company name
- [ ] Tabs for OT, Technical, HR
- [ ] Experiences filtered by round
- [ ] Can switch between tabs
- [ ] Empty state shown if no experiences

## 👑 Admin Dashboard Tests

### Access Control
- [ ] Only accessible to admins
- [ ] Non-admins redirected
- [ ] URL /admin protected

### User Management
- [ ] All users listed in table
- [ ] Search by email works
- [ ] Search by name works
- [ ] Filter by role works (all/admin/senior/junior)
- [ ] Filter by status works

### User Actions
**Role Change:**
- [ ] Can change junior to senior
- [ ] Can change senior to junior
- [ ] Can change junior to admin
- [ ] Cannot demote last admin
- [ ] Cannot change own role if last admin
- [ ] Confirmation shown
- [ ] Change reflected immediately

**Status Toggle:**
- [ ] Can activate inactive user
- [ ] Can deactivate active user
- [ ] Cannot deactivate self
- [ ] Status change reflected immediately
- [ ] Deactivated user cannot login

**Delete User:**
- [ ] Confirmation dialog appears
- [ ] Can delete any user
- [ ] Cannot delete self
- [ ] User's experiences also deleted
- [ ] User removed from list

### Platform Statistics
- [ ] Total users count correct
- [ ] Admin count correct
- [ ] Senior count correct
- [ ] Junior count correct
- [ ] Active users count correct
- [ ] Total experiences count correct
- [ ] Experiences by round shown

## 🔒 Security Tests

### JWT Token
- [ ] Token includes role claim
- [ ] Token expires after 30 days
- [ ] Invalid token returns 401
- [ ] Expired token returns 401
- [ ] Missing token returns 401
- [ ] Role in token matches database

### Password Security
- [ ] Password hashed in database
- [ ] Cannot see password in responses
- [ ] Password not returned in user object

### Route Protection
- [ ] POST /api/experiences requires auth
- [ ] POST /api/experiences requires senior+
- [ ] PUT /api/experiences/:id checks ownership
- [ ] DELETE /api/experiences/:id checks ownership
- [ ] All /api/admin/* routes require admin
- [ ] Public routes work without auth

### Input Validation
- [ ] Email format validated
- [ ] Password minimum length enforced
- [ ] Round type enum validated
- [ ] Result enum validated
- [ ] XSS attempts sanitized

## 🌐 Frontend Integration Tests

### State Management
- [ ] User state persists on refresh
- [ ] Login updates state immediately
- [ ] Logout clears state
- [ ] Role displayed correctly in UI

### UI Role-Based Display
**Junior:**
- [ ] No "Share Experience" button
- [ ] No "Admin" link in menu
- [ ] No edit/delete buttons on experiences

**Senior:**
- [ ] "Share Experience" button visible
- [ ] No "Admin" link in menu
- [ ] Edit/delete on own experiences only

**Admin:**
- [ ] "Share Experience" button visible
- [ ] "Admin" link in menu visible
- [ ] Edit/delete on all experiences

### Error Handling
- [ ] Network errors shown to user
- [ ] 401 errors redirect to login
- [ ] 403 errors show permission message
- [ ] 404 errors show not found
- [ ] Form validation errors highlighted

## 📱 Responsive Design Tests

### Mobile (< 768px)
- [ ] Navigation menu collapses
- [ ] Forms are usable
- [ ] Cards stack vertically
- [ ] Admin table scrolls horizontally
- [ ] Modals fit screen

### Tablet (768px - 1024px)
- [ ] Grid layouts adjust
- [ ] Navigation shows all items
- [ ] Admin table readable

### Desktop (> 1024px)
- [ ] Full layout displayed
- [ ] Optimal spacing
- [ ] Hover effects work

## 🚀 Performance Tests

### Load Times
- [ ] Home page loads < 2s
- [ ] Company list loads < 1s
- [ ] Experience form loads < 1s
- [ ] Admin dashboard loads < 2s

### API Response Times
- [ ] GET /api/experiences < 500ms
- [ ] POST /api/experiences < 1s
- [ ] GET /api/companies < 300ms
- [ ] GET /api/admin/users < 800ms

## 🔄 Edge Cases

### Concurrent Updates
- [ ] Two users editing same experience
- [ ] Multiple admins changing roles simultaneously

### Data Integrity
- [ ] Deleting user cascades to experiences
- [ ] Cannot create experience without company
- [ ] Cannot create experience without description

### Session Management
- [ ] Multiple tabs stay in sync
- [ ] Logout from one tab affects all
- [ ] Token refresh works

## 🧪 Test Data Setup

### Create Test Users

```javascript
// In MongoDB or via API
{
  email: "junior@test.com",
  password: "Test123!",
  role: "junior"
}

{
  email: "senior@test.com",
  password: "Test123!",
  role: "senior"
}

{
  email: "admin@test.com",
  password: "Test123!",
  role: "admin"
}
```

### Create Test Experiences

```javascript
{
  company: "Google",
  roundType: "Technical",
  description: "Asked about data structures...",
  result: "Qualified",
  nextRoundDetails: "System Design"
}

{
  company: "Microsoft",
  roundType: "OT",
  description: "Coding test on HackerRank...",
  result: "Not Qualified"
}
```

## 📊 Test Coverage Goals

- [ ] All API endpoints tested
- [ ] All user roles tested
- [ ] All CRUD operations tested
- [ ] All edge cases covered
- [ ] Security vulnerabilities checked
- [ ] UI components verified
- [ ] Mobile responsiveness confirmed

## 🐛 Bug Report Template

When you find a bug, document:

```markdown
**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- User Role: Senior

**Steps to Reproduce:**
1. Login as senior
2. Click "Share Experience"
3. Fill form
4. Click Submit

**Expected:**
Experience created and redirected

**Actual:**
Error 500, no redirect

**Console Errors:**
[Paste console errors]

**Network Tab:**
[Paste request/response]
```

## ✅ Final Checklist

Before deploying:

- [ ] All authentication tests pass
- [ ] All authorization tests pass
- [ ] All CRUD operations work
- [ ] Admin dashboard functional
- [ ] No console errors
- [ ] No network errors
- [ ] Security checks pass
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Documentation complete

---

**Test thoroughly before production! 🧪**
