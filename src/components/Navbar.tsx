import React, { useState, useEffect } from "react";
import { Menu, X, Leaf, LogOut } from "lucide-react";
import AdminLogin from "./AdminLogin";
import { useContentStore } from "../store/contentStore";

interface NavbarProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (value: boolean) => void;
  setShowAdminPanel: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  setShowAdminPanel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { logout } = useContentStore();

  const handleLogout = () => {
    logout();
    setShowAdminPanel(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  const hamburgerItems = [
    { name: "Why Ataryo?", href: "#why-ataryo" },
    { name: "Products & Applications", href: "#products" },
    { name: "Sustainability & Impact", href: "#sustainability" },
    { name: "Research & Innovation", href: "#research" },
    { name: "Partnerships & Collaborations", href: "#partnerships" },
    { name: "Press & Media", href: "#press" },
    { name: "Team & Leadership", href: "#team" },
    { name: "Investors & Partnerships", href: "#investors" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0A5737] to-[#00A651] rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0A5737]">Ataryo</span>
            </div>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-[#0A5737] transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Right side - Admin + Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Admin Login/Panel/Logout */}
              {!isAdminLoggedIn ? (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="text-sm text-gray-600 hover:text-[#0A5737] transition-colors"
                >
                  Admin
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAdminPanel(true)}
                    className="text-sm bg-[#0A5737] text-white px-3 py-1 rounded-md hover:bg-[#067141] transition-colors"
                  >
                    Admin Panel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-1"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-[#0A5737] hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {/* Main nav items for mobile */}
              {mainNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#0A5737] hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <hr className="my-2" />
              {/* Hamburger items */}
              {hamburgerItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#0A5737] hover:bg-gray-50 rounded-md transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Hamburger Menu */}
        {isMenuOpen && (
          <div className="hidden md:block absolute top-full right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
            {hamburgerItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-[#0A5737] hover:bg-gray-50 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin
          onClose={() => setShowAdminLogin(false)}
          onLogin={() => {
            setIsAdminLoggedIn(true);
            setShowAdminLogin(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
