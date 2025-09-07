import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface ContentState {
  content: any;
  loading: boolean;
  error: string | null;
  token: string | null;
  isAuthenticated: boolean;
  fetchContent: () => Promise<void>;
  updateContent: (section: string, data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  uploadImage: (file: File) => Promise<string>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  content: null,
  loading: false,
  error: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),

  fetchContent: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/content`);
      set({ content: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch content', loading: false });
    }
  },

  updateContent: async (section: string, data: any) => {
    const { token } = get();
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await axios.put(
        `${API_BASE_URL}/content/${section}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      set({ content: response.data });
      return response.data;
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update content' });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      set({ token, isAuthenticated: true, error: null });
      return true;
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    set({ token: null, isAuthenticated: false });
  },

  uploadImage: async (file: File) => {
    const { token } = get();
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/upload/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.url;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Upload failed');
    }
  }
}));
