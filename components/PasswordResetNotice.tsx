import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PasswordResetNotice = () => {
  const router = useRouter();
  return (
    <View
      className="p-6 bg-white rounded-lg shadow-md mx-4 my-8"
      style={{
        elevation: 5,
      }}
    >
      <View className="flex-row items-center justify-center mb-4 gap-2">
        <MaterialIcons name="info" size={38} color="#3b82f6" />
        <MaterialIcons name="support-agent" size={38} color="#3b82f6" />
      </View>

      <Text className="text-center text-2xl font-rubik-medium mb-3">
        Réinitialisation de mot de passe
      </Text>

      <Text className="text-center text-lg text-gray-600 font-rubik-light">
        Pour réinitialiser votre mot de passe, veuillez contacter notre équipe
        support via la page Contact. Notre équipe vous aidera à sécuriser votre
        compte avec un nouveau mot de passe.
      </Text>
    </View>
  );
};

export default PasswordResetNotice;
