import { useState } from 'react';

import SignInModal from './SignInModal';

export default function PrivateRoute({
  children,
  role
}) {

  const [showLogin] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem('user')
    );

  const currentRole =
    user?.user?.role ||
    user?.role;

  // Not logged in
  if (!user) {
    return (
      <SignInModal
        isOpen={showLogin}
        onClose={() => {
          window.location = '/';
        }}
      />
    );
  }

  // Role check
  if (
    role &&
    Array.isArray(role) &&
    !role.includes(currentRole)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-3xl">
        Access denied
      </div>
    );
  }

  return children;
}