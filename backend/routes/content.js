import express from 'express';
import { Content } from '../models/Content.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all content (public)
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    
    if (!content) {
      // Create default content if none exists
      content = new Content({
        hero: {
          title: 'Reclaiming Nature.',
          subtitle: 'Reinventing Textiles.',
          description: 'From forestry waste to future-ready fibers — Ataryo transforms natural by-products of tree residues and forestry waste into sustainable, high-performance textiles for a regenerative tomorrow.',
          backgroundImage: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
          ctaText1: 'Explore Textiles',
          ctaText2: 'Partner With Us'
        },
        about: {
          title: 'About Us',
          description1: 'Ataryo is pioneering a new era of sustainable textiles.',
          description2: 'By transforming forestry by-products into premium fibers.',
          mission: 'Transforming tree residues and forestry waste into sustainable textile.',
          vision: 'A future where every textile is circular, responsible, and regenerative.',
          image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
          statValue: '100%',
          statLabel: 'Waste-to-Value'
        },
        contact: {
          title: 'Contact Us',
          subtitle: 'Ready to transform your textile needs?',
          description: 'Get in touch with our team.',
          email: 'hello@ataryo.com',
          phone: '+1 (555) 123-4567',
          address: '123 Sustainability Street, Green City, GC 12345',
          socialLinks: {}
        }
      });
      await content.save();
    }
    
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content (admin only)
router.put('/', auth, async (req, res) => {
  try {
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content(req.body);
    } else {
      // Update existing content
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          content[key] = req.body[key];
        }
      });
    }
    
    await content.save();
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific section
router.put('/:section', auth, async (req, res) => {
  try {
    const { section } = req.params;
    let content = await Content.findOne();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    content[section] = { ...content[section], ...req.body };
    await content.save();
    
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
