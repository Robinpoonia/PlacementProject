import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import SignInModal from "../Auth/SignInModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ==========================================
  // GET LATEST PROFILE FROM REDUX
  // ==========================================

  const reduxProfile = useSelector(
    (state) => state.user?.profile
  );

  // ==========================================
  // USE REDUX PROFILE FIRST
  // OTHERWISE LOCAL STORAGE USER
  // ==========================================

  const user = reduxProfile || localUser;

  // ==========================================
  // LOAD USER FROM LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);

        // Supports:
        // { name, email, role }
        //
        // OR:
        // { user: { name, email, role } }

        setLocalUser(
          parsedUser?.user || parsedUser
        );
      } catch (error) {
        console.error(
          "Invalid user data:",
          error
        );

        localStorage.removeItem("user");
      }
    }
  }, []);

  // ==========================================
  // SCROLL LISTENER
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 20
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ==========================================
  // UPDATE LOCAL STORAGE WHEN REDUX
  // PROFILE CHANGES
  // ==========================================

  useEffect(() => {
    if (!reduxProfile) return;

    localStorage.setItem(
      "user",
      JSON.stringify(reduxProfile)
    );

    setLocalUser(reduxProfile);
  }, [reduxProfile]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLocalUser(null);
    setShowUserMenu(false);

    window.location.href = "/";
  };

  // ==========================================
  // CLOSE MENU
  // ==========================================

  const closeMenu = () => {
    setShowUserMenu(false);
  };

  // ==========================================
  // USER INITIAL
  // ==========================================

  const getUserInitial = () => {
    if (user?.name) {
      return user.name
        .charAt(0)
        .toUpperCase();
    }

    if (user?.email) {
      return user.email
        .charAt(0)
        .toUpperCase();
    }

    return "U";
  };

  return (
    <>
      <motion.header
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-40
          transition-all
          duration-300

          ${
            isScrolled
              ? `
                  bg-[#0a0f1a]/90
                  backdrop-blur-xl
                  border-b
                  border-cyan-500/10
                  shadow-lg
                `
              : "bg-transparent"
          }
        `}
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              h-16
            "
          >
            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <Link
              to="/"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-3
                group
              "
            >
              <div
                className="
                  w-12
                  h-12
                  bg-cyan-500
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  group-hover:shadow-lg
                  group-hover:shadow-cyan-500/50
                  transition-all
                "
              >
                🚀
              </div>

              <div>
                <h1
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  MCA Launchpad
                </h1>

                <p
                  className="
                    text-xs
                    text-cyan-400
                    tracking-wider
                  "
                >
                  MANIT BHOPAL
                </p>
              </div>
            </Link>

            {/* ================================= */}
            {/* NAVIGATION */}
            {/* ================================= */}

            <nav
              className="
                hidden
                md:flex
                items-center
                gap-8
              "
            >
              <Link
                to="/companies"
                onClick={closeMenu}
                className="
                  text-gray-300
                  hover:text-cyan-400
                  transition-colors
                "
              >
                Companies
              </Link>

              {(user?.role === "admin" ||
                user?.role === "boss") && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="
                    text-gray-300
                    hover:text-cyan-400
                    transition-colors
                  "
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* ================================= */}
            {/* USER SECTION */}
            {/* ================================= */}

            {!user ? (
              // =================================
              // SIGN IN
              // =================================

              <button
                onClick={() =>
                  setIsModalOpen(true)
                }
                className="
                  px-6
                  py-2
                  bg-cyan-500
                  hover:bg-cyan-600
                  rounded-lg
                  text-white
                  transition
                "
              >
                Sign In
              </button>
            ) : (
              // =================================
              // LOGGED IN USER
              // =================================

              <div className="relative">
                {/* USER BUTTON */}

                <button
                  onClick={() =>
                    setShowUserMenu(
                      (prev) => !prev
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-2
                    bg-[#1a1f2e]
                    rounded-xl
                    border
                    border-cyan-500/20
                    hover:border-cyan-500/50
                    transition
                  "
                >
                  {/* ============================= */}
                  {/* PROFILE PICTURE */}
                  {/* ============================= */}

                  {user?.profilePicture ? (
                    <img
                      src={
                        user.profilePicture
                      }
                      alt={
                        user.name ||
                        "Profile"
                      }
                      className="
                        w-10
                        h-10
                        rounded-full
                        object-cover
                        border-2
                        border-cyan-500/40
                        shrink-0
                      "
                      onError={(e) => {
                        console.error(
                          "Failed to load profile image:",
                          user.profilePicture
                        );

                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    // =============================
                    // FALLBACK INITIAL
                    // =============================

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-cyan-500
                        flex
                        items-center
                        justify-center
                        text-white
                        font-bold
                        shrink-0
                      "
                    >
                      {getUserInitial()}
                    </div>
                  )}

                  {/* ============================= */}
                  {/* USER INFO */}
                  {/* ============================= */}

                  <div
                    className="
                      hidden
                      sm:block
                      text-left
                    "
                  >
                    <div
                      className="
                        text-white
                        font-medium
                      "
                    >
                      {user?.name ||
                        "User"}
                    </div>

                    <div
                      className="
                        text-xs
                        text-cyan-400
                        capitalize
                      "
                    >
                      {user?.role || ""}
                    </div>
                  </div>

                  {/* ============================= */}
                  {/* ARROW */}
                  {/* ============================= */}

                  <span
                    className={`
                      text-gray-400
                      text-xs
                      transition-transform
                      duration-200

                      ${
                        showUserMenu
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  >
                    ▼
                  </span>
                </button>

                {/* ================================= */}
                {/* DROPDOWN MENU */}
                {/* ================================= */}

                {showUserMenu && (
                  <div
                    className="
                      absolute
                      right-0
                      mt-2
                      w-56
                      overflow-hidden
                      rounded-xl
                      bg-[#1a1f2e]
                      border
                      border-cyan-500/20
                      shadow-2xl
                    "
                  >
                    {/* ============================= */}
                    {/* MY PROFILE */}
                    {/* ============================= */}

                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-gray-300
                        hover:bg-cyan-500/10
                        hover:text-cyan-400
                        transition
                      "
                    >
                      <span>
                        👤
                      </span>

                      My Profile
                    </Link>

                    {/* ============================= */}
                    {/* DASHBOARD */}
                    {/* ============================= */}

                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-gray-300
                        hover:bg-cyan-500/10
                        hover:text-cyan-400
                        transition
                      "
                    >
                      <span>
                        📊
                      </span>

                      Dashboard
                    </Link>

                    {/* ============================= */}
                    {/* SHARE EXPERIENCE */}
                    {/* ============================= */}

                    {(user?.role ===
                      "senior" ||
                      user?.role ===
                        "boss" ||
                      user?.role ===
                        "admin") && (
                      <Link
                        to="/experiences/new"
                        onClick={
                          closeMenu
                        }
                        className="
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          text-gray-300
                          hover:bg-cyan-500/10
                          hover:text-cyan-400
                          transition
                        "
                      >
                        <span>
                          ✍️
                        </span>

                        Share Experience
                      </Link>
                    )}

                    {/* ============================= */}
                    {/* DIVIDER */}
                    {/* ============================= */}

                    <div
                      className="
                        border-t
                        border-gray-700/50
                      "
                    />

                    {/* ============================= */}
                    {/* LOGOUT */}
                    {/* ============================= */}

                    <button
                      onClick={
                        handleLogout
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        w-full
                        text-left
                        px-4
                        py-3
                        text-red-400
                        hover:bg-red-500/10
                        transition
                      "
                    >
                      <span>
                        ↪
                      </span>

                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* ================================= */}
      {/* SIGN IN MODAL */}
      {/* ================================= */}

      <SignInModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      />
    </>
  );
};

export default Header;