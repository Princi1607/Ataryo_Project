// backend/seedContent.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Content from "./models/Content.js";

dotenv.config();

const seedData = [
  {
    section: "home",
    data: {
      navbar: {
        title: "ATARYO",
        links: [
          { label: "Textile", href: "/textile" },
          { label: "Spasticity", href: "/spasticity" },
        ],
      },
      hero: {
        title: "Reclaiming Nature. Reinventing Textiles.",
        subtitle: "From forestry waste to future-ready fibers.",
        description:
          "Ataryo transforms natural by-products into sustainable, high-performance textiles for a regenerative tomorrow.",
        backgroundImage:
          "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
        ctaText1: "Explore Textiles",
        ctaText2: "Partner With Us",
      },
      about: {
        title: "About Us",
        vision: "To drive innovation that uplifts communities and fosters sustainability.",
        mission: "Empowering industries through responsible research and ethical design.",
        statement:
          "We combine creativity, technology, and impact-driven goals to redefine the future.",
        image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
      },
      coreValues: {
        title: "Our Core Values",
        values: [
          { title: "Integrity", description: "We maintain honesty in every decision and partnership." },
          { title: "Innovation", description: "Constantly pushing boundaries to create impactful solutions." },
          { title: "Sustainability", description: "Designing for the planet and future generations." },
        ],
      },
      whyWeExist: {
        title: "Why We Exist",
        description:
          "We exist to transform waste into value, creating sustainable materials that empower people and protect nature.",
        highlights: [
          "Empowering ethical innovation",
          "Driving community upliftment",
          "Sustaining ecological balance",
        ],
        image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
      },
      team: {
        title: "Our Team",
        members: [
          { name: "A. Founder", role: "CEO", image: "https://via.placeholder.com/200" },
          { name: "B. Lead", role: "CTO", image: "https://via.placeholder.com/200" },
        ],
      },
      footer: {
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
        copyright: "© Ataryo 2025",
      },
    },
  },
  {
    section: "textile",
    data: {
      navbar: {
        title: "Ataryo Textiles",
        links: [
          { label: "Home", href: "/", internal: true },
          { label: "Textile", href: "/textile", internal: true },
          { label: "Spasticity", href: "/spasticity", internal: true },
          { label: "Contact", href: "#contact", internal: false },
        ],
      },
      hero: {
        title: "Revolutionizing Smart Textiles",
        subtitle:
          "We blend technology and sustainability to craft the next generation of intelligent, eco-friendly fabrics.",
        backgroundImage: "",
        ctaText: "Learn More",
      },
      about: {
        title: "About Our Textile Division",
        text:
          "We engineer high-performance, sustainable textiles for industrial, medical, and lifestyle applications.",
        image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
      },
      products: {
        title: "Our Product Innovations",
        items: [
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
        ],
      },
      sustainability: {
        title: "Sustainability",
        points: [
          "Circular design principles",
          "Low-impact dyeing",
          "Recyclable fibers",
        ],
      },
      research: {
        title: "Research & Development",
        summary:
          "Exploring bio-based polymers, advanced fiber spinning, and smart fabric integrations.",
      },
      press: {
        title: "Press",
        items: [
          { title: "Ataryo featured in TechTextile", link: "#" },
        ],
      },
      footer: {
        note: "Textile division footer content",
      },
    },
  },
  {
    section: "spasticity",
    data: {
      navbar: {
        title: "Ataryo Spasticity",
        links: [
          { label: "Home", href: "/", internal: true },
          { label: "Textile", href: "/textile", internal: true },
          { label: "Spasticity", href: "/spasticity", internal: true },
          { label: "Contact", href: "#contact", internal: false },
        ],
      },
      hero: {
        title: "Empowering Movement Through Innovation",
        subtitle:
          "Pioneering breakthrough solutions for spasticity treatment and patient care.",
        backgroundImage: "/images/spasticity-hero.jpg",
      },
      about: {
        title: "About Spasticity",
        description:
          "We research and develop materials that can support therapies and assistive solutions.",
        image: "https://images.pexels.com/photos/4047070/pexels-photo-4047070.jpeg",
      },
      innovation: {
        title: "Innovation",
        items: [
          { name: "Smart brace textiles", description: "Adaptive compression and embedded sensing." },
          { name: "Bio-compatible fibers", description: "Materials designed for skin contact and comfort." },
          { name: "Soft robotics interfaces", description: "Actuated textiles supporting assisted movement." },
        ],
      },
      whoItHelps: {
        title: "Who It Helps",
        people: [
          { name: "Patients", role: "Improved mobility and comfort." },
          { name: "Clinicians", role: "Better rehabilitation feedback." },
          { name: "Caregivers", role: "Ease of assistance and monitoring." },
        ],
      },
      research: {
        title: "Research",
        items: [
          { heading: "Pilot Study 2025", details: "Preliminary outcomes in assisted mobility." },
        ],
      },
      press: {
        title: "Press",
        articles: [
          { headline: "Ataryo’s Healthcare Innovations", link: "#" },
        ],
      },
      footer: {
        note: "Spasticity page footer content",
      },
    },
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    for (const item of seedData) {
      await Content.findOneAndUpdate(
        { section: item.section },
        item,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded section: ${item.section}`);
    }

    console.log("🌱 All sections seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
})();
