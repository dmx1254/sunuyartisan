import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import Swip from "./swiper/Swip";
import { Redirect, useRouter } from "expo-router";
import useStore from "@/app/lib/store/manage";

const StartUp = () => {
  const router = useRouter();
  const { updateStartup } = useStore();

  const handleUpdateStartup = () => {
    updateStartup(true);
    router.push("/(root)/(tabs)");
  };
  return (
    <SafeAreaView className="flex-1 bg-backgr-100">
      {Platform.OS === "android" && <View className="mt-4" />}
      <StatusBar backgroundColor="#000" hidden={false} />

      <TouchableOpacity
        className="flex items-end justify-end py-2 px-6"
        activeOpacity={0.5}
        onPress={handleUpdateStartup}
      >
        <Text className="text-dark font-rubik-light text-2xl">Passer</Text>
      </TouchableOpacity>
      <Swip />
    </SafeAreaView>
  );
};

export default StartUp;
