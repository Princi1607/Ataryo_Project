import React, { useEffect } from "react";
import { useContentStore } from "../store/contentStore";
import TextileNavbar from "../components/textile/TextileNavbar";
import TextileHero from "../components/textile/TextileHero";
import Products from "../components/textile/TextileProduct";
import Sustainability from "../components/textile/TextileSustainability";  
import AboutTextile from "../components/textile/AboutTextile";  
import Research from "../components/textile/TextileResearch";  
import Press from "../components/textile/TextilePress";  
import TextileFooter from "../components/textile/TextileFooter";

const TextilePage: React.FC = () => {
  const { content, fetchContent, loading, error } = useContentStore();

  useEffect(() => {
    fetchContent("textile");
  }, [fetchContent]);

  const textile = content?.textile || {};

  if (loading) return <div>Loading Textile Page...</div>;
  if (error) return <div>Error loading Textile Page: {error}</div>;

  return (
    <>
      <TextileNavbar data={textile.navbar} />
      <TextileHero data={textile.hero} />
      <AboutTextile data={textile.about} />
      <Products data={textile.products} />
      <Sustainability data={textile.sustainability} />
      <Research data={textile.research} />
      <Press data={textile.press} />
      <TextileFooter data={textile.footer} />
    </>
  );
};

export default TextilePage;
