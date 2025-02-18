import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/components/Auth";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/(root)/(tabs)");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      {Platform.OS === "android" && <View className="mt-4" />}
      <StatusBar style="dark" />
      <View className="w-full px-6 py-4 border-b border-gray-300">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-6 top-4 z-10"
        >
          <Ionicons name="arrow-back" size={24} color="#0061FF" />
        </TouchableOpacity>
        <Text className="text-2xl font-rubik-bold text-center text-black-300">
          Compte
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        <View className="flex-1 items-center justify-center">
          <View className="w-full items-center mb-4">
            <Image
              source={require("@/assets/images/pmn/logosign.png")}
              className="w-80 h-32"
              resizeMode="cover"
            />

            <Text className="text-xl font-rubik-light mt-1">
              Votre solution artisanale, tac au tac!
            </Text>
          </View>

          {/* Heading */}
          <View className="w-full items-center my-6">
            <Text className="text-4xl font-rubik-extrabold mb-2 text-center">
              Création de votre compte
            </Text>
            <Text className="text-xl font-rubik-light mb-2 text-center">
              Sélectionnez votre profil pour poursuivre la création de votre
              compte.
            </Text>
          </View>

          <View className="w-full flex-row gap-4">
            <View
              className="flex-1 bg-white rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                source={require("@/assets/images/client.png")}
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="contain"
              />
              <View className="px-4 py-2">
                <Text className="text-center font-rubik-medium text-xl mb-4">
                  Client
                </Text>
                <TouchableOpacity
                  className="bg-primary-300 rounded-lg p-3"
                  onPress={() => router.push("/customers/choose-signup")}
                >
                  <Text className="text-white text-center font-rubik-bold text-2xl">
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              className="flex-1 border border-gray-200 bg-white rounded-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                source={require("@/assets/images/artisan.png")}
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="contain"
              />
              <View className="px-4 py-2">
                <Text className="text-center font-rubik-medium text-xl mb-4">
                  Artisan
                </Text>
                <TouchableOpacity
                  className="bg-primary-300 rounded-lg p-3"
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/artisan-signup/[id]",
                      params: { id: "ARTISAN" },
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
