import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useRouter } from "expo-router";
import regEmails from "../lib/utils";
import { useAuth } from "@/components/Auth";

import { CountryPicker, CountryItem } from "react-native-country-codes-picker";
import PasswordResetNotice from "@/components/PasswordResetNotice";
import { MaterialIcons } from "@expo/vector-icons";

const ResetPasseword = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [countryCode, setCountryCode] = useState("+221");
  const [flag, setFlag] = useState("🇸🇳"); // Drapeau par défaut pour le Sénégal
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);

  const handlePickerPress = (item: CountryItem) => {
    setCountryCode(item.dial_code);
    setFlag(item.flag);
    setShow(false);
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{9,}$/;
    if (!phoneRegex.test(number)) {
      setPhoneError("Le numéro de téléphone doit contenir au moins 9 chiffres");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const { width: w } = useWindowDimensions();

  const handleSendOtp = () => {
    router.push({
      pathname: "/verification/[id]",
      params: { id: phone },
    });
  };

  useEffect(() => {
    if (user) {
      return router.push("/(root)/(tabs)");
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView
        className="flex-1"
        style={{
          backgroundColor: "#f1f1ef",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            paddingHorizontal: 20,
            backgroundColor: "#f1f1ef",
          }}
        >
          <View className="w-full px-6 py-4 border-b border-gray-300">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-2 top-4 z-10"
            >
              <Ionicons name="arrow-back" size={24} color="#0061FF" />
            </TouchableOpacity>
            <Text className="text-xl font-rubik-bold text-center text-black-300">
              Changer mot de passe
            </Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <PasswordResetNotice />
          </View>
          {/*
          <View
            style={{
              width: w - 40,
            }}
            className="flex-1 items-center justify-center"
          >
             <View className="w-full items-center justify-center">
              <Image
                source={require("@/assets/images/reset-pass.png")}
                resizeMode="contain"
                className="w-80 h-64"
              />
            </View>

            <Text className="text-3xl font-rubik-bold mb-10">
              Récuperation par SMS
            </Text>

            <View className="relative mb-6">
              <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                Téléphone
              </Text>

              <View className="border w-full border-primary-300 p-5 rounded-2xl flex-row items-center">
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  className="flex-row items-center mr-3"
                >
                  <Text className="text-2xl mr-2">{flag}</Text>
                  <Text className="text-blue-500 text-xl font-rubik-medium">
                    {countryCode}
                  </Text>
                </TouchableOpacity>

                <TextInput
                  className="flex-1 text-xl font-rubik-regular placeholder:text-gray-400"
                  placeholder="Votre numéro de téléphone"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    validatePhoneNumber(text);
                    setPhone(text);
                  }}
                  style={{
                    lineHeight: 21,
                  }}
                />
              </View>

              <CountryPicker
                lang="fr"
                show={show}
                style={{
                  modal: {
                    height: 400,
                  },
                  countryButtonStyles: {
                    height: 46,
                  },
                  flag: {
                    fontSize: 24,
                    marginRight: 8,
                  },
                  dialCode: {
                    fontSize: 16,
                  },
                  countryName: {
                    fontSize: 16,
                  },
                }}
                pickerButtonOnPress={handlePickerPress}
                onBackdropPress={() => setShow(false)}
                enableModalAvoiding={true}
              />

              {phoneError && (
                <Text className="text-red-500 text-base font-rubik-light p-2">
                  {phoneError}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handleSendOtp}
              className="bg-primary-300 p-5 rounded-2xl my-6 w-full"
              // disabled={isSignUpLoading}
              // style={{ opacity: isSignUpLoading ? 0.5 : 1 }}
            >
              <Text className="text-white text-center font-rubik-bold text-2xl">
                Envoyer le code
              </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => router.push("/(root)/(tabs)/contact")}
        style={{
          position: "absolute",
          backgroundColor: "#3b82f6",
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          shadowColor: "#000",
          bottom: 50,
          right: 40,
          borderRadius: 50,
          padding: 8,
        }}
      >
        <MaterialIcons name="support-agent" size={34} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ResetPasseword;
