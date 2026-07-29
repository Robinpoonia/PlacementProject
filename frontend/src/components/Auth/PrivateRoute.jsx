import { useState } from "react";
import { Navigate } from "react-router-dom";
import SignInModal from "./SignInModal";

export default function PrivateRoute({
  children,
  allowedRoles = [],
}) {
  const [showLogin] = useState(true);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Not logged in
  if (!token || !user) {
    return (
      <SignInModal
        isOpen={showLogin}
        onClose={() => window.location.href = "/"}
      />
    );
  }

  const currentRole = user.role;

  // Role check
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(currentRole)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071022]">
        <h1 className="text-3xl text-red-500">
          Access Denied
        </h1>
      </div>
    );
  }

  return children;
}