import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface SustainabilityProps {
  data?: {
    title?: string;
    points?: string[];
    ctaText?: string;
  };
}

const TextileSustainability: React.FC<SustainabilityProps> = ({ data }) => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-blue-100 py-20" id="sustainability">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold text-gray-800 mb-8"
        >
          {data?.title || "Sustainability & Impact"}
        </motion.h2>
        {data?.points && data.points.length > 0 ? (
          <ul className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8 list-disc text-left">
            {data.points.map((p, i) => (
              <li key={i} className="ml-6 mb-2">{p}</li>
            ))}
          </ul>
        ) : (
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Our textile development follows a zero-waste philosophy. From water-efficient dyeing
            processes to biodegradable materials, we focus on minimizing carbon footprints
            while ensuring superior quality and durability.
          </motion.p>
        )}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          className="flex justify-center mt-10"
        >
          <button className="bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-all">
            {data?.ctaText || "Explore Our Eco Journey"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TextileSustainability;
