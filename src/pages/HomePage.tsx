import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useContentStore } from "../store/contentStore";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeFooter from "../components/home/HomeFooter";
import HomeHero from "../components/home/HomeHero";
import HomeAbout from "../components/home/HomeAbout";
import HomeCoreValues from "../components/home/HomeCoreValues";
import HomeTeam from "../components/home/HomeTeam";
import HomePartnership from "../components/home/HomePartnership";
import HomeInvestment from "../components/home/HomeInvestment";
import WhyWeExist from "../components/home/WhyWeExist";

const HomePage: React.FC = () => {
  const { content, fetchContent, loading, error } = useContentStore();

  useEffect(() => {
    fetchContent("home");
  }, [fetchContent]);

  const home = content?.home || {};
  const partnerships = home.partnershipsAndInvestors?.partnership;
  const investment = home.partnershipsAndInvestors?.investment;

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">
        Loading Home Page...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading Home Page: {error}
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-x-hidden h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* ✅ Navbar (fixed for seamless scroll) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm">
        <HomeNavbar data={home.navbar} />
      </div>

      {/* ✅ Hero Section */}
      <section className="snap-start min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <HomeHero data={home.hero} />
        </motion.div>
      </section>

      {/* ✅ About Section */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <HomeAbout data={home.about} />
        </motion.div>
      </section>

      {/* ✅ Core Values */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <HomeCoreValues data={home.coreValues} />
        </motion.div>
      </section>

      {/* ✅ Why We Exist */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <WhyWeExist data={home.whyWeExist} />
        </motion.div>
      </section>

      {/* ✅ Partnership Section */}
      {partnerships && (
        <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6"
          >
            <HomePartnership data={partnerships} />
          </motion.div>
        </section>
      )}

      {/* ✅ Investment Section */}
      {investment && (
        <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 via-white to-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6"
          >
            <HomeInvestment data={investment} />
          </motion.div>
        </section>
      )}

      {/* ✅ Team Section */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <HomeTeam data={home.team} />
        </motion.div>
      </section>

      {/* ✅ Footer */}
      <section className="snap-start min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <HomeFooter data={home.footer} />
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
