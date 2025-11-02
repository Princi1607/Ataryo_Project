import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

interface AboutProps {
  data?: {
    title?: string;
    text?: string;
    image?: string;
  };
}

const AboutTextile: React.FC<AboutProps> = ({ data }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div variants={fadeInUp} initial="hidden" whileInView="show">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{data?.title || "About Our Textile Vision"}</h2>
        {data?.image && (
          <img src={data.image} alt={data.title || "About Textile"} className="rounded-2xl shadow-lg w-full md:w-2/3 mx-auto mb-6" />
        )}
        <p className="text-lg text-gray-600 leading-relaxed">
          {data?.text ||
            "At Ataryo, our textile innovation journey begins with a deep respect for craftsmanship and a relentless pursuit of technology integration. We combine sustainable fibers, IoT-based monitoring, and machine learning to redefine fabric intelligence."}
        </p>
      </motion.div>
    </section>
  );
};

export default AboutTextile;
