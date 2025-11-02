import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, MapPin } from "lucide-react";

interface FooterProps {
  data?: {
    companyName?: string;
    logo?: string;
    contactEmail?: string;
    address?: string;
    links?: { label: string; href: string }[];
  };
}

const HomeFooter: React.FC<FooterProps> = ({ data }) => {
  const {
    companyName = "Ataryo Labs",
    logo = "/logo.png",
    contactEmail = "hello@ataryolabs.com",
    address = "Bengaluru, India",
    links = [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Contact", href: "#" },
    ],
  } = data || {};

  return (
    <footer className="relative bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white py-20 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_60%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-10">
        {/* 🌐 Logo */}
        {logo && (
          <motion.img
            src={logo}
            alt={companyName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-14 md:h-16 mb-2 drop-shadow-[0_0_15px_rgba(147,197,253,0.3)]"
          />
        )}

        {/* 🩵 Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl text-gray-300 text-lg leading-relaxed"
        >
          Empowering innovation through technology, creativity, and purpose.
        </motion.p>

        {/* 📬 Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-300"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="flex items-center gap-2 hover:text-indigo-300 transition"
          >
            <Mail size={18} /> {contactEmail}
          </a>
          <span className="hidden md:block text-gray-500">|</span>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={18} /> {address}
          </div>
        </motion.div>

        {/* 🔗 Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-4"
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="relative text-gray-300 hover:text-white transition duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </motion.div>

        {/* 🌐 Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center gap-6 mt-6"
        >
          <a
            href="#"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
          >
            <Twitter size={20} />
          </a>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent my-10" />

        {/* ⚡ Footer Bottom */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-300 font-semibold">{companyName}</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
