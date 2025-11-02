import React from "react";
import { motion } from "framer-motion";

interface CoreValuesProps {
  data?: {
    title?: string;
    values?: { title: string; description: string }[];
  };
}

const HomeCoreValues: React.FC<CoreValuesProps> = ({ data }) => {
  if (!data) return null;
  const { title, values = [] } = data;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-green-50/60 to-gray-100">
      {/* Decorative background lights */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/40 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl opacity-60 animate-pulse" />

      <div className="relative container mx-auto px-6 text-center z-10">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-16 tracking-tight"
          >
            {title}
          </motion.h2>
        )}

        <div className="grid md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="relative group bg-white/70 backdrop-blur-md border border-white/40 
                         rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 
                         hover:-translate-y-2 p-8 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-emerald-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300" />
              {value.title && (
                <h3 className="text-2xl font-semibold text-emerald-700 mb-3 relative z-10">
                  {value.title}
                </h3>
              )}
              {value.description && (
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {value.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCoreValues;
