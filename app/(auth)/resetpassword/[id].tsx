import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/components/Auth";

const ResetPasswordPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] =
    useState<string>("");

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  const { width: w } = useWindowDimensions();

  useEffect(() => {
    if (user) {
      return router.replace("/(root)/(tabs)");
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar backgroundColor="#000" hidden={false} />
      <SafeAreaView className="flex-1">
        <TouchableOpacity
          activeOpacity={0.5}
          className="left-2 rounded-full p-2"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#0061FF" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full flex-1 justify-center">
            <View
              className="items-center mb-8"
              style={{
                width: w - 40,
              }}
            >
              {/* <Image
                source={require("@/assets/images/otp.png")}
                resizeMode="cover"
              /> */}
              <Text className="text-6xl font-rubik-bold text-center mb-8">
                Reinitialiser votre mot de passe
              </Text>

              <View className="w-full relative">
                <TextInput
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  secureTextEntry={isPasswordVisible}
                  onChangeText={(value) => setNewPassword(value)}
                  className="w-full border border-primary-300 p-6 rounded-xl text-xl font-rubik-light placeholder:text-black"
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="absolute top-[30%] left-[85%]"
                  onPress={() => setIsPasswordVisible((prevPass) => !prevPass)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={34}
                    color="#0061FF"
                  />
                </TouchableOpacity>
              </View>
              <View className="w-full relative mt-12">
                <TextInput
                  placeholder="Confirmer nouveau mot de passe"
                  value={confirmNewPassword}
                  secureTextEntry={isPasswordVisible}
                  onChangeText={(value) => setConfirmNewPassword(value)}
                  className="w-full border border-primary-300 p-6 rounded-xl text-xl font-rubik-light placeholder:text-black"
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="absolute top-[30%] left-[85%]"
                  onPress={() => setIsPasswordVisible((prevPass) => !prevPass)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={34}
                    color="#0061FF"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                className="w-full bg-primary-300 rounded-full p-6 mt-10"
                onPress={() => router.push}
              >
                <Text className="text-white text-center text-2xl font-rubik-medium">
                  Reinitialiser
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordPage;
