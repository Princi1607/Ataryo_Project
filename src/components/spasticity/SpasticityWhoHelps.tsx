// src/components/spasticity/SpasticityWhoHelps.tsx
import React from "react";
import { motion } from "framer-motion";

interface WhoProps {
  data?: {
    title?: string;
    people?: { name: string; role: string; image?: string }[];
  };
}

const SpasticityWhoHelps: React.FC<WhoProps> = ({ data }) => {
  const people = data?.people || [
    {
      name: "Patients with Neuromuscular Conditions",
      role: "Supporting daily movement and rehabilitation.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-gray-800 mb-12"
        >
          {data?.title || "Who It Helps"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {people.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={person.image || "/images/help-user.jpg"}
                alt={person.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-5"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {person.name}
              </h3>
              <p className="text-gray-600">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpasticityWhoHelps;
