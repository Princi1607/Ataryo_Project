import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-br from-[#0A5737] to-[#067141] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Team & Leadership
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Ataryo is led by a team of scientists, innovators, and sustainability pioneers 
            united by one goal: to transform waste into value.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Team Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Ataryo team collaboration"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Team Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Our Leadership</h3>
                  <p className="opacity-90">Driving innovation and sustainability</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Scientists & Researchers</span>
                  <span className="text-[#A6CE39] font-bold">15+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Industry Experts</span>
                  <span className="text-[#A6CE39] font-bold">8+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Sustainability Pioneers</span>
                  <span className="text-[#A6CE39] font-bold">12+</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-[#A6CE39] text-[#0A5737] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#85B642] transition-colors inline-flex items-center space-x-2 group">
                <span>Meet Our Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;