import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    ctaText1?: string;
    ctaText2?: string;
  };
}

const HomeHero: React.FC<HeroProps> = ({ data }) => {
  if (!data) return null;

  const {
    title,
    subtitle,
    description,
    backgroundImage,
    ctaText1,
    ctaText2,
  } = data;

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(to right, #14532d, #22c55e)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated background zoom effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          filter: "brightness(0.75)",
        }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Gradient overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>

      {/* Hero content */}
      <div className="relative z-10 text-white max-w-3xl px-6">
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
          >
            {title}
          </motion.h1>
        )}

        {subtitle && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-emerald-300 mb-5 font-semibold tracking-wide"
          >
            {subtitle}
          </motion.h2>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-gray-100 text-lg md:text-xl mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {description}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          {ctaText1 && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:shadow-emerald-400/40 transition-all duration-300"
            >
              {ctaText1}
            </motion.button>
          )}
          {ctaText2 && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full border-2 border-white/80 text-white font-semibold text-lg hover:bg-white hover:text-emerald-700 transition-all duration-300"
            >
              {ctaText2}
            </motion.button>
          )}
        </motion.div>
      </div>

      

     
    </section>
  );
};

export default HomeHero;
