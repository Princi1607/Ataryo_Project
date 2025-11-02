import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

interface ProductsProps {
  data?: {
    title?: string;
    items?: { title: string; desc: string; image: string }[];
  };
}

const TextileProduct: React.FC<ProductsProps> = ({ data }) => {
  const products = data?.items || [
    {
      title: "Smart Fabrics",
      desc:
        "Integrating sensors within textiles for responsive performance in health and lifestyle applications.",
      image: "/images/smart-fabric.jpg",
    },
    {
      title: "Adaptive Clothing",
      desc:
        "AI-driven materials that adapt to temperature, comfort, and movement for dynamic environments.",
      image: "/images/adaptive-clothing.jpg",
    },
    {
      title: "Technical Textiles",
      desc:
        "Durable, sustainable fabrics for industrial, medical, and performance-based use cases.",
      image: "/images/technical-textiles.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold text-gray-800 mb-12 text-center"
        >
          {data?.title || "Our Product Innovations"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextileProduct;
