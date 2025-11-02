import React from "react";
import { useNavigate } from "react-router-dom";
import { useContentStore } from "../../store/contentStore";

const AdminNavbar: React.FC = () => {
  const { logout } = useContentStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored admin token
    localStorage.removeItem("adminToken");

    // Zustand store logout (sets isAdminLoggedIn = false)
    logout();

    // Navigate back to Home page
    navigate("/");

    // Optional: refresh after logout to reset UI state cleanly
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition"
          onClick={() => navigate("/")}
        >
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
