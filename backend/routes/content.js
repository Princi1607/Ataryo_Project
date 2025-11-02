// backend/routes/content.js
import express from "express";
import Content from "../models/Content.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// Normalize legacy flat keys to the canonical nested structure used by the frontend
const normalizeSectionData = (section, data) => {
  if (!data || typeof data !== "object") return data;

  const d = { ...data };
  const pick = (...keys) => keys.find((k) => d[k] !== undefined);
  const val = (k) => d[k];
  const has = (k) => d[k] !== undefined;

  if (section === "home") {
    const hero = d.hero || {};
    const heroTitleKey = pick("HeroTitle", "heroTitle", "title");
    const heroSubtitleKey = pick("HeroSubtitle", "heroSubtitle", "subtitle");
    const heroDescKey = pick("HeroDescription", "heroDescription", "description");
    const heroImgKey = pick("HeroImage", "heroImage", "backgroundImage");
    if (heroTitleKey || heroSubtitleKey || heroDescKey || heroImgKey) {
      d.hero = {
        ...hero,
        ...(heroTitleKey ? { title: val(heroTitleKey) } : {}),
        ...(heroSubtitleKey ? { subtitle: val(heroSubtitleKey) } : {}),
        ...(heroDescKey ? { description: val(heroDescKey) } : {}),
        ...(heroImgKey ? { backgroundImage: val(heroImgKey) } : {}),
      };
    }

    const about = d.about || {};
    const aboutTitleKey = pick("AboutTitle", "aboutTitle");
    const aboutTextKey = pick("AboutText", "aboutText", "text");
    const aboutImageKey = pick("AboutImage", "aboutImage", "image");
    if (aboutTitleKey || aboutTextKey || aboutImageKey) {
      d.about = {
        ...about,
        ...(aboutTitleKey ? { title: val(aboutTitleKey) } : {}),
        ...(aboutTextKey ? { text: val(aboutTextKey) } : {}),
        ...(aboutImageKey ? { image: val(aboutImageKey) } : {}),
      };
    }
  }

  if (section === "textile") {
    // Legacy flat structure → hero/about
    if (!d.hero && (has("title") || has("subtitle") || has("backgroundImage") || has("HeroTitle") || has("HeroSubtitle") || has("HeroImage"))) {
      d.hero = {
        ...(pick("HeroTitle", "title") ? { title: val(pick("HeroTitle", "title")) } : {}),
        ...(pick("HeroSubtitle", "subtitle") ? { subtitle: val(pick("HeroSubtitle", "subtitle")) } : {}),
        ...(pick("HeroImage", "backgroundImage") ? { backgroundImage: val(pick("HeroImage", "backgroundImage")) } : {}),
      };
    }
    if (!d.about && (has("AboutTitle") || has("AboutText") || has("AboutImage") || has("text") || has("image"))) {
      d.about = {
        ...(pick("AboutTitle") ? { title: val("AboutTitle") } : {}),
        ...(pick("AboutText", "text") ? { text: val(pick("AboutText", "text")) } : {}),
        ...(pick("AboutImage", "image") ? { image: val(pick("AboutImage", "image")) } : {}),
      };
    }
  }

  if (section === "spasticity") {
    if (d.about && d.about.text && !d.about.description) {
      d.about = { ...d.about, description: d.about.text };
      delete d.about.text;
    }
    if (d.innovation && d.innovation.bullets && !d.innovation.items) {
      d.innovation = {
        title: d.innovation.title,
        items: d.innovation.bullets.map((b) => ({ name: b, description: "" })),
      };
    }
    if (d.whoItHelps && d.whoItHelps.groups && !d.whoItHelps.people) {
      d.whoItHelps = {
        title: d.whoItHelps.title,
        people: d.whoItHelps.groups.map((g) => ({ name: g, role: "" })),
      };
    }
    if (d.press && d.press.items && !d.press.articles) {
      d.press = {
        title: d.press.title,
        articles: d.press.items.map((it) => ({ headline: it.title || it.headline || "", link: it.link || "" })),
      };
    }
  }

  return d;
};

const router = express.Router();

// ✅ GET content by section
router.get("/:section", async (req, res) => {
  try {
    const section = req.params.section;
    const content = await Content.findOne({ section });
    if (!content) {
      return res.status(404).json({ message: "Section not found" });
    }
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    const normalized = {
      ...content.toObject(),
      data: normalizeSectionData(section, content.data),
    };
    res.json(normalized);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ PUT update (create if missing)
router.put("/:section", verifyToken, async (req, res) => {
  try {
    const section = req.params.section;
    const dataRaw = req.body?.data && typeof req.body.data === "object" ? req.body.data : req.body;
    const data = normalizeSectionData(section, dataRaw);
    const updated = await Content.findOneAndUpdate(
      { section },
      { section, data },
      { new: true, upsert: true }
    );
    res.json({ section: updated.section, data: updated.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
