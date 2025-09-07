import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    ctaText1: { type: String, required: true },
    ctaText2: { type: String, required: true }
  },
  about: {
    title: { type: String, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    image: { type: String, required: true },
    statValue: { type: String, required: true },
    statLabel: { type: String, required: true }
  },
  whyAtaryo: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    reasons: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true }
    }]
  },
  products: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    applications: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true }
    }],
    ctaTitle: { type: String, required: true },
    ctaDescription: { type: String, required: true },
    ctaText: { type: String, required: true }
  },
  sustainability: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    impacts: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true },
      value: { type: String, required: true },
      label: { type: String, required: true }
    }]
  },
  partnerships: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    partnerTypes: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      benefits: [{ type: String }],
      icon: { type: String, required: true }
    }],
    ctaTitle: { type: String, required: true },
    ctaDescription: { type: String, required: true },
    ctaText: { type: String, required: true }
  },
  research: {
    title: { type: String, default: 'Research & Innovation' },
    subtitle: { type: String, default: 'Pioneering the future of sustainable textiles' },
    description: { type: String, default: 'Our research initiatives drive breakthrough innovations in sustainable textile technology.' },
    innovations: [{
      title: { type: String },
      description: { type: String },
      icon: { type: String }
    }]
  },
  press: {
    title: { type: String, default: 'Press & Media' },
    subtitle: { type: String, default: 'Latest news and coverage' },
    articles: [{
      title: { type: String },
      description: { type: String },
      date: { type: String },
      source: { type: String },
      link: { type: String }
    }]
  },
  team: {
    title: { type: String, default: 'Team & Leadership' },
    subtitle: { type: String, default: 'Meet the innovators behind Ataryo' },
    members: [{
      name: { type: String },
      position: { type: String },
      bio: { type: String },
      image: { type: String },
      linkedin: { type: String }
    }]
  },
  investors: {
    title: { type: String, default: 'Investors & Partnerships' },
    subtitle: { type: String, default: 'Building the future together' },
    description: { type: String, default: 'We partner with forward-thinking investors and organizations.' },
    investors: [{
      name: { type: String },
      logo: { type: String },
      description: { type: String }
    }]
  },
  contact: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String }
    }
  },
  footer: {
    companyDescription: { type: String, default: 'Transforming forestry waste into sustainable textiles for a regenerative future.' },
    quickLinks: [{
      name: { type: String },
      href: { type: String }
    }],
    legalLinks: [{
      name: { type: String },
      href: { type: String }
    }]
  }
}, {
  timestamps: true
});

export const Content = mongoose.model('Content', ContentSchema);
