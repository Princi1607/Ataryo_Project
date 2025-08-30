import React from 'react';
import { Microscope, Users, Shield, ArrowRight } from 'lucide-react';

const Research: React.FC = () => {
  const innovations = [
    {
      icon: Users,
      title: 'Academic Collaborations',
      description: 'Partnerships with leading universities, labs, and material scientists.'
    },
    {
      icon: Microscope,
      title: 'Fiber Engineering',
      description: 'Advanced research for enhanced durability, wash-fastness, and comfort.'
    },
    {
      icon: Shield,
      title: 'Functional Textiles',
      description: 'Developing antimicrobial, fire-retardant, and hypoallergenic properties.'
    }
  ];

  return (
    <section id="research" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            Research & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Innovation drives everything we do.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Innovation Cards */}
          <div className="space-y-6">
            {innovations.map((innovation, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#0A5737]/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A5737] to-[#067141] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <innovation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A5737] mb-2 group-hover:text-[#067141] transition-colors">
                      {innovation.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {innovation.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Research and innovation lab"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A5737]/40 to-transparent"></div>
            </div>
            
            {/* Floating Innovation Badge */}
            <div className="absolute -top-6 -left-6 bg-[#A6CE39] text-[#0A5737] p-4 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm font-medium">Research Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-[#0A5737] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#067141] transition-colors inline-flex items-center space-x-2 group">
            <span>Collaborate With Us</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Research;