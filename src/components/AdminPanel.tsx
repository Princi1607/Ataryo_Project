import React, { useState } from 'react';
import { X, Upload, Trash2, Save } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('images');
  const [images, setImages] = useState([
    { id: 1, name: 'Hero Background', url: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg', section: 'hero' },
    { id: 2, name: 'About Image', url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg', section: 'about' },
    { id: 3, name: 'Sustainability Image', url: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg', section: 'sustainability' }
  ]);

  const [colors, setColors] = useState({
    primary: '#0A5737',
    secondary: '#067141',
    accent1: '#118949',
    accent2: '#00A651',
    accent3: '#85B642',
    accent4: '#A6CE39'
  });

  const handleImageUpload = (section: string) => {
    const url = prompt('Enter image URL:');
    if (url) {
      const newImage = {
        id: Date.now(),
        name: `${section} Image`,
        url,
        section
      };
      setImages([...images, newImage]);
    }
  };

  const handleImageDelete = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleColorChange = (colorKey: string, value: string) => {
    setColors({ ...colors, [colorKey]: value });
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    alert('Changes saved successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#0A5737]">Admin Panel</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-4 border-r">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('images')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'images' ? 'bg-[#0A5737] text-white' : 'hover:bg-gray-200'
                }`}
              >
                Manage Images
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'colors' ? 'bg-[#0A5737] text-white' : 'hover:bg-gray-200'
                }`}
              >
                Color Scheme
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {activeTab === 'images' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Manage Images</h3>
                  <button
                    onClick={() => handleImageUpload('new')}
                    className="flex items-center space-x-2 bg-[#0A5737] text-white px-4 py-2 rounded-md hover:bg-[#067141] transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="border rounded-lg p-4">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{image.name}</h4>
                          <p className="text-sm text-gray-500">{image.section}</p>
                        </div>
                        <button
                          onClick={() => handleImageDelete(image.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Color Scheme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-12 h-10 rounded-md border border-gray-300"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-[#0A5737] text-white px-6 py-2 rounded-md hover:bg-[#067141] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;