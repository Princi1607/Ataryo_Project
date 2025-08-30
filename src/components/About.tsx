import React from 'react';
import { Target, Eye, Sparkles, Sprout } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6 leading-tight">
                About Us
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ataryo is pioneering a new era of sustainable textiles. Every year, millions of tonnes 
                of tree residuals, branches, bark, and foliage are discarded. We see them not as waste, 
                but as raw materials for innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By transforming forestry by-products into premium fibers, fabrics, and applications, 
                we are redefining what "sustainability" means for fashion, healthcare, interiors, 
                and industries worldwide.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A651] to-[#85B642] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A5737]">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Transforming tree residues and forestry waste into sustainable textile.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#118949] to-[#A6CE39] rounded-lg flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A5737]">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  A future where every textile is circular, responsible, and regenerative.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Sustainable textile innovation"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A5737]/30 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0A5737]">100%</div>
                <div className="text-sm text-gray-600">Waste-to-Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;