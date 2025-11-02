// src/components/spasticity/SpasticityResearch.tsx
import React from "react";
import { motion } from "framer-motion";

interface ResearchProps {
  data?: {
    title?: string;
    items?: { heading: string; details: string; image?: string }[];
  };
}

const SpasticityResearch: React.FC<ResearchProps> = ({ data }) => {
  const items = data?.items || [
    {
      heading: "Biomechanical Feedback Systems",
      details:
        "Analyzing movement patterns and muscle response to improve therapy outcomes.",
    },
    {
      heading: "Adaptive Compression Technology",
      details:
        "Customizable tension to assist in reducing muscle stiffness and improve mobility.",
    },
    {
      heading: "Data-Driven Rehabilitation",
      details:
        "Utilizing AI and analytics for predictive recovery models and patient-specific insights.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          {data?.title || "Research & Development"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image || "/images/research.jpg"}
                alt={item.heading}
                className="rounded-xl w-full h-48 object-cover mb-5"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {item.heading}
              </h3>
              <p className="text-gray-600">{item.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpasticityResearch;
