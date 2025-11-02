import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useContentStore } from "../../store/contentStore";
import AdminEditor from "./AdminEditor";

interface Props {
  page: string;
  onClose: () => void;
}

const EditModal: React.FC<Props> = ({ page, onClose }) => {
  const { content, fetchContent, updateContent } = useContentStore();
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent(page);
  }, [fetchContent, page]);

  useEffect(() => {
    if (content && content[page]) {
      setFormData(content[page]);
    }
  }, [content, page]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent(page, formData);
      alert("Content updated successfully!");
      onClose();
    } catch (error) {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Editing: {page.toUpperCase()}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✖
          </button>
        </div>

        <AdminEditor formData={formData} setFormData={setFormData} />

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditModal;
