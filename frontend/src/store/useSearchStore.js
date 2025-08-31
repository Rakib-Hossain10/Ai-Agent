import {axiosInstance} from "../lib/axios";
import { create } from "zustand";

export const useSearchStore = create((set, get) => ({
  query: "",
  results: [],
  isOpen: false,
  isLoading: false,
  error: null,

  setQuery: (q) => set({ query: q }),
  clear: () => set({ query: "", results: [], isOpen: false, isLoading: false, error: null }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),


  search: async (q) => {
    const trimmed = (q || "").trim();
    if (!trimmed) return set({ results: [], isOpen: false, isLoading: false });

    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/search`, { params: { q: trimmed } });
      const data = res.data; // expected: [{id, title, subtitle}, ...]
      set({ results: data, isOpen: true });
    } catch (e) {
      set({ error: e?.message || "Search failed" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
