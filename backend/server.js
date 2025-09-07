import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contentRoutes from "./routes/content.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ataryo")
  .then(() => {
    console.log("Connected to MongoDB");
    // Initialize default content if database is empty
    initializeDefaultContent();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Initialize default content
async function initializeDefaultContent() {
  const { Content } = await import("./models/Content.js");

  try {
    const existingContent = await Content.findOne();
    if (!existingContent) {
      const defaultContent = new Content({
        hero: {
          title: "Reclaiming Nature.",
          subtitle: "Reinventing Textiles.",
          description:
            "From forestry waste to future-ready fibers — Ataryo transforms natural by-products of tree residues and forestry waste into sustainable, high-performance textiles for a regenerative tomorrow.",
          backgroundImage:
            "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
          ctaText1: "Explore Textiles",
          ctaText2: "Partner With Us",
        },
        about: {
          title: "About Us",
          description1:
            "Ataryo is pioneering a new era of sustainable textiles. Every year, millions of tonnes of tree residuals, branches, bark, and foliage are discarded. We see them not as waste, but as raw materials for innovation.",
          description2:
            'By transforming forestry by-products into premium fibers, fabrics, and applications, we are redefining what "sustainability" means for fashion, healthcare, interiors, and industries worldwide.',
          mission:
            "Transforming tree residues and forestry waste into sustainable textile.",
          vision:
            "A future where every textile is circular, responsible, and regenerative.",
          image:
            "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
          statValue: "100%",
          statLabel: "Waste-to-Value",
        },
        whyAtaryo: {
          title: "Why Ataryo?",
          subtitle: "The future of textiles is here, and it's sustainable",
          reasons: [
            {
              title: "Zero Waste Philosophy",
              description:
                "We transform 100% of forestry by-products into valuable textile materials.",
              icon: "Recycle",
            },
            {
              title: "Premium Quality",
              description:
                "Our fibers match and exceed traditional textile performance standards.",
              icon: "Award",
            },
            {
              title: "Scalable Innovation",
              description:
                "Technology designed to meet global textile demand sustainably.",
              icon: "TrendingUp",
            },
            {
              title: "Circular Economy",
              description:
                "Creating closed-loop systems that benefit both nature and business.",
              icon: "RefreshCw",
            },
          ],
        },
        products: {
          title: "Products & Applications",
          subtitle:
            "Our solutions span industries and lifestyles, making sustainability accessible everywhere",
          applications: [
            {
              title: "Fashion & Lifestyle",
              description:
                "Fabrics for everyday wear, luxury fashion, and accessories.",
              icon: "Shirt",
            },
            {
              title: "Medical & Healthcare",
              description:
                "Hypoallergenic linens, antimicrobial textiles, and medical-grade fibers.",
              icon: "Heart",
            },
            {
              title: "Home & Interiors",
              description:
                "Sustainable upholstery, curtains, and décor textiles.",
              icon: "Home",
            },
            {
              title: "Sports & Outdoor",
              description:
                "Performance-driven fabrics for activewear and adventure gear.",
              icon: "Zap",
            },
            {
              title: "Mobility & Automotive",
              description:
                "Interiors, seat covers, and technical applications.",
              icon: "Car",
            },
            {
              title: "Industrial & Filtration",
              description: "Nonwovens, geotextiles, and specialty composites.",
              icon: "Factory",
            },
            {
              title: "Luxury & Designer",
              description: "Bespoke solutions for couture and high-end brands.",
              icon: "Crown",
            },
          ],
          ctaTitle: "Discover Our Collections",
          ctaDescription:
            "Explore our comprehensive range of sustainable textiles designed for every industry and application.",
          ctaText: "Discover Our Collections",
        },
        sustainability: {
          title: "Sustainability & Impact",
          subtitle: "Every thread tells a story of regeneration",
          description:
            "Our commitment goes beyond creating sustainable textiles. We're building a regenerative ecosystem that benefits forests, communities, and the planet.",
          impacts: [
            {
              title: "Forest Regeneration",
              description:
                "Supporting healthy forest ecosystems through waste utilization.",
              icon: "Trees",
              value: "95%",
              label: "Waste Reduction",
            },
            {
              title: "Carbon Negative",
              description:
                "Our process actively removes CO2 from the atmosphere.",
              icon: "Leaf",
              value: "80%",
              label: "Carbon Reduction",
            },
            {
              title: "Water Conservation",
              description:
                "Minimal water usage compared to traditional textile production.",
              icon: "Droplet",
              value: "70%",
              label: "Water Saved",
            },
            {
              title: "Biodegradable",
              description:
                "All our textiles return safely to nature at end of life.",
              icon: "RotateCcw",
              value: "100%",
              label: "Biodegradable",
            },
          ],
        },
        partnerships: {
          title: "Partnerships & Collaborations",
          subtitle:
            "We're creating a new category of textiles — and we believe in doing it together by princi and chakri.",
          partnerTypes: [
            {
              title: "Fashion Brands",
              description:
                "Add sustainability and story-driven value to collections.",
              benefits: [
                "Sustainable sourcing",
                "Brand differentiation",
                "Consumer appeal",
              ],
              icon: "Building",
            },
            {
              title: "Healthcare Providers",
              description: "Safer, cleaner, and eco-friendly medical textiles.",
              benefits: [
                "Hypoallergenic properties",
                "Antimicrobial features",
                "Patient safety",
              ],
              icon: "Hospital",
            },
            {
              title: "Designers & Startups",
              description:
                "Innovate with us on new materials and applications.",
              benefits: ["Custom solutions", "R&D support", "Market access"],
              icon: "Palette",
            },
          ],
          ctaTitle: "Ready to Partner with Ataryo?",
          ctaDescription:
            "Join us in revolutionizing the textile industry with sustainable, innovative solutions.",
          ctaText: "Partner With Ataryo",
        },
        contact: {
          title: "Contact Us",
          subtitle: "Ready to transform your textile needs?",
          description:
            "Get in touch with our team to discuss how Ataryo can support your sustainability goals.",
          email: "hello@ataryo.com",
          phone: "+1 (555) 123-4567",
          address: "123 Sustainability Street, Green City, GC 12345",
          socialLinks: {
            linkedin: "https://linkedin.com/company/ataryo",
            twitter: "https://twitter.com/ataryo",
            instagram: "https://instagram.com/ataryo",
          },
        },
      });

      await defaultContent.save();
      console.log("Default content initialized");
    }
  } catch (error) {
    console.error("Error initializing default content:", error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
