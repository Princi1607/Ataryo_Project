// src/components/spasticity/AboutSpasticity.tsx
import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  data?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const AboutSpasticity: React.FC<AboutProps> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {data?.title || "About Our Spasticity Mission"}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {data?.description ||
            "We aim to revolutionize spasticity management through advanced textiles, assistive technologies, and patient-centric solutions that improve quality of life and mobility."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={data?.image || "/images/about-spasticity.jpg"}
          alt="About Spasticity"
          className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
        />
      </motion.div>
    </div>
  );
};

export default AboutSpasticity;
