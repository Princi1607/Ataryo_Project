import React from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  onClick: () => void;
}

const AdminCard: React.FC<Props> = ({ title, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-8 rounded-2xl shadow-md cursor-pointer border hover:border-blue-600 transition"
      onClick={onClick}
    >
      <h3 className="text-2xl font-semibold text-center text-gray-700">{title}</h3>
      <p className="text-center text-gray-500 mt-2">Click to edit content</p>
    </motion.div>
  );
};

export default AdminCard;
