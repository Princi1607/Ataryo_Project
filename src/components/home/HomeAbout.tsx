import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  data?: {
    title?: string;
    vision?: string;
    mission?: string;
    statement?: string;
    image?: string;
  };
}

const HomeAbout: React.FC<AboutProps> = ({ data }) => {
  if (!data) return null;
  const { title, vision, mission, statement, image } = data;

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: "linear-gradient(135deg, #f9fafb 0%, #eef2ff 100%)",
      }}
    >
      {/* Background Image (faint and blurred if present) */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt="About background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-white/30 backdrop-blur-sm" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        {/* Left: Image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title || "About"}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-md"
        >
          {title && (
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
              {title}
            </h2>
          )}
          {vision && (
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold text-indigo-600">Vision:</span>{" "}
              {vision}
            </p>
          )}
          {mission && (
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold text-purple-600">Mission:</span>{" "}
              {mission}
            </p>
          )}
          {statement && (
            <blockquote className="italic text-gray-600 border-l-4 border-indigo-400 pl-4">
              “{statement}”
            </blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeAbout;
