import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
  messages: [],
  characters: [],
  selectedCharacter: null,
  isCharactersLoading: false,
  isMessagesLoading: false,

  getCharacter: async () => {
    set({ isCharactersLoading: true });
    try {
      const res = await axiosInstance.get("/characters");
      set({ characters: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isCharactersLoading: false });
    }
  },

  getMessages: async (characterId) => {
    const { selectedCharacter } = get();
    set({ isMessagesLoading: true });
    try {
        // my real API call
        const id = characterId || get().selectedCharacter?._id || get().selectedCharacter?.id;
        const res = await axiosInstance.get(`/messages/${id}`);
         set({ messages: res.data });
      } catch (e) {
      console.error(e);
    } finally {
      set({ isMessagesLoading: false });
    }
  },



sendMessage: async (messageData) => {
  const { selectedCharacter } = get();

  // require selected character
  const charId = selectedCharacter?._id ?? selectedCharacter?.id;
  if (!charId) return;

  // require authenticated user id
  let me;
  try {
    const { authUser } = useAuthStore.getState?.() || {};
    me = authUser?._id;
  } catch (_) {}
  if (!me) {
    toast.error("No authenticated user id");
    return;
  }

  try {
    // post to backend and append the server's message
    const res = await axiosInstance.post(`/messages/send/${charId}`, messageData);
    const real = res.data;
    set({ messages: [...get().messages, real] });
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to send message");
  }
},



  setSelectedCharacter: (selectedCharacter) => set({ selectedCharacter }),
}));
