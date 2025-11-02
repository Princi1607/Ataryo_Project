import React from "react";

interface FooterProps {
  data?: {
    title?: string;
    blurb?: string;
    links?: { label: string; href: string }[];
    contactEmail?: string;
    note?: string;
  };
}

const TextileFooter: React.FC<FooterProps> = ({ data }) => {
  const links = data?.links || [
    { label: "Home", href: "/" },
    { label: "Spasticity", href: "/spasticity" },
    { label: "Textile", href: "/textile" },
  ];
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">{data?.title || "Ataryo Textiles"}</h3>
          <p>{data?.blurb || "Innovating the world of smart and sustainable fabrics."}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {links.map((l, i) => (
              <li key={i}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Connect With Us</h4>
          <p>Email: {data?.contactEmail || "contact@ataryo.in"}</p>
          <p>Follow us on social media</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        {data?.note || "© 2025 Ataryo. All rights reserved."}
      </div>
    </footer>
  );
};

export default TextileFooter;
