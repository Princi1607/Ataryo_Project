import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyAtaryo from './components/WhyAtaryo';
import Products from './components/Products';
import Sustainability from './components/Sustainability';
import Research from './components/Research';
import Partnerships from './components/Partnerships';
import Press from './components/Press';
import Team from './components/Team';
import Investors from './components/Investors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        setShowAdminPanel={setShowAdminPanel}
      />
      
      {showAdminPanel && isAdminLoggedIn && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
      
      <main>
        <Hero />
        <About />
        <WhyAtaryo />
        <Products />
        <Sustainability />
        <Research />
        <Partnerships />
        <Press />
        <Team />
        <Investors />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;