import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MyStore {
  isShowStartup: boolean;
  updateStartup: (val: boolean) => void;
}

const useStore = create<MyStore>()(
  persist(
    (set) => ({
      isShowStartup: false,
      updateStartup: (startup: boolean) => set({ isShowStartup: startup }),
    }),
    {
      name: "pmn-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
