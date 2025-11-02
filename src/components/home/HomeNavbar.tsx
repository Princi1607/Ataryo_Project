import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useContentStore } from "../../store/contentStore";

interface NavbarProps {
  data?: {
    title?: string;
    links?: { label: string; href: string }[];
    showTextile?: boolean;
    showSpasticity?: boolean;
  };
}

const HomeNavbar: React.FC<NavbarProps> = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useContentStore();
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      setShowLogin(false);
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* 🌐 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-[60]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {data?.title || "ATARYO"}
          </h1>

          <div className="space-x-6 text-gray-700 font-medium">
            {data?.showTextile && location.pathname !== "/textile" && (
              <button
                onClick={() => navigate("/textile")}
                className="text-black transition hover:text-blue-600"
              >
                Textile
              </button>
            )}
            {data?.showSpasticity && location.pathname !== "/spasticity" && (
              <button
                onClick={() => navigate("/spasticity")}
                className="text-black transition hover:text-blue-600"
              >
                Spasticity
              </button>
            )}
            {(data?.links || []).map((l, i) => (
              <button
                key={i}
                onClick={() => navigate(l.href)}
                className="transition hover:text-blue-600"
              >
                {l.label}
              </button>
            ))}

            {!isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Admin
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
              >
                Logout
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* 🔐 Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ minHeight: "100vh", overflowY: "auto" }}
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8 w-[90%] max-w-md mx-auto my-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-semibold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Admin Login
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <div className="mt-6 space-y-3">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-sky-700 text-white py-2 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-800 transition-all"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="w-full text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default HomeNavbar;
