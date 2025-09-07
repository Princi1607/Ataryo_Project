import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Trash2, Edit3, Image as ImageIcon, Type, Plus, Minus } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { content, updateContent, uploadImage, loading, error } = useContentStore();
  const [activeTab, setActiveTab] = useState('hero');
  const [editingContent, setEditingContent] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (content) {
      setEditingContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      await updateContent(section, editingContent[section]);
      alert('Content saved successfully!');
    } catch (error) {
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (section: string, field: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploadingImage(true);
      try {
        const imageUrl = await uploadImage(file);
        setEditingContent((prev: any) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: imageUrl
          }
        }));
      } catch (error) {
        alert('Failed to upload image');
      } finally {
        setUploadingImage(false);
      }
    };
    input.click();
  };

  const handleTextChange = (section: string, field: string, value: string) => {
    setEditingContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section: string, arrayField: string, index: number, field: string, value: string) => {
    setEditingContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: prev[section][arrayField].map((item: any, i: number) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const addArrayItem = (section: string, arrayField: string, template: any) => {
    setEditingContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: [...(prev[section][arrayField] || []), template]
      }
    }));
  };

  const removeArrayItem = (section: string, arrayField: string, index: number) => {
    setEditingContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: prev[section][arrayField].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: ImageIcon },
    { id: 'about', name: 'About Us', icon: Type },
    { id: 'whyAtaryo', name: 'Why Ataryo', icon: Edit3 },
    { id: 'products', name: 'Products', icon: Edit3 },
    { id: 'sustainability', name: 'Sustainability', icon: Edit3 },
    { id: 'partnerships', name: 'Partnerships', icon: Edit3 },
    { id: 'research', name: 'Research', icon: Edit3 },
    { id: 'press', name: 'Press', icon: Edit3 },
    { id: 'team', name: 'Team', icon: Edit3 },
    { id: 'investors', name: 'Investors', icon: Edit3 },
    { id: 'contact', name: 'Contact', icon: Edit3 }
  ];

  if (!editingContent || Object.keys(editingContent).length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#0A5737]">Content Management System</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(95vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-4 border-r overflow-y-auto">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center space-x-3 ${
                    activeTab === section.id ? 'bg-[#0A5737] text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Hero Section */}
            {activeTab === 'hero' && editingContent.hero && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Hero Section</h3>
                  <button
                    onClick={() => handleSave('hero')}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#0A5737] text-white px-4 py-2 rounded-md hover:bg-[#067141] transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.hero.title || ''}
                      onChange={(e) => handleTextChange('hero', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingContent.hero.subtitle || ''}
                      onChange={(e) => handleTextChange('hero', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingContent.hero.description || ''}
                      onChange={(e) => handleTextChange('hero', 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CTA Button 1 Text</label>
                    <input
                      type="text"
                      value={editingContent.hero.ctaText1 || ''}
                      onChange={(e) => handleTextChange('hero', 'ctaText1', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CTA Button 2 Text</label>
                    <input
                      type="text"
                      value={editingContent.hero.ctaText2 || ''}
                      onChange={(e) => handleTextChange('hero', 'ctaText2', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Background Image</label>
                    <div className="flex items-center space-x-4">
                      {editingContent.hero.backgroundImage && (
                        <img
                          src={editingContent.hero.backgroundImage}
                          alt="Background"
                          className="w-32 h-20 object-cover rounded-md"
                        />
                      )}
                      <button
                        onClick={() => handleImageUpload('hero', 'backgroundImage')}
                        disabled={uploadingImage}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {activeTab === 'about' && editingContent.about && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">About Section</h3>
                  <button
                    onClick={() => handleSave('about')}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#0A5737] text-white px-4 py-2 rounded-md hover:bg-[#067141] transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.about.title || ''}
                      onChange={(e) => handleTextChange('about', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description 1</label>
                    <textarea
                      value={editingContent.about.description1 || ''}
                      onChange={(e) => handleTextChange('about', 'description1', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description 2</label>
                    <textarea
                      value={editingContent.about.description2 || ''}
                      onChange={(e) => handleTextChange('about', 'description2', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Mission</label>
                      <textarea
                        value={editingContent.about.mission || ''}
                        onChange={(e) => handleTextChange('about', 'mission', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Vision</label>
                      <textarea
                        value={editingContent.about.vision || ''}
                        onChange={(e) => handleTextChange('about', 'vision', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Stat Value</label>
                      <input
                        type="text"
                        value={editingContent.about.statValue || ''}
                        onChange={(e) => handleTextChange('about', 'statValue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Stat Label</label>
                      <input
                        type="text"
                        value={editingContent.about.statLabel || ''}
                        onChange={(e) => handleTextChange('about', 'statLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Section Image</label>
                    <div className="flex items-center space-x-4">
                      {editingContent.about.image && (
                        <img
                          src={editingContent.about.image}
                          alt="About"
                          className="w-32 h-20 object-cover rounded-md"
                        />
                      )}
                      <button
                        onClick={() => handleImageUpload('about', 'image')}
                        disabled={uploadingImage}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Section */}
            {activeTab === 'products' && editingContent.products && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Products Section</h3>
                  <button
                    onClick={() => handleSave('products')}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#0A5737] text-white px-4 py-2 rounded-md hover:bg-[#067141] transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.products.title || ''}
                      onChange={(e) => handleTextChange('products', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingContent.products.subtitle || ''}
                      onChange={(e) => handleTextChange('products', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium">Applications</label>
                      <button
                        onClick={() => addArrayItem('products', 'applications', { title: '', description: '', icon: 'Shirt' })}
                        className="flex items-center space-x-1 text-[#0A5737] hover:text-[#067141]"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Application</span>
                      </button>
                    </div>

                    {editingContent.products.applications?.map((app: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Application {index + 1}</h4>
                          <button
                            onClick={() => removeArrayItem('products', 'applications', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                              type="text"
                              value={app.title || ''}
                              onChange={(e) => handleArrayItemChange('products', 'applications', index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Icon</label>
                            <select
                              value={app.icon || 'Shirt'}
                              onChange={(e) => handleArrayItemChange('products', 'applications', index, 'icon', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                            >
                              <option value="Shirt">Shirt</option>
                              <option value="Heart">Heart</option>
                              <option value="Home">Home</option>
                              <option value="Zap">Zap</option>
                              <option value="Car">Car</option>
                              <option value="Factory">Factory</option>
                              <option value="Crown">Crown</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                              value={app.description || ''}
                              onChange={(e) => handleArrayItemChange('products', 'applications', index, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">CTA Title</label>
                      <input
                        type="text"
                        value={editingContent.products.ctaTitle || ''}
                        onChange={(e) => handleTextChange('products', 'ctaTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">CTA Description</label>
                      <textarea
                        value={editingContent.products.ctaDescription || ''}
                        onChange={(e) => handleTextChange('products', 'ctaDescription', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={editingContent.products.ctaText || ''}
                        onChange={(e) => handleTextChange('products', 'ctaText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeTab === 'contact' && editingContent.contact && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Contact Section</h3>
                  <button
                    onClick={() => handleSave('contact')}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#0A5737] text-white px-4 py-2 rounded-md hover:bg-[#067141] transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.contact.title || ''}
                      onChange={(e) => handleTextChange('contact', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingContent.contact.subtitle || ''}
                      onChange={(e) => handleTextChange('contact', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingContent.contact.description || ''}
                      onChange={(e) => handleTextChange('contact', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={editingContent.contact.email || ''}
                      onChange={(e) => handleTextChange('contact', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editingContent.contact.phone || ''}
                      onChange={(e) => handleTextChange('contact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <textarea
                      value={editingContent.contact.address || ''}
                      onChange={(e) => handleTextChange('contact', 'address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5737]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other sections */}
            {!['hero', 'about', 'products', 'contact'].includes(activeTab) && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">
                  {sections.find(s => s.id === activeTab)?.name} Section
                </h3>
                <p className="text-gray-600 mb-4">
                  This section editor is coming soon. For now, you can edit the basic sections.
                </p>
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                  Advanced editing for this section will be available in the next update.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;