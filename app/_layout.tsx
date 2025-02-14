import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "./global.css";
import { AuthProvider } from "@/components/Auth";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/CustomToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/context/NotificationContext";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const queryClient = new QueryClient();

export default function RootLayout() {
  // const MainStack = createNativeStackNavigator();
  // const UserStack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NotificationProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toast config={toastConfig} />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "none",
              contentStyle: { backgroundColor: "white" },
            }}
          >
            <Stack.Screen
              name="(root)/(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(root)/startup"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/update-user"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/messages"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/notifications"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/security"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/schedules"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/user-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/sign-up"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/artisan-signup/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/customers/choose-signup"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/reset-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/artisan/[id]"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(user)/message/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(user)/schedule/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(root)/metiers/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
        </QueryClientProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
