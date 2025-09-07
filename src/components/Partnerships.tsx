import React from 'react';
import { Building, Guitar as Hospital, Palette, ArrowRight } from 'lucide-react';

const Partnerships: React.FC = () => {
  const partnerTypes = [
    {
      icon: Building,
      title: 'Fashion Brands',
      description: 'Add sustainability and story-driven value to collections.',
      benefits: ['Sustainable sourcing', 'Brand differentiation', 'Consumer appeal']
    },
    {
      icon: Hospital,
      title: 'Healthcare Providers',
      description: 'Safer, cleaner, and eco-friendly medical textiles.',
      benefits: ['Hypoallergenic properties', 'Antimicrobial features', 'Patient safety']
    },
    {
      icon: Palette,
      title: 'Designers & Startups',
      description: 'Innovate with us on new materials and applications.',
      benefits: ['Custom solutions', 'R&D support', 'Market access']
    }
  ];

  return (
    <section id="partnerships" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            Partnerships & Collaborations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're creating a new category of textiles — and we believe in doing it together    by princi and chakri.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((partner, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A5737] to-[#067141] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <partner.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0A5737] mb-4 group-hover:text-[#067141] transition-colors">
                {partner.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {partner.description}
              </p>

              <ul className="space-y-2">
                {partner.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-[#A6CE39] rounded-full"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="bg-gradient-to-r from-[#118949] to-[#00A651] rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Partner with Ataryo?</h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join us in revolutionizing the textile industry with sustainable, innovative solutions.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-[#118949] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 group"
          >
            <span>Partner With Ataryo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;