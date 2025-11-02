import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface InvestmentProps {
  data?: {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

const HomeInvestment: React.FC<InvestmentProps> = ({ data }) => {
  if (!data) return null;
  const { title, description, ctaText, ctaLink } = data;

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        {ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-medium transition-all"
            >
              {ctaText || "Connect With Us"} <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HomeInvestment;
