import { create } from "zustand";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface ContentState {
  content: any;
  loading: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;

  fetchContent: (section: string) => Promise<void>;
  updateContent: (section: string, data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  uploadImage: (file: File) => Promise<string>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  content: {},
  loading: false,
  error: null,
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"),

  // ✅ Fetch content by section (e.g., "home", "textile", etc.)
  fetchContent: async (section: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/content/${section}`);
      // backend returns full doc; we want the nested data under the section key
      const sectionData = response.data?.data || {};
      set((state: any) => ({
        content: { ...(state.content || {}), [section]: sectionData },
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error fetching content:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch content",
        loading: false,
      });
    }
  },

  // ✅ Update a section (deep merge with backend + local state)
  updateContent: async (section: string, data: any) => {
    const { token, content } = get();
    if (!token) throw new Error("Not authenticated");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/content/${section}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedSection = response.data?.data || {};
      const updatedContent = {
        ...content,
        [section]: {
          ...(content?.[section] || {}),
          ...updatedSection,
        },
      };

      set({ content: updatedContent });
      return response.data;
    } catch (error: any) {
      console.error("Error updating content:", error);
      set({
        error: error.response?.data?.message || "Failed to update content",
      });
      throw error;
    }
  },

  // ✅ Admin Login
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      set({ token, isAuthenticated: true, error: null });
      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      set({ error: error.response?.data?.message || "Login failed" });
      return false;
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("adminToken");
    set({ token: null, isAuthenticated: false, error: null });
  },

  // ✅ Image Upload
  uploadImage: async (file: File) => {
    const { token } = get();
    if (!token) throw new Error("Not authenticated");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (error: any) {
      console.error("Image upload failed:", error);
      throw new Error(error.response?.data?.message || "Upload failed");
    }
  },
}));
