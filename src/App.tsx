import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TextilePage from "./pages/TextilePage";
import SpasticityPage from "./pages/SpasticityPage";
import AdminPage from "./pages/AdminPage";


const App: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [, setShowAdminPanel] = useState(false);

  return (
    <>
      {/* <Navbar
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        setShowAdminPanel={setShowAdminPanel}
      /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/textile" element={<TextilePage />} />
        <Route path="/spasticity" element={<SpasticityPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
