import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyAtaryo from "./components/WhyAtaryo";
import Products from "./components/Products";
import Sustainability from "./components/Sustainability";
import Research from "./components/Research";
import Partnerships from "./components/Partnerships";
import Press from "./components/Press";
import Team from "./components/Team";
import Investors from "./components/Investors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { useContentStore } from "./store/contentStore";

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { isAuthenticated, fetchContent, content, loading } = useContentStore();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A5737] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isAdminLoggedIn={isAuthenticated}
        setIsAdminLoggedIn={() => {}}
        setShowAdminPanel={setShowAdminPanel}
      />

      {showAdminPanel && isAuthenticated && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      <main>
        <Hero content={content?.hero} />
        <About content={content?.about} />
        <WhyAtaryo content={content?.whyAtaryo} />
        <Products content={content?.products} />
        <Sustainability content={content?.sustainability} />
        <Research content={content?.research} />
        <Partnerships content={content?.partnerships} />
        <Press content={content?.press} />
        <Team content={content?.team} />
        <Investors content={content?.investors} />
        <Contact content={content?.contact} />
      </main>

      <Footer content={content?.footer} />
    </div>
  );
}

export default App;
