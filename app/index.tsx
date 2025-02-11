import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { SplashScreen, useRouter } from "expo-router";
import useStore from "./lib/store/manage";

// Empêcher le masquage automatique de SplashScreen
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const { isShowStartup } = useStore();

  useEffect(() => {
    // Attendre le prochain tick pour permettre le montage complet
    const redirect = setTimeout(() => {
      if (isShowStartup) {
        router.replace("/(root)/(tabs)");
      } else {
        router.replace("/(root)/startup");
      }
      SplashScreen.hideAsync();
    }, 0);

    return () => clearTimeout(redirect);
  }, [isShowStartup]);

  // Afficher un écran de chargement pendant la redirection
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0061FF" />
    </View>
  );
}
