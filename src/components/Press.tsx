import React from 'react';
import { Newspaper, Award, TrendingUp, ExternalLink } from 'lucide-react';

const Press: React.FC = () => {
  const mediaItems = [
    {
      type: 'Award',
      title: 'Sustainable Innovation Award 2024',
      source: 'Green Tech Magazine',
      date: 'December 2024',
      description: 'Recognized for breakthrough in forestry waste textile conversion.'
    },
    {
      type: 'Feature',
      title: 'The Future of Sustainable Textiles',
      source: 'Fashion Forward Journal',
      date: 'November 2024',
      description: 'In-depth coverage of Ataryo\'s revolutionary approach to textile manufacturing.'
    },
    {
      type: 'Interview',
      title: 'CEO Spotlight: Transforming Waste into Wonder',
      source: 'Sustainability Today',
      date: 'October 2024',
      description: 'Exclusive interview discussing the vision behind Ataryo\'s innovative solutions.'
    }
  ];

  return (
    <section id="press" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A5737] mb-6">
            Press & Media
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Featured for sustainable innovation and next-gen materials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A5737] to-[#067141] rounded-lg flex items-center justify-center">
                  {item.type === 'Award' && <Award className="w-5 h-5 text-white" />}
                  {item.type === 'Feature' && <Newspaper className="w-5 h-5 text-white" />}
                  {item.type === 'Interview' && <TrendingUp className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <span className="text-xs font-medium text-[#00A651] bg-[#00A651]/10 px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#0A5737] mb-2 group-hover:text-[#067141] transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="font-medium">{item.source}</span>
                <span>{item.date}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {item.description}
              </p>

              <button className="flex items-center space-x-2 text-[#0A5737] hover:text-[#067141] transition-colors group">
                <span className="text-sm font-medium">Read More</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Media Coverage CTA */}
        <div className="text-center">
          <button className="bg-[#0A5737] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#067141] transition-colors inline-flex items-center space-x-2 group">
            <span>View Media Coverage</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Press;