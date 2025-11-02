import React from "react";
import { motion } from "framer-motion";

interface PressProps {
  data?: {
    title?: string;
    items?: { title: string; date?: string; link: string; image?: string }[];
  };
}

const TextilePress: React.FC<PressProps> = ({ data }) => {
  const pressData = data?.items || [
    { title: "Ataryo Introduces Smart Textile Range", date: "June 2025", link: "#" },
    { title: "Sustainability Through Science: Textile Week Feature", date: "September 2025", link: "#" },
    { title: "AI Meets Fabric – The Future of Clothing", date: "January 2026", link: "#" },
  ];
  return (
    <section className="bg-gray-50 py-20" id="press">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-10 text-center"
        >
          {data?.title || "Press & Media"}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pressData.map((press, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {press.title}
              </h3>
              {press.date && (
                <p className="text-gray-500 mb-3">{press.date}</p>
              )}
              <a href={press.link} className="text-blue-600 hover:underline">
                Read More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextilePress;
