import React, { useState } from "react";
import AdminEditor from "./AdminEditor";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <div className="flex flex-col p-6">
      <div className="flex gap-4 mb-6">
        {["home", "textile", "spasticity"].map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-4 py-2 rounded ${
              selectedSection === section ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>

      <AdminEditor section={selectedSection} />
    </div>
  );
};

export default AdminDashboard;
