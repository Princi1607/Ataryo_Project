import React from 'react';
import { Shirt, Heart, Home, Zap, Car, Factory, Crown, ArrowRight } from 'lucide-react';

interface ProductsProps {
  content?: {
    title: string;
    subtitle: string;
    applications: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    ctaTitle: string;
    ctaDescription: string;
    ctaText: string;
  };
}

const Products: React.FC<ProductsProps> = ({ content }) => {
  const iconMap: { [key: string]: any } = {
    Shirt,
    Heart,
    Home,
    Zap,
    Car,
    Factory,
    Crown
  };

  const applications = content?.applications || [
    {
      icon: Shirt,
      title: 'Fashion & Lifestyle',
      description: 'Fabrics for everyday wear, luxury fashion, and accessories.',
      color: 'from-[#0A5737] to-[#067141]'
    },
    {
      icon: Heart,
      title: 'Medical & Healthcare',
      description: 'Hypoallergenic linens, antimicrobial textiles, and medical-grade fibers.',
      color: 'from-[#067141] to-[#118949]'
    },
    {
      icon: Home,
      title: 'Home & Interiors',
      description: 'Sustainable upholstery, curtains, and décor textiles.',
      color: 'from-[#118949] to-[#00A651]'
    },
    {
      icon: Zap,
      title: 'Sports & Outdoor',
      description: 'Performance-driven fabrics for activewear and adventure gear.',
      color: 'from-[#00A651] to-[#85B642]'
    },
    {
      icon: Car,
      title: 'Mobility & Automotive',
      description: 'Interiors, seat covers, and technical applications.',
      color: 'from-[#85B642] to-[#A6CE39]'
    },
    {
      icon: Factory,
      title: 'Industrial & Filtration',
      description: 'Nonwovens, geotextiles, and specialty composites.',
      color: 'from-[#A6CE39] to-[#0A5737]'
    },
    {
      icon: Crown,
      title: 'Luxury & Designer',
      description: 'Bespoke solutions for couture and high-end brands.',
      color: 'from-[#0A5737] to-[#00A651]'
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            {content?.title || 'Products & Applications'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.subtitle || 'Our solutions span industries and lifestyles, making sustainability accessible everywhere'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {applications.map((app, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br from-[#0A5737] to-[#067141] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {React.createElement(iconMap[app.icon] || Shirt, { className: "w-8 h-8 text-white" })}
              </div>
              
              <h3 className="text-xl font-bold text-[#0A5737] mb-4 group-hover:text-[#067141] transition-colors">
                {app.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {app.description}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="bg-gradient-to-r from-[#0A5737] to-[#00A651] rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">{content?.ctaTitle || 'Discover Our Collections'}</h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {content?.ctaDescription || 'Explore our comprehensive range of sustainable textiles designed for every industry and application.'}
          </p>
          <button className="bg-white text-[#0A5737] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 group">
            <span>{content?.ctaText || 'Discover Our Collections'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;