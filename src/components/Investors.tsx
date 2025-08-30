import React from 'react';
import { TrendingUp, Building2, Users, ArrowRight } from 'lucide-react';

const Investors: React.FC = () => {
  const highlights = [
    {
      icon: TrendingUp,
      title: 'Impact-Driven Investment',
      description: 'Backed by investors committed to sustainable innovation and environmental impact.'
    },
    {
      icon: Building2,
      title: 'Strategic Collaborations',
      description: 'Partnerships with universities, mills, and R&D centers for accelerated growth.'
    },
    {
      icon: Users,
      title: 'Co-Development Opportunities',
      description: 'Open to new partnerships and collaborative development initiatives.'
    }
  ];

  return (
    <section id="investors" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            Investors & Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ataryo is building the future of sustainable textiles with the support of global partners.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0A5737] to-[#067141] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <highlight.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0A5737] mb-4 group-hover:text-[#067141] transition-colors">
                {highlight.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Investment Opportunity */}
        <div className="bg-gradient-to-r from-[#0A5737] to-[#00A651] rounded-2xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Investment Opportunity</h3>
              <p className="text-lg mb-6 opacity-90">
                Join us in scaling sustainable textile innovation and creating positive environmental impact 
                while building a profitable, future-ready business.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A6CE39] rounded-full"></div>
                  <span>Proven technology and market validation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A6CE39] rounded-full"></div>
                  <span>Strong partnerships and industry relationships</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A6CE39] rounded-full"></div>
                  <span>Scalable business model with global potential</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center lg:text-right">
              <button className="bg-white text-[#0A5737] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 group">
                <span>Investor Relations</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investors;