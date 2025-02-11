import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { ArtisanFormData } from "@/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const updateArtisan = async (
  formData: ArtisanFormData,
  userId: string | undefined
) => {
  const res = { error: "", success: false };
  if (!userId) {
    console.log("No user id provided", userId);
    return;
  }
  const userData = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => v !== "" && v !== undefined)
  );

  const newData = {
    ...userData,
    artisanId: userId,
  };

  const { data, error } = await supabase
    .from("artisan_detail")
    .insert([newData]);

  if (!error) {
    res.success = true;
  } else {
    res.error = "Une erreur s'est produite, veuillez reessayer plutard";
    console.log(error);
  }

  return res;
};
