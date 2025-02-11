import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/components/Auth";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";

const Security = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pour mettre à jour le mot de passe
  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert("Succès", "Mot de passe mis à jour avec succès");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Alert.alert("Erreur", "Échec de la mise à jour du mot de passe");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Header */}
      <View className="bg-primary-300 px-4 pt-16 pb-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-rubik-bold">
            Sécurité du compte
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        {/* Password Change Section */}
        <View className="bg-white rounded-xl p-4 border border-gray-100 mb-4">
          <Text className="text-xl font-rubik-bold text-black-300 mb-4">
            Changer le mot de passe
          </Text>

          {/* Current Password */}
          <View className="mb-4">
            <Text className="text-black-100 font-rubik-light mb-2 text-lg">
              Mot de passe actuel
            </Text>
            <View className="relative">
              <TextInput
                className="bg-gray-50 rounded-xl p-4 font-rubik-regular border border-gray-300"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Entrez votre mot de passe actuel"
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#8C8E98"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-black-100 font-rubik-light mb-2 text-lg">
              Nouveau mot de passe
            </Text>
            <View className="relative">
              <TextInput
                className="bg-gray-50 rounded-xl p-4 font-rubik-regular border border-gray-300"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Entrez votre nouveau mot de passe"
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#8C8E98"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-black-100 font-rubik-light mb-2 text-lg">
              Confirmer le nouveau mot de passe
            </Text>
            <View className="relative">
              <TextInput
                className="bg-gray-50 rounded-xl p-4 font-rubik-regular border border-gray-300"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmez votre nouveau mot de passe"
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#8C8E98"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className={`bg-primary-300 p-4 rounded-xl ${
              isLoading ? "opacity-70" : ""
            }`}
            onPress={updatePassword}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-rubik-bold text-lg">
              {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <Text className="text-xl font-rubik-bold text-black-300 mb-4">
            Conseils de sécurité
          </Text>
          <View className="flex-col gap-4">
            <View className="flex-row items-start">
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#0061FF"
                className="mr-2"
              />
              <Text className="text-black-100 flex-1 font-rubik-regular text-lg">
                Utilisez au moins 8 caractères, incluant des chiffres et des
                symboles
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#0061FF"
                className="mr-2"
              />
              <Text className="text-black-100 flex-1 text-lg font-rubik-regular">
                Ne réutilisez pas un ancien mot de passe
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#0061FF"
                className="mr-2"
              />
              <Text className="text-black-100 flex-1 text-lg font-rubik-regular">
                Évitez les informations personnelles facilement devinables
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Security;
