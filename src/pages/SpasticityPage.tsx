import React, { useEffect } from "react";
import { useContentStore } from "../store/contentStore";
import SpasticityNavbar from "../components/spasticity/SpasticityNavbar";
import SpasticityHero from "../components/spasticity/SpasticityHero";
import AboutSpasticity from "../components/spasticity/AboutSpasticity";
import SpasticityInnovation from "../components/spasticity/SpasticityInnovation";
import SpasticityWhoHelps from "../components/spasticity/SpasticityWhoHelps";
import SpasticityResearch from "../components/spasticity/SpasticityResearch";
import SpasticityPress from "../components/spasticity/SpasticityPress";
import SpasticityFooter from "../components/spasticity/SpasticityFooter";

const SpasticityPage: React.FC = () => {
  const { content, fetchContent, loading, error } = useContentStore();

  useEffect(() => {
    fetchContent("spasticity");
  }, [fetchContent]);

  const spasticity = content?.spasticity || {};

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">
        Loading Spasticity Page...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading Spasticity Page: {error}
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Navbar */}
      <SpasticityNavbar data={spasticity.navbar} />

      {/* Hero Section */}
      <SpasticityHero data={spasticity.hero} />

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AboutSpasticity data={spasticity.about} />
      </section>

      {/* Innovation Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SpasticityInnovation data={spasticity.innovation} />
        </div>
      </section>

      {/* Who It Helps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SpasticityWhoHelps data={spasticity.whoItHelps} />
        </div>
      </section>

      {/* Research Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SpasticityResearch data={spasticity.research} />
        </div>
      </section>

      {/* Press Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SpasticityPress data={spasticity.press} />
        </div>
      </section>

      {/* Footer */}
      <SpasticityFooter data={spasticity.footer} />
    </div>
  );
};

export default SpasticityPage;
