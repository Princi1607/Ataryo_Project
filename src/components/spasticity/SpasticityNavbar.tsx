import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  data?: {
    title?: string;
    links?: { label: string; href: string; internal?: boolean }[];
  };
}

const SpasticityNavbar: React.FC<NavbarProps> = ({ data }) => {
  const navigate = useNavigate();
  const links = data?.links || [];
  const location = useLocation();

  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };
  return (
    <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-lg z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {data?.title && (
          <h1 className="text-2xl font-bold text-blue-700" onClick={() => navigate("/")}>{data.title}</h1>
        )}
        <ul className="flex space-x-8 text-gray-700 font-medium">
          {data?.showTextile && location.pathname !== "/textile" && (
            <li><button onClick={() => navigate("/textile")} className="text-black">Textile</button></li>
          )}
          {data?.showSpasticity && location.pathname !== "/spasticity" && (
            <li><button onClick={() => navigate("/spasticity")} className="text-black">Spasticity</button></li>
          )}
          {links.map((l, i) => (
            <li key={i}>
              {l.internal ? (
                <Link to={l.href}>{l.label}</Link>
              ) : (
                <a href={l.href} onClick={handleAnchorClick(l.href)}>{l.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SpasticityNavbar;
