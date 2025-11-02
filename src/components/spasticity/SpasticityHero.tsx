// src/components/spasticity/SpasticityHero.tsx
import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  data?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
  };
}

const SpasticityHero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${data?.backgroundImage || "/images/spasticity-hero.jpg"})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {data?.title || "Empowering Movement Through Innovation"}
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto text-gray-200">
          {data?.subtitle ||
            "Pioneering breakthrough solutions for spasticity treatment and patient care."}
        </p>
      </motion.div>
    </section>
  );
};

export default SpasticityHero;
