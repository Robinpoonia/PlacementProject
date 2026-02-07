# 🎨 Frontend Code Review & Implementation Guide
## InterviewXP - Modern 3D UI with Role-Based Features

---

## 🎯 Design System Overview

**Color Palette (from your screenshot):**
```css
--dark-bg: #0a0f1a;
--dark-card: #1a1f2e;
--cyan-primary: #00d9ff;
--cyan-glow: rgba(0, 217, 255, 0.3);
--text-white: #ffffff;
--text-gray: #9ca3af;
--gradient-start: #0a0f1a;
--gradient-end: #1a3a3a;
```

**Typography:**
- Primary Font: Modern sans-serif (Inter, Outfit, or similar)
- Hero Size: 3-4rem (48-64px)
- Accent Color: Cyan (#00d9ff)

**Effects:**
- Glassmorphism cards
- Subtle 3D shadows
- Hover animations with glow
- Backdrop blur

---

## ✅ FRONTEND PHASE 1: Auth Components

### Sign In Modal
**File:** `frontend/src/components/Auth/SignInModal.jsx`

**Design Requirements:**
- [ ] Dark glassmorphic modal with backdrop blur
- [ ] Cyan accent buttons with glow effect
- [ ] Email/password inputs with modern styling
- [ ] Google OAuth button with icon
- [ ] Role selection (visible only in register mode)
- [ ] Smooth animations on open/close
- [ ] Error messages with subtle animations

**Component Template:**
```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignInModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'junior',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Save user data
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = '/'; // Or use router
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-[#1a1f2e]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Join InterviewXP'}
                </h2>
                <p className="text-gray-400">
                  {mode === 'login' 
                    ? 'Sign in to access your experiences' 
                    : 'Create an account to share your story'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {/* Role Selection (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'junior' })}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          formData.role === 'junior'
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                            : 'border-gray-700 bg-[#0a0f1a] text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        Junior
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'senior' })}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          formData.role === 'senior'
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                            : 'border-gray-700 bg-[#0a0f1a] text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        Senior
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1f2e] text-gray-400">Or continue with</span>
                  </div>
                </div>

                {/* Google OAuth */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </form>

              {/* Switch Mode */}
              <p className="mt-6 text-center text-sm text-gray-400">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => onClose(mode === 'login' ? 'register' : 'login')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;
```

**Review Checklist:**
- [ ] Modal has glassmorphic background with backdrop blur
- [ ] Cyan accent colors match brand (#00d9ff)
- [ ] Smooth enter/exit animations
- [ ] Role selection only shows in register mode
- [ ] Role selection defaults to 'junior'
- [ ] Cannot select 'admin' from UI
- [ ] Google OAuth redirects correctly
- [ ] Error messages display with animation
- [ ] Loading state disables button
- [ ] Form validation works
- [ ] Responsive on mobile

---

## ✅ FRONTEND PHASE 2: Navigation & Header

### Header Component
**File:** `frontend/src/components/Layout/Header.jsx`

**Design Requirements:**
- [ ] Transparent/dark background with blur
- [ ] Logo on left (InterviewXP with icon)
- [ ] Navigation links (Companies)
- [ ] Sign In button (or user menu if logged in)
- [ ] Role-based navigation items
- [ ] Sticky header with scroll effect

**Component Template:**
```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignInModal from '../Auth/SignInModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const openModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">InterviewXP</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/companies"
                className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Companies
              </Link>

              {/* Admin Link (admins only) */}
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </Link>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {!user ? (
                <button
                  onClick={() => openModal('login')}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 bg-[#1a1f2e] border border-cyan-500/20 rounded-lg hover:border-cyan-500/40 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-white">
                        {user.name || user.email.split('@')[0]}
                      </div>
                      <div className="text-xs text-cyan-400 capitalize">
                        {user.role}
                      </div>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-[#1a1f2e] border border-cyan-500/20 rounded-lg shadow-xl shadow-black/20 py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Dashboard
                      </Link>
                      {(user.role === 'senior' || user.role === 'admin') && (
                        <Link
                          to="/experiences/new"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Share Experience
                        </Link>
                      )}
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isModalOpen}
        onClose={(mode) => {
          setIsModalOpen(false);
          if (mode) openModal(mode);
        }}
        mode={modalMode}
      />
    </>
  );
};

export default Header;
```

**Review Checklist:**
- [ ] Header is sticky with scroll effect
- [ ] Background blur on scroll
- [ ] User menu shows after login
- [ ] Role displayed in user menu
- [ ] "Share Experience" only for seniors/admins
- [ ] "Admin" link only for admins
- [ ] Logout clears localStorage
- [ ] Responsive on mobile
- [ ] Dropdown closes on outside click

---

## ✅ FRONTEND PHASE 3: Role-Based Feature Cards

### Feature Cards (Homepage)
**File:** `frontend/src/components/Home/FeatureCards.jsx`

**Design Requirements:**
- [ ] Three cards matching screenshot design
- [ ] Glassmorphic background
- [ ] Icon with cyan glow
- [ ] Subtle 3D effect
- [ ] Hover animations

**Component Template:**
```jsx
import { motion } from 'framer-motion';

const FeatureCards = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "100% Anonymous",
      description: "Your identity is never revealed. Share freely without fear."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Company-Wise",
      description: "Browse experiences organized by company and interview round."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Senior → Junior",
      description: "Seniors share real experiences to help juniors prepare better."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 -mt-20 relative z-10">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-[#1a1f2e]/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-xl hover:shadow-cyan-500/10"
        >
          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureCards;
```

**Review Checklist:**
- [ ] Cards have glassmorphic effect
- [ ] Cyan border and glow on hover
- [ ] Icons match screenshot
- [ ] Smooth hover animations
- [ ] Responsive grid layout
- [ ] Text is readable

---

## ✅ FRONTEND PHASE 4: Company Card Component

### Company Card
**File:** `frontend/src/components/Company/CompanyCard.jsx`

**Design Requirements:**
- [ ] Dark card with company logo/name
- [ ] Experience count badge
- [ ] Hover effect with glow
- [ ] Click navigates to company detail
- [ ] 3D shadow effect

**Component Template:**
```jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <Link to={`/companies/${company._id}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group"
      >
        {/* Company Logo/Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-shadow">
          <span className="text-2xl font-bold text-white">
            {company.name.charAt(0)}
          </span>
        </div>

        {/* Company Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {company.name}
        </h3>

        {/* Experience Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{company.totalExperiences || 0} experiences</span>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="mt-4 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">View details</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

export default CompanyCard;
```

**Review Checklist:**
- [ ] Card has 3D hover effect
- [ ] Company initial shown in gradient circle
- [ ] Experience count displayed
- [ ] Hover shows "View details" with arrow
- [ ] Link navigates to company page
- [ ] Smooth animations

---

## ✅ FRONTEND PHASE 5: Experience Card Component

### Experience Card
**File:** `frontend/src/components/Experience/ExperienceCard.jsx`

**Design Requirements:**
- [ ] Dark card showing experience details
- [ ] Round type badge (OT, Technical, HR)
- [ ] Result badge (Qualified/Not Qualified)
- [ ] Edit/Delete buttons (only for owner/admin)
- [ ] Anonymous display (no author name)
- [ ] Date display
- [ ] Expandable description

**Component Template:**
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, user, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isOwner = user?._id === experience.user;
  const canEdit = isOwner || user?.role === 'admin';

  const roundColors = {
    'OT': 'from-purple-500 to-pink-500',
    'Technical': 'from-blue-500 to-cyan-500',
    'HR': 'from-green-500 to-emerald-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Round Badge */}
          <div className={`px-3 py-1 bg-gradient-to-r ${roundColors[experience.roundType] || roundColors.Technical} rounded-lg text-white text-sm font-medium`}>
            {experience.roundType}
          </div>

          {/* Result Badge */}
          <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
            experience.result === 'Qualified'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {experience.result}
          </div>
        </div>

        {/* Edit/Delete Buttons (owner/admin only) */}
        {canEdit && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(experience)}
              className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(experience._id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className={`text-gray-300 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
          {experience.description}
        </p>
        {experience.description.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Next Round Info (if qualified) */}
      {experience.result === 'Qualified' && experience.nextRoundDetails && (
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mb-4">
          <p className="text-sm text-cyan-400 font-medium mb-1">Next Round</p>
          <p className="text-sm text-gray-300">{experience.nextRoundDetails}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Anonymous Senior</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(experience.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
```

**Review Checklist:**
- [ ] Round badges have gradient colors
- [ ] Result badge shows Qualified/Not Qualified
- [ ] Edit/Delete only visible to owner/admin
- [ ] Description is expandable (Read more/less)
- [ ] Next round info shows if qualified
- [ ] Always shows "Anonymous Senior"
- [ ] Date formatted correctly
- [ ] Smooth animations

---

## ✅ FRONTEND PHASE 6: Share Experience Form

### Experience Form (Seniors/Admins Only)
**File:** `frontend/src/components/Experience/ExperienceForm.jsx`

**Design Requirements:**
- [ ] Only accessible to seniors/admins
- [ ] Redirect if junior tries to access
- [ ] Company autocomplete/select
- [ ] Round type selector (OT, Technical, HR)
- [ ] Rich text editor for description
- [ ] Result selector (Qualified/Not Qualified)
- [ ] Conditional next round field
- [ ] Modern dark form styling

**Component Template:**
```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExperienceForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    roundType: 'Technical',
    description: '',
    result: 'Qualified',
    nextRoundDetails: ''
  });
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if not senior/admin
    if (!user || (user.role !== 'senior' && user.role !== 'admin')) {
      navigate('/');
      return;
    }

    // Fetch companies
    fetchCompanies();
  }, [user, navigate]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`);
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create experience');
      }

      navigate('/dashboard?success=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332] pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Share Your Experience</h1>
          <p className="text-gray-400 mb-8">Help juniors prepare by sharing your interview insights anonymously.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Select */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company *
              </label>
              <select
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Round Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interview Round *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['OT', 'Technical', 'HR'].map((round) => (
                  <button
                    key={round}
                    type="button"
                    onClick={() => setFormData({ ...formData, roundType: round })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      formData.roundType === round
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-700 bg-[#0a0f1a] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {round}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience Description *
              </label>
              <textarea
                required
                rows={8}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none"
                placeholder="Share details about questions asked, the process, difficulty level, topics covered, tips for juniors..."
              />
              <p className="mt-2 text-sm text-gray-400">
                {formData.description.length} characters
              </p>
            </div>

            {/* Result */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Result *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Qualified', 'Not Qualified'].map((result) => (
                  <button
                    key={result}
                    type="button"
                    onClick={() => setFormData({ ...formData, result })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                      formData.result === result
                        ? result === 'Qualified'
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-red-500 bg-red-500/10 text-red-400'
                        : 'border-gray-700 bg-[#0a0f1a] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {result}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Round Details (if qualified) */}
            {formData.result === 'Qualified' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Next Round Details (Optional)
                </label>
                <input
                  type="text"
                  value={formData.nextRoundDetails}
                  onChange={(e) => setFormData({ ...formData, nextRoundDetails: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  placeholder="e.g., Technical Round 2, System Design"
                />
              </motion.div>
            )}

            {/* Submit */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Share Experience'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceForm;
```

**Review Checklist:**
- [ ] Only seniors/admins can access
- [ ] Juniors are redirected
- [ ] Company dropdown populated
- [ ] Round type buttons work
- [ ] Description textarea expands
- [ ] Result buttons change color
- [ ] Next round field appears when Qualified
- [ ] Form submits with auth token
- [ ] Success redirects to dashboard
- [ ] Error messages display

---

## ✅ FRONTEND PHASE 7: Admin Dashboard

### Admin Dashboard
**File:** `frontend/src/pages/AdminDashboard.jsx`

**Design Requirements:**
- [ ] Only accessible to admins
- [ ] User management table
- [ ] Role change dropdown
- [ ] Activate/Deactivate toggle
- [ ] Delete user with confirmation
- [ ] Platform statistics cards
- [ ] Search and filter users

**Component Template:**
```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const headers = {
        'Authorization': `Bearer ${userData.token}`
      };

      const [usersRes, statsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, { headers }),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, { headers })
      ]);

      const usersData = await usersRes.json();
      const statsData = await statsRes.json();

      setUsers(usersData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${userId}/role`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
          },
          body: JSON.stringify({ role: newRole })
        }
      );

      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${userId}/status`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        }
      );

      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        }
      );

      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332] flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6"
            >
              <div className="text-gray-400 text-sm mb-2">Total Users</div>
              <div className="text-3xl font-bold text-white">{stats.users.total}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6"
            >
              <div className="text-gray-400 text-sm mb-2">Seniors</div>
              <div className="text-3xl font-bold text-cyan-400">{stats.users.seniors}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6"
            >
              <div className="text-gray-400 text-sm mb-2">Juniors</div>
              <div className="text-3xl font-bold text-blue-400">{stats.users.juniors}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6"
            >
              <div className="text-gray-400 text-sm mb-2">Total Experiences</div>
              <div className="text-3xl font-bold text-green-400">{stats.experiences.total}</div>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="senior">Seniors</option>
              <option value="junior">Juniors</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#1a1f2e]/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0f1a]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Joined</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{u.name || 'No name'}</div>
                        <div className="text-gray-400 text-sm">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-3 py-1 bg-[#0a0f1a] border border-gray-700 rounded text-white text-sm capitalize"
                        disabled={u._id === user._id}
                      >
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(u._id)}
                        disabled={u._id === user._id}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          u.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        } disabled:opacity-50`}
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={u._id === user._id}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

**Review Checklist:**
- [ ] Only admins can access
- [ ] Stats cards show correct data
- [ ] Search filters users by email/name
- [ ] Role filter works
- [ ] Role change requires confirmation
- [ ] Cannot change own role
- [ ] Status toggle works
- [ ] Cannot deactivate self
- [ ] Delete requires confirmation
- [ ] Cannot delete self
- [ ] Table is responsive

---

## 🎨 TAILWIND CONFIG

Add this to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0f1a',
        'dark-card': '#1a1f2e',
        'cyan-primary': '#00d9ff',
      },
      backdropBlur: {
        'xl': '20px',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(0, 217, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
```

---

## 📦 REQUIRED PACKAGES

```bash
npm install framer-motion react-router-dom
```

---

## ✅ FINAL FRONTEND REVIEW CHECKLIST

### Authentication
- [ ] Sign in modal has glassmorphic design
- [ ] Role selection in register (junior/senior only)
- [ ] Google OAuth button works
- [ ] Error messages display nicely
- [ ] Success redirects correctly

### Navigation
- [ ] Header shows user role
- [ ] "Share Experience" only for seniors/admins
- [ ] "Admin" link only for admins
- [ ] User menu dropdown works
- [ ] Logout clears data

### Home Page
- [ ] Hero section matches screenshot
- [ ] Feature cards have 3D effect
- [ ] Call-to-action buttons work
- [ ] Responsive design

### Company Pages
- [ ] Company cards grid layout
- [ ] Hover effects with glow
- [ ] Click navigates to detail page
- [ ] Tab system (OT, Technical, HR)

### Experience Management
- [ ] Juniors cannot create experiences
- [ ] Seniors can create experiences
- [ ] Edit/Delete only for owner/admin
- [ ] All experiences show "Anonymous"
- [ ] Experience cards have proper styling

### Admin Dashboard
- [ ] Only accessible to admins
- [ ] User table shows all users
- [ ] Role change works
- [ ] User activation/deactivation works
- [ ] Delete user works
- [ ] Stats display correctly

---

**Your frontend is now ready with modern 3D design and role-based features! 🎨✨**
