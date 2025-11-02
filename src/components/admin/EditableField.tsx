import React, { useState } from "react";
import { useContentStore } from "../../store/contentStore";

interface EditableFieldProps {
  label: string;
  value: string;
  section: string;
  field: string;
  editable?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  section,
  field,
  editable = false,
}) => {
  const { updateContent } = useContentStore();
  const [currentValue, setCurrentValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    try {
      await updateContent(section, { [field]: currentValue });
      setEditing(false);
    } catch (err) {
      alert("Failed to save changes");
    }
  };

  if (!editable) return <h2 className="text-3xl font-bold">{value}</h2>;

  return (
    <div className="my-3">
      {editing ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="border p-2 rounded w-80"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <h2
          className="text-3xl font-bold cursor-pointer hover:underline"
          onClick={() => setEditing(true)}
        >
          {value}
        </h2>
      )}
    </div>
  );
};

export default EditableField;
