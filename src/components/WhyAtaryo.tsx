import React from 'react';
import { Leaf, Zap, Globe, Handshake, CheckCircle } from 'lucide-react';

const WhyAtaryo: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Unique Source Material',
      description: 'Derived entirely from tree residues & forestry waste.',
      color: 'from-[#0A5737] to-[#067141]'
    },
    {
      icon: Zap,
      title: 'High-Performance',
      description: 'Engineered for strength, comfort, breathability, and versatility.',
      color: 'from-[#118949] to-[#00A651]'
    },
    {
      icon: Globe,
      title: 'Scalable Impact',
      description: 'Designed for industries from fashion, medical textile, upholstery and others.',
      color: 'from-[#00A651] to-[#85B642]'
    },
    {
      icon: Handshake,
      title: 'Trusted Partnerships',
      description: 'Working alongside brands, hospitals, OEMs, and mills.',
      color: 'from-[#85B642] to-[#A6CE39]'
    },
    {
      icon: CheckCircle,
      title: 'Certified & Transparent',
      description: 'Backed by globally recognized sustainability frameworks.',
      color: 'from-[#A6CE39] to-[#118949]'
    }
  ];

  return (
    <section id="why-ataryo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            Why Ataryo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes our sustainable textile solutions the choice for forward-thinking brands and industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0A5737] mb-4 group-hover:text-[#067141] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#0A5737] to-[#00A651] p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Textiles?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join the sustainable revolution and discover how Ataryo can elevate your products.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#0A5737] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Get Started Today</span>
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAtaryo;