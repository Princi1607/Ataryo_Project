// src/components/spasticity/SpasticityPress.tsx
import React from "react";
import { motion } from "framer-motion";

interface PressProps {
  data?: {
    title?: string;
    articles?: { headline: string; link: string; image?: string }[];
  };
}

const SpasticityPress: React.FC<PressProps> = ({ data }) => {
  const articles = data?.articles || [
    {
      headline: "Ataryo’s Wearable Therapy Gains Global Recognition",
      link: "#",
    },
    {
      headline: "Innovation Spotlight: Smart Fabrics for Spasticity Care",
      link: "#",
    },
    {
      headline: "Clinical Trials Show Promising Results",
      link: "#",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          {data?.title || "Press & Media"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={article.image || "/images/press.jpg"}
                alt={article.headline}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.headline}
                </h3>
                <p className="text-blue-600 font-medium">Read more →</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpasticityPress;
