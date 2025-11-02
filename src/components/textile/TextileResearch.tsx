import React from "react";
import { motion } from "framer-motion";

const fadeVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface ResearchProps {
  data?: {
    title?: string;
    summary?: string;
    image?: string;
  };
}

const TextileResearch: React.FC<ResearchProps> = ({ data }) => {
  return (
    <section className="py-20 bg-white" id="research">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeVariant}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          {data?.title || "Research & Innovation"}
        </motion.h2>
        <motion.p
          variants={fadeVariant}
          initial="hidden"
          whileInView="show"
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {data?.summary ||
            "Our R&D focuses on the intersection of biotechnology, artificial intelligence, and sustainable design — developing fabrics that monitor vitals, react to environmental stimuli, and optimize human performance."}
        </motion.p>
        <motion.img
          variants={fadeVariant}
          initial="hidden"
          whileInView="show"
          src={data?.image || "/images/research-lab.jpg"}
          alt="Research Lab"
          className="rounded-2xl shadow-xl w-full md:w-3/4 mx-auto"
        />
      </div>
    </section>
  );
};

export default TextileResearch;
