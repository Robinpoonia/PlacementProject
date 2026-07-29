import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SignInModal from "../Auth/SignInModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowUserMenu(false);

    window.location.href = "/";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-3 group"
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
                <h1 className="text-2xl font-bold text-white">
                  MCA Launchpad
                </h1>

                <p className="text-xs text-cyan-400 tracking-wider">
                  MANIT BHOPAL
                </p>
              </div>
            </Link>

            {/* Navigation */}

            <nav className="hidden md:flex items-center gap-8">

              <Link
                to="/companies"
                className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                Companies
              </Link>

              {(user?.role === "admin" ||
                user?.role === "boss") && (
                <Link
                  to="/admin"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* User */}

            {!user ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white"
              >
                Sign In
              </button>
            ) : (
              <div className="relative">

                <button
                  onClick={() =>
                    setShowUserMenu(!showUserMenu)
                  }
                  className="flex items-center gap-3 px-4 py-2 bg-[#1a1f2e] rounded-lg border border-cyan-500/20"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">

                    {user.name
                      ? user.name[0]
                      : user.email[0].toUpperCase()}

                  </div>

                  <div className="hidden sm:block text-left">

                    <div className="text-white">

                      {user.name}

                    </div>

                    <div className="text-xs text-cyan-400 capitalize">

                      {user.role}

                    </div>

                  </div>

                </button>

                {showUserMenu && (

                  <div className="absolute right-0 mt-2 w-52 rounded-lg bg-[#1a1f2e] border border-cyan-500/20">

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/10"
                    >
                      Dashboard
                    </Link>

                    {(user.role === "senior" ||
                      user.role === "boss" ||
                      user.role === "admin") && (
                      <Link
                        to="/experiences/new"
                        className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/10"
                      >
                        Share Experience
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>
            )}
          </div>
        </div>
      </motion.header>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;