import React from "react";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  logo?: string;
  website?: string;
}

interface PartnershipProps {
  data?: {
    title?: string;
    description?: string;
    partners?: Partner[];
  };
}

const HomePartnership: React.FC<PartnershipProps> = ({ data }) => {
  if (!data) return null;
  const { title, description, partners = [] } = data;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 🌄 Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-100 to-green-50"></div>

      {/* 🌫️ Overlay texture */}
      <div className="absolute inset-0 bg-[url('/assets/pattern-light.svg')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* ✨ Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          {title}
        </motion.h2>

        {/* 📝 Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-16"
        >
          {description}
        </motion.p>

        {/* 🤝 Partner Logos */}
        {partners.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 justify-items-center">
            {partners.map((p, i) => (
              <motion.a
                key={i}
                href={p.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group w-36 h-24 flex items-center justify-center bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-green-400/20 to-lime-300/20 blur-2xl"></div>

                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="relative z-10 max-h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="relative z-10 text-gray-700 font-medium text-sm">
                    {p.name}
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePartnership;
