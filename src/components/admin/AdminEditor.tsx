import React, { useEffect, useMemo, useState } from "react";
import { useContentStore } from "../../store/contentStore";

const IMAGE_KEY_REGEX = /(image|img|logo|photo|banner|thumbnail|heroImage)/i;

// Fixed templates: fields exist but content is editable; no deletes
const FIXED_TEMPLATES: Record<string, any> = {
  home: {
    navbar: {
      title: "",
      showTextile: false,
      showSpasticity: false,
      links: [
        { label: "", href: "", internal: "" },
        { label: "", href: "", internal: "" },
      ],
    },
    hero: {
      title: "",
      subtitle: "",
      description: "",
      backgroundImage: "",
      ctaText1: "",
      ctaText2: "",
    },
    about: { title: "", vision: "", mission: "", statement: "", image: "" },
    coreValues: {
      title: "",
      values: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
    },

    whyWeExist: {
      title: "",
      description: "",
      highlights: ["", "", ""],
      image: "",
    },
    partnershipsAndInvestors: {
    partnership: {
      title: "",
      description:
        "",
    },
    investment: {
      title: "",
      description:
        "",
    },
  },

    team: {
      title: "",
       description: "",
      members: [
        {
          name: "",
          role: "",
          image: "",
          linkedin: "",
          website: "",
        },
        {
          name: "",
          role: "",
          image: "",
          linkedin: "",
          website: "",
        },
        
      ],
    },
   footer: {
  companyName: "Ataryo Labs",
  logo: "/images/logo-light.svg",
  contactEmail: "contact@ataryo.com",
  address: "Registered Office: Hyderabad, India",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
},

  },
  textile: {
    navbar: {
      title: "",
      showTextile: false,
      showSpasticity: false,
      links: [{ label: "", href: "", internal: "" }],
    },
    hero: { title: "", subtitle: "", backgroundImage: "" },
    about: { title: "", text: "", image: "" },
    products: { title: "", items: [{ title: "", desc: "", image: "" }] },
    sustainability: { title: "", points: ["", "", ""], ctaText: "" },
    research: { title: "", items: [{ title: "", description: "" }] },
    press: { title: "", items: [{ title: "", link: "" }] },
   footer: {
  companyName: "Ataryo Labs",
  logo: "/images/logo-light.svg",
  contactEmail: "contact@ataryo.com",
  address: "Registered Office: Hyderabad, India",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
}
  },
  spasticity: {
    navbar: {
      title: "",
      showTextile: false,
      showSpasticity: false,
      links: [{ label: "", href: "", internal: "" }],
    },
    hero: { title: "", subtitle: "", backgroundImage: "" },
    about: { title: "", description: "", image: "" },
    innovation: { title: "", items: [{ name: "", description: "" }] },
    whoItHelps: { title: "", people: [{ name: "", role: "" }] },
    research: { title: "", items: [{ title: "", description: "" }] },
    press: { title: "", articles: [{ headline: "", link: "" }] },
    ffooter: {
  companyName: "Ataryo Labs",
  logo: "/images/logo-light.svg",
  contactEmail: "contact@ataryo.com",
  address: "Registered Office: Hyderabad, India",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
}
  },
};

const AdminEditor = ({ section }: { section: string }) => {
  const { content, fetchContent, updateContent, uploadImage } =
    useContentStore();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        await fetchContent(section);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [section, fetchContent]);

  const sectionData = useMemo(() => {
    return (content as any)?.[section] || {};
  }, [content, section]);

  useEffect(() => {
    setFormData(sectionData);
  }, [sectionData]);

  const addTopLevelGroup = (groupKey: string) => {
    setFormData((prev) => ({ ...(prev || {}), [groupKey]: {} }));
  };

  const addArrayItem = (path: string[]) => {
    setFormData((prev) => {
      const current = prev || {};
      const arr =
        path.reduce((acc: any, key) => (acc ? acc[key] : undefined), current) ||
        [];
      const nextArr = [...arr, {}];
      return setByPath(current, path, nextArr);
    });
  };

  const addObjectField = (path: string[]) => {
    const key = `field_${Date.now()}`;
    setFormData((prev) => {
      const current = prev || {};
      const obj =
        path.reduce((acc: any, k) => (acc ? acc[k] : undefined), current) || {};
      const nextObj = { ...obj, [key]: "" };
      return setByPath(current, path, nextObj);
    });
  };

  const addKeysToObject = (path: string[], keys: string[]) => {
    setFormData((prev) => {
      const current = prev || {};
      const obj =
        path.reduce((acc: any, k) => (acc ? acc[k] : undefined), current) || {};
      const nextObj = { ...obj } as any;
      keys.forEach((k) => {
        if (nextObj[k] === undefined) nextObj[k] = "";
      });
      return setByPath(current, path, nextObj);
    });
  };

  const ensurePath = (base: any, path: string[], terminalDefault: any) => {
    const clone = { ...(base || {}) };
    let node: any = clone;
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      const isLast = i === path.length - 1;
      if (node[key] == null) node[key] = isLast ? terminalDefault : {};
      node = node[key];
    }
    return clone;
  };

  const addNavbarGroup = () => {
    setFormData((prev) => ensurePath(prev, ["navbar"], {}));
  };

  const addNavbarLink = () => {
    setFormData((prev) => {
      const withNavbar = ensurePath(prev, ["navbar"], {});
      const withLinks = ensurePath(withNavbar, ["navbar", "links"], []);
      const links = (withLinks as any).navbar.links || [];
      const nextLinks = [...links, {}];
      return setByPath(withLinks, ["navbar", "links"], nextLinks);
    });
  };

  const setByPath = (obj: any, path: string[], value: any) => {
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };
    let cursor: any = clone;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      const isNextIndex = Number.isInteger(Number(path[i + 1]));
      const nextVal = cursor[key];
      if (nextVal == null) cursor[key] = isNextIndex ? [] : {};
      cursor = cursor[key];
    }
    cursor[path[path.length - 1]] = value;
    return clone;
  };

  const handleChange = (path: string[], value: any) => {
    setFormData((prev) => setByPath(prev, path, value));
  };

  const handleFileChange = async (path: string[], file: File | null) => {
    if (!file) return;
    try {
      setMessage("Uploading image...");
      const url = await uploadImage(file);
      handleChange(path, url);
      setMessage("✅ Image uploaded");
    } catch (e: any) {
      setMessage("❌ Image upload failed");
    }
  };

  const labelize = (key: string) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

  const mergeWithTemplate = (template: any, data: any): any => {
    if (Array.isArray(template)) {
      const length =
        Math.max(template.length, Array.isArray(data) ? data.length : 0) ||
        template.length ||
        1;
      const baseItem = template[0] ?? "";
      return Array.from({ length }).map((_, i) =>
        mergeWithTemplate(baseItem, data?.[i])
      );
    }
    if (template && typeof template === "object") {
      const result: any = {};
      Object.keys(template).forEach((k) => {
        result[k] = mergeWithTemplate(template[k], data?.[k]);
      });
      return result;
    }
    return data ?? template ?? "";
  };

  const deleteAtPath = (obj: any, path: string[]) => {
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };
    if (path.length === 0) return clone;
    const parentPath = path.slice(0, -1);
    const key = path[path.length - 1];
    let cursor: any = clone;
    for (let i = 0; i < parentPath.length; i++) {
      cursor = cursor[parentPath[i]];
      if (cursor == null) return clone;
    }
    if (Array.isArray(cursor)) {
      const idx = Number(key);
      if (!Number.isNaN(idx)) cursor.splice(idx, 1);
    } else if (typeof cursor === "object") {
      delete cursor[key as any];
    }
    return clone;
  };

  const removePath = (path: string[]) => {
    setFormData((prev) => deleteAtPath(prev, path));
  };

  const [newFieldNames, setNewFieldNames] = useState<Record<string, string>>(
    {}
  );

  const renderFields = (data: any, prefix: string[] = []) => {
    if (data == null) return null;
    if (typeof data !== "object") return null;

    return Object.entries(data).map(([key, value]) => {
      const path = [...prefix, key];
      const isImageKey = IMAGE_KEY_REGEX.test(key);

      if (value && typeof value === "object" && !Array.isArray(value)) {
        return (
          <div key={path.join(".")} className="mt-4 rounded-xl border bg-white">
            <div className="px-4 py-3 border-b">
              <h4 className="font-semibold text-gray-800">{labelize(key)}</h4>
            </div>
            <div className="p-4">{renderFields(value, path)}</div>
          </div>
        );
      }

      if (Array.isArray(value)) {
        const items = value as any[];
        return (
          <div key={path.join(".")} className="mt-4 rounded-xl border bg-white">
            <div className="px-4 py-3 border-b">
              <h4 className="font-semibold text-gray-800 capitalize">{key}</h4>
            </div>
            <div className="p-4">
              {items.map((item, idx) => {
                const itemPath = [...path, String(idx)];
                if (item && typeof item === "object") {
                  return (
                    <div
                      key={`${itemPath.join(".")}`}
                      className="mb-4 border rounded-lg p-3 bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">
                          Item {idx + 1}
                        </div>
                        <button
                          className="text-xs text-red-600"
                          onClick={() => removePath(itemPath)}
                        >
                          Remove item
                        </button>
                      </div>
                      {Object.entries(item).map(([childKey, childVal]) => (
                        <div
                          key={`${itemPath.join(".")}.${childKey}`}
                          className="mb-3"
                        >
                          <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                            {childKey}
                          </label>
                          <input
                            className="w-full border rounded-lg p-2"
                            value={String(childVal ?? "")}
                            onChange={(e) => {
                              const next = [...items];
                              next[idx] = { ...(next[idx] || {}) };
                              (next[idx] as any)[childKey] = e.target.value;
                              handleChange(path, next);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  );
                }
                return (
                  <div key={`${itemPath.join(".")}`} className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">
                      {labelize(key)} [{idx}]
                    </label>
                    <input
                      className="w-full border rounded-lg p-2"
                      value={String(item ?? "")}
                      onChange={(e) => {
                        const newArr = [...items];
                        newArr[idx] = e.target.value;
                        handleChange(path, newArr);
                      }}
                    />
                  </div>
                );
              })}
              <button
                className="text-sm text-blue-600"
                onClick={() => addArrayItem(path)}
              >
                + Add item
              </button>
            </div>
          </div>
        );
      }

      return (
        <div key={path.join(".")} className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labelize(key)}
          </label>
          {typeof value === "boolean" ? (
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleChange(path, e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                {Boolean(value) ? "On" : "Off"}
              </span>
            </label>
          ) : isImageKey ? (
            <div className="space-y-2">
              {typeof value === "string" && value && (
                <img
                  src={value}
                  alt={key}
                  className="h-28 rounded border object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(path, e.target.files?.[0] || null)
                }
                className="block"
              />
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Image URL"
                value={String(value ?? "")}
                onChange={(e) => handleChange(path, e.target.value)}
              />
            </div>
          ) : (
            <input
              className="w-full border rounded-lg p-2 text-gray-800"
              value={String(value ?? "")}
              onChange={(e) => handleChange(path, e.target.value)}
            />
          )}
        </div>
      );
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateContent(section, formData);
      await fetchContent(section);
      setMessage("✅ Saved successfully");
    } catch (e: any) {
      setMessage("❌ Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading section...</p>;
  const template = FIXED_TEMPLATES[section] || {};
  const displayData = mergeWithTemplate(template, formData);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {section} Section Editor
      </h2>
      {renderFields(displayData)}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    </div>
  );
};

export default AdminEditor;
