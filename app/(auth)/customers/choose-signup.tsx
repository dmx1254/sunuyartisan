import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/components/Auth";
import { StatusBar } from "expo-status-bar";

const ChooseSignUp = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { width: w } = useWindowDimensions();

  useEffect(() => {
    if (user) {
      return router.replace("/(root)/(tabs)");
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar style="dark" />
      {Platform.OS === "android" && <View className="mt-4" />}
      <SafeAreaView className="flex-1">
        {/* Back button */}
        <View className="w-full px-6 py-4 border-b border-gray-300">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-6 top-4 z-10"
          >
            <Ionicons name="arrow-back" size={24} color="#0061FF" />
          </TouchableOpacity>
          <Text className="text-xl font-rubik-bold text-center text-black-300">
            Compte
          </Text>
        </View>

        {/* Content container */}
        <View className="flex-1 justify-center px-5">
          {/* Heading */}
          <View className="items-center my-6">
            <Text className="text-5xl font-rubik-extrabold mb-2 text-center">
              Création de votre compte
            </Text>
            <Text className="text-xl font-rubik-light mb-2 text-center">
              Sélectionnez votre profil pour poursuivre la création de votre
              compte.
            </Text>
          </View>

          {/* Cards container */}
          <View className="flex-row justify-between gap-2">
            {/* Particulier Card */}
            <View
              className="bg-white rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: w / 2 - 24,
              }}
            >
              <Image
                source={require("@/assets/images/client.png")}
                className="w-full h-48 rounded-t-lg"
                resizeMode="contain"
              />
              <View className="p-4">
                <Text className="text-center font-rubik-medium text-xl mb-4">
                  Particulier
                </Text>
                <TouchableOpacity
                  className="bg-primary-300 rounded-lg p-3"
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/artisan-signup/[id]",
                      params: { id: "PARTICULIER" },
                    })
                  }
                >
                  <Text className="text-white text-center font-rubik-bold text-2xl">
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Administration Card */}
            <View
              className="bg-white rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: w / 2 - 24,
              }}
            >
              <Image
                source={require("@/assets/images/administration.png")}
                className="w-full h-48 rounded-t-lg pt-4"
                resizeMode="contain"
              />
              <View className="p-4">
                <Text className="text-center font-rubik-medium text-xl mb-4">
                  Administration
                </Text>
                <TouchableOpacity
                  className="bg-primary-300 rounded-lg p-3"
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/artisan-signup/[id]",
                      params: { id: "ADMINISTRATION" },
                    })
                  }
                >
                  <Text className="text-white text-center font-rubik-bold text-2xl">
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ChooseSignUp;
