import React from "react";

interface FooterProps {
  data?: {
    contact?: string;
    careers?: string;
    socials?: { name: string; link: string }[];
  };
}

const SpasticityFooter: React.FC<FooterProps> = ({ data }) => {
  const socials = data?.socials || [
    { name: "LinkedIn", link: "#" },
    { name: "Twitter", link: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <p>{data?.contact || "Contact: contact@ataryo.com"}</p>
        <p>{data?.careers || "Join Us / Career: careers@ataryo.com"}</p>
        <div className="flex justify-center gap-4">
          {socials.map((s, i) => (
            <a key={i} href={s.link} className="hover:text-blue-400">
              {s.name}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} Ataryo Spasticity Division. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SpasticityFooter;
