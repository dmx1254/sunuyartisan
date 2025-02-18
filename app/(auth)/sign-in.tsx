import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { CountryPicker, CountryItem } from "react-native-country-codes-picker";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";

import { useAuth } from "@/components/Auth";
import { Feather } from "@expo/vector-icons";

const SignIn = () => {
  const { user, signIn, isSignInLoading } = useAuth();
  // const { isShowStartup, updateStartup } = useStore();

  const { width: w } = useWindowDimensions();

  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  const [phoneError, setPhoneError] = useState<string>("");

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+221");
  const [flag, setFlag] = useState("🇸🇳"); // Drapeau par défaut pour le Sénégal
  const [phoneNumber, setPhoneNumber] = useState("");

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

  // console.log(isShowStartup);

  const handleSignIn = async () => {
    try {
      const newPhone = countryCode + phoneNumber;
      const phoneRegex = /^\d{9,}$/;

      // Validation des champs
      if (!phoneRegex.test(phoneNumber) || password.length < 6) {
        if (password.length < 6) {
          setPasswordError(
            "Veuillez saisir un mot de passe de 6 caractères minimum"
          );
        } else {
          setPasswordError("");
        }

        if (!phoneRegex.test(phoneNumber)) {
          setPhoneError("Veuillez saisir un numéro de téléphone valide");
        } else {
          setPhoneError("");
        }
        return;
      }

      // Reset des erreurs
      setPhoneError("");
      setPasswordError("");

      // Tentative de connexion
      const { error, success } = await signIn(newPhone, password);

      if (error) {
        if (error.message?.includes("Invalid login credentials")) {
          setPasswordError("Email ou mot de passe incorrect");
          return;
        }
        // Gérer d'autres types d'erreurs si nécessaire
        console.error("Erreur de connexion:", error);
        return;
      }

      if (success) {
        router.replace("/(root)/(tabs)");
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      setPasswordError("Une erreur est survenue lors de la connexion");
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/(root)/(tabs)");
    }
  }, []);

  // console.log(user);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-backgr-100"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView className="flex-1 flex-col items-center bg-backgr-100">
        <View className="w-full px-6 py-4 border-b border-gray-300">
          <TouchableOpacity
            onPress={() => router.push("/(root)/(tabs)")}
            className="absolute left-6 top-4 z-10"
          >
            <Ionicons name="arrow-back" size={24} color="#0061FF" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-bold text-center text-black-300">
            Connexion
          </Text>
        </View>
        <ScrollView
          className=""
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          <Text className="text-4xl font-rubik-bold text-center mt-4 mb-8">
            Connectez-vous
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="w-full flex-col items-center justify-center"
          >
            <View
              className="flex-col space-y-8"
              style={{
                width: w - 40,
              }}
            >
              <View className="relative mb-6">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Téléphone
                </Text>

                <View
                  className="border border-primary-300 rounded-2xl flex-row items-center"
                  style={{
                    padding: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    className="flex-row items-center mr-3 pt-1"
                  >
                    <Text className="text-xl mr-2">{flag}</Text>
                    <Text className="text-blue-500 text-lg font-rubik-medium">
                      {countryCode}
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    className="w-full text-lg font-rubik-regular font-rubik-light"
                    placeholder="Téléphone"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                      validatePhoneNumber(text);
                      setPhone(text);
                    }}
                    style={{
                      lineHeight: 20,
                    }}
                  />
                </View>

                <CountryPicker
                  lang="fr"
                  show={show}
                  inputPlaceholder="Rechercher un pays"
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

              <View className="relative mb-2">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Mot de passe
                </Text>
                <TextInput
                  placeholder="Mot de passe"
                  value={password}
                  secureTextEntry={isPasswordVisible}
                  onChangeText={(value) => setPassword(value)}
                  className="w-full border border-primary-300 p-4 rounded-2xl bg-primary-header text-lg font-rubik-light placeholder:text-black"
                />
                {passwordError && (
                  <Text className="text-red-500 text-base font-rubik-light p-2">
                    {passwordError}
                  </Text>
                )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ position: "absolute", top: 46, left: "88%" }}
                  onPress={() => setIsPasswordVisible((prevPass) => !prevPass)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#0061FF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              className="w-full flex items-end justify-end mt-4 mb-4"
              onPress={() => router.push("/(auth)/reset-password")}
            >
              <Text className="text-primary-300 font-rubik-medium text-lg">
                Mot de passe oublié?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              className="w-full flex items-center justify-center p-4 bg-primary-300 rounded-full"
              onPress={handleSignIn}
              disabled={!phone || !password}
              style={{
                opacity: !phone || !password ? 0.7 : 1,
              }}
            >
              {!isSignInLoading && (
                <Text className="w-full text-center font-rubik-medium text-xl text-white">
                  Se connecter
                </Text>
              )}
              {isSignInLoading && (
                <View className="self-center animate-spin">
                  <Feather name="loader" size={28} color="#ffffff" />
                </View>
              )}
            </TouchableOpacity>
            <Link
              href="/sign-up"
              className="flex items-center justify-center mt-4"
            >
              <Text className="font-rubik-medium text-lg">
                Avez vous un compte ?{" "}
                <Text className="text-primary-300">Inscrivez-vous</Text>
              </Text>
            </Link>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
