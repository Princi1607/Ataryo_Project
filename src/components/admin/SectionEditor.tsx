import React, { useEffect, useState } from "react";
import { useContentStore } from "../../store/contentStore";

interface SectionEditorProps {
  section: string;
  onClose: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, onClose }) => {
  const { content, fetchContent, updateContent } = useContentStore();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent(section);
  }, [fetchContent, section]);

  useEffect(() => {
    if (content && content[section]) {
      setFormData(content[section]);
    }
  }, [content, section]);

  const handleChange = (path: string[], value: string) => {
    setFormData((prev) => {
      const updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < path.length - 1; i++) {
        obj[path[i]] = obj[path[i]] || {};
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return updated;
    });
  };

  const renderFields = (data: any, prefix: string[] = []) => {
    return Object.entries(data).map(([key, value]) => {
      const path = [...prefix, key];

      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <div key={path.join(".")} className="border-l-2 pl-4 mt-3">
            <h4 className="font-semibold text-gray-700 capitalize mt-2">
              {key}
            </h4>
            {renderFields(value, path)}
          </div>
        );
      }

      return (
        <div key={path.join(".")} className="mb-3">
          <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
            {path[path.length - 1]}
          </label>
          <textarea
            className="w-full border rounded-lg p-2 text-gray-800"
            rows={2}
            value={value || ""}
            onChange={(e) => handleChange(path, e.target.value)}
          />
        </div>
      );
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateContent(section, formData);
      alert("✅ Section content updated successfully!");
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (!formData || Object.keys(formData).length === 0)
    return <p>Loading section...</p>;

  return (
    <div className="space-y-4">
      {renderFields(formData)}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default SectionEditor;
