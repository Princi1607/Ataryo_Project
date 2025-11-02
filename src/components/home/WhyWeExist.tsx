import React from "react";
import { motion } from "framer-motion";

interface WhyWeExistProps {
  data?: {
    title?: string;
    description?: string;
    highlights?: string[];
    image?: string;
  };
}

const WhyWeExist: React.FC<WhyWeExistProps> = ({ data }) => {
  const {
    title = "Why We Exist",
    description = "Our purpose lies in bridging innovation with humanity — crafting technologies that serve both people and the planet.",
    highlights = [
      "Empowering ethical innovation",
      "Driving community upliftment",
      "Sustaining ecological balance",
    ],
    image = "/assets/why-we-exist.jpg",
  } = data || {};

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌄 Background image full width */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* 🌫️ Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-green-900/80 backdrop-blur-sm"></div>

      {/* 💡 Content section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 w-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-20 md:py-32">
        {/* 🧠 Text content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-gray-100 text-lg mb-8 max-w-2xl leading-relaxed">
            {description}
          </p>
          <ul className="space-y-4">
            {highlights.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-lg text-gray-100"
              >
                <span className="w-4 h-4 bg-green-400 rounded-full shadow-md"></span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* 🖼️ Image on the side (optional secondary visual) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-green-400 to-lime-400 rounded-3xl blur-lg opacity-30"></div>
            <img
              src={image}
              alt="Why We Exist"
              className="relative rounded-3xl shadow-2xl object-cover w-full max-w-[600px] h-[400px] md:h-[500px] border border-white/20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWeExist;
