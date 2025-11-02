// src/components/spasticity/SpasticityInnovation.tsx
import React from "react";
import { motion } from "framer-motion";

interface InnovationProps {
  data?: {
    title?: string;
    items?: { name: string; description: string; icon?: string }[];
  };
}

const SpasticityInnovation: React.FC<InnovationProps> = ({ data }) => {
  const items = data?.items || [
    {
      name: "Smart Rehabilitation Fabrics",
      description:
        "Integrating sensors and adaptive compression to support therapeutic recovery.",
    },
    {
      name: "Assistive Technology Devices",
      description:
        "Enhancing mobility and muscle control through intelligent wearables.",
    },
    {
      name: "Data-Driven Insights",
      description:
        "Leveraging real-time patient feedback to refine and personalize therapy.",
    },
  ];

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-gray-800 text-center mb-12"
      >
        {data?.title || "Our Innovations"}
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              {item.name}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpasticityInnovation;
