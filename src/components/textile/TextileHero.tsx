import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  data?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    ctaText?: string;
  };
}

const TextileHero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-r from-blue-100 to-indigo-200"
      style={{
        backgroundImage: data?.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: data?.backgroundImage ? "cover" : undefined,
        backgroundPosition: data?.backgroundImage ? "center" : undefined,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-gray-800"
      >
        {data?.title || "Revolutionizing Smart Textiles"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-gray-700 mt-6 max-w-2xl"
      >
        {data?.subtitle ||
          "We blend technology and sustainability to craft the next generation of intelligent, eco-friendly fabrics."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-10"
      >
        <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg shadow-md hover:bg-blue-700 transition-all">
          {data?.ctaText || "Learn More"}
        </button>
      </motion.div>
    </section>
  );
};

export default TextileHero;
