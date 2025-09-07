import React, { useState, useRef } from "react";
import {
  Upload,
  Trash2,
  Edit3,
  Eye,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";
import { useContentStore } from "../store/contentStore";

interface ImageManagerProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
  onClose?: () => void;
  title?: string;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  currentImage,
  onImageSelect,
  onClose,
  title = "Image Manager",
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useContentStore();

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      onImageSelect(imageUrl);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUrlInput = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim()) {
      // Basic URL validation
      try {
        new URL(url);
        onImageSelect(url.trim());
      } catch {
        alert("Please enter a valid URL");
      }
    }
  };

  const copyImageUrl = () => {
    if (currentImage) {
      navigator.clipboard.writeText(currentImage);
      alert("Image URL copied to clipboard!");
    }
  };

  const openImageInNewTab = () => {
    if (currentImage) {
      window.open(currentImage, "_blank");
    }
  };

  const previewImage = (url: string) => {
    setImagePreview(url);
    setShowPreview(true);
  };

  const removeCurrentImage = () => {
    if (confirm("Are you sure you want to remove this image?")) {
      onImageSelect("");
    }
  };

  // Predefined stock images for quick selection
  const stockImages = [
    {
      url: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      name: "Forest Landscape",
    },
    {
      url: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      name: "Sustainable Materials",
    },
    {
      url: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      name: "Green Technology",
    },
    {
      url: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      name: "Textile Production",
    },
    {
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      name: "Natural Fibers",
    },
    {
      url: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      name: "Eco-Friendly Process",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#0A5737]">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Current Image */}
          {currentImage && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Current Image</h3>
              <div className="relative group">
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => previewImage(currentImage)}
                      className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copyImageUrl}
                      className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={openImageInNewTab}
                      className="bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={removeCurrentImage}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 break-all">
                {currentImage}
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Upload New Image</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-[#0A5737] bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A5737] mb-4"></div>
                  <p className="text-gray-600">Uploading image...</p>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag and drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports: JPG, PNG, GIF, WebP (Max 10MB)
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#0A5737] text-white px-6 py-2 rounded-md hover:bg-[#067141] transition-colors"
                    >
                      Select File
                    </button>
                    <button
                      onClick={handleUrlInput}
                      className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Use URL
                    </button>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Stock Images */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stock Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stockImages.map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:border-[#0A5737] transition-colors"
                    onClick={() => onImageSelect(image.url)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          previewImage(image.url);
                        }}
                        className="bg-white text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onImageSelect(image.url);
                        }}
                        className="bg-[#0A5737] text-white p-1 rounded-full hover:bg-[#067141] transition-colors"
                        title="Select"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    {image.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
        {showPreview && imagePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="relative max-w-4xl max-h-4xl">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 bg-white text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManager;
