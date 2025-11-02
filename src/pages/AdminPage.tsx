import React from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useContentStore } from "../store/contentStore";

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useContentStore();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
        <h1 className="text-3xl font-semibold mb-4">Access Denied</h1>
        <p>Please log in as Admin from the Home Page to continue.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
