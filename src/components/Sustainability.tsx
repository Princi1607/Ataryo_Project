import React from 'react';
import { Recycle, RotateCcw, BarChart3, ArrowRight } from 'lucide-react';

const Sustainability: React.FC = () => {
  const impacts = [
    {
      icon: Recycle,
      title: 'Waste-to-Value',
      description: 'Tree residues & forestry waste given a second life as premium textiles.',
      stat: '95%',
      statLabel: 'Waste Reduction'
    },
    {
      icon: RotateCcw,
      title: 'Circular Design',
      description: 'Fabrics engineered for recyclability and safe biodegradation.',
      stat: '100%',
      statLabel: 'Biodegradable'
    },
    {
      icon: BarChart3,
      title: 'Measured Impact',
      description: 'Carbon and water footprint reporting for every textile innovation.',
      stat: '70%',
      statLabel: 'Carbon Reduction'
    }
  ];

  return (
    <section id="sustainability" className="py-20 bg-gradient-to-br from-[#0A5737] to-[#067141] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sustainability & Impact
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            We don't just produce textiles — we design a better future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Sustainable forest management"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Impact Cards */}
          <div className="space-y-6">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <impact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{impact.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#A6CE39]">{impact.stat}</div>
                        <div className="text-sm opacity-80">{impact.statLabel}</div>
                      </div>
                    </div>
                    <p className="opacity-90 leading-relaxed">{impact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-[#A6CE39] text-[#0A5737] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#85B642] transition-colors inline-flex items-center space-x-2 group">
            <span>See Our Impact</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;