import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Linking,
  Pressable,
} from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Artisan } from "@/types";
import { useAuth } from "@/components/Auth";
import Feather from "@expo/vector-icons/Feather";
import { CountryPicker, CountryItem } from "react-native-country-codes-picker";
import OtpVerification from "@/components/OtpVerification";
import { StatusBar } from "expo-status-bar";

const ArtisanSignUp = () => {
  const { isSignUpLoading, signUp, user } = useAuth();
  // OPENCAGE_GEOCODER_API_KEY
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Artisan>({
    fullname: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { width: w } = useWindowDimensions();

  // console.log(id);

  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [showOtp, setShowOtp] = useState<boolean>(false);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+221");
  const [flag, setFlag] = useState("🇸🇳"); // Drapeau par défaut pour le Sénégal
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

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

  // console.log(location);

  const handleAddToTheFormData = (name: string, val: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: val,
    }));
  };

  const handleNext = async () => {
    // console.log(formData);

    if (
      !formData.phone ||
      formData.password.length < 6 ||
      formData.password !== formData.confirmPassword
    ) {
      const phoneRegex = /^\d{9,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setPhoneError(
          "Le numéro de téléphone doit contenir au moins 9 chiffres"
        );
        return false;
      }
      if (!formData.phone) {
        setPhoneError("Format de téléphone incorrect");
      } else {
        setPhoneError("");
      }

      if (formData.password.length < 6) {
        setPasswordError("Le mot de passe doit avoir 6 caractères minimum");
      } else {
        setPasswordError("");
      }

      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError("Les mots de passe ne correspondent pas");
      } else {
        setConfirmPasswordError("");
      }
    } else {
      const newPhone = countryCode + formData.phone;
      const password = formData.password;

      // console.log(password);

      setPhoneError("");
      setPasswordError("");
      setConfirmPasswordError("");
      const { error, success } = await signUp(newPhone, password);
      if (success) {
        // router.push({
        //   pathname: "/verification/[id]",
        //   params: { id: formData.phone },
        // });
        setShowOtp(true);
      }
      if (error) {
        if (error.toString().includes("Cet utilisateur est déjà enregistré")) {
          setPhoneError("Cet utilisateur est déjà enregistré");
        } else {
          setPhoneError("");
        }
      }

      // console.log(formData);
      // console.log(newPhone);
    }
  };

  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    if (user) {
      return router.replace("/(root)/(tabs)");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      {Platform.OS === "android" && <View className="mt-4" />}
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-300">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-6 top-4 z-10"
        >
          <Ionicons name="arrow-back" size={24} color="#0061FF" />
        </TouchableOpacity>
        <Text className="text-2xl font-rubik-bold text-center text-black-300">
          Inscription {id === "ARTISAN" && "Artisan"}
          {id === "PARTICULIER" && "du particulier"}
          {id === "ADMINISTRATION" && "administration"}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          {showOtp ? (
            <OtpVerification
              formData={formData}
              role={id as string}
              countryCode={countryCode}
            />
          ) : (
            <View
              className="flex-col mt-2"
              style={{
                width: w - 40,
              }}
            >
              <Text className="text-2xl font-rubik-bold text-center mb-6 mt-4">
                Rejoignez notre communauté {id === "ARTISAN" && "d'artisans"}
                {id === "PARTICULIER" && "de particuliers"}
                {id === "ADMINISTRATION" && ""}
              </Text>
              <View className="relative mb-6">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Prénom et nom
                </Text>
                <TextInput
                  value={formData.fullname}
                  onChangeText={(text: string) =>
                    handleAddToTheFormData("fullname", text)
                  }
                  placeholder="Votre prénom et nom"
                  keyboardType="default"
                  className="bg-white border relative border-primary-300 pl-12 pr-4 py-4 rounded-2xl text-lg placeholder:text-gray-400"
                  style={{
                    lineHeight: 21,
                  }}
                />
                <View
                  className="absolute left-4"
                  style={{
                    top: 46,
                  }}
                >
                  <Ionicons name="person-outline" size={20} color="#9ca3af" />
                </View>
              </View>

              <View className="relative mb-6">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Téléphone
                </Text>

                <View className="bg-white border border-primary-300 p-4 rounded-2xl flex-row items-center">
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    className="flex-row items-center mr-3"
                  >
                    <Text className="text-xl mr-2">{flag}</Text>
                    <Text className="text-blue-500 text-lg font-rubik-medium">
                      {countryCode}
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    className="flex-1 text-lg font-rubik-regular placeholder:text-gray-400"
                    placeholder="Votre téléphone"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                      validatePhoneNumber(text);
                      handleAddToTheFormData("phone", text);
                    }}
                    style={{
                      lineHeight: 17,
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

              <View className="relative mb-6">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Mot de passe
                </Text>
                <TextInput
                  value={formData.password}
                  onChangeText={(text: string) =>
                    handleAddToTheFormData("password", text)
                  }
                  placeholder="Votre mot de passe"
                  keyboardType="default"
                  className="bg-white border relative border-primary-300 pl-12 pr-4 py-4 rounded-2xl text-lg placeholder:text-gray-400"
                  numberOfLines={2}
                  secureTextEntry={isPasswordVisible}
                />
                <View
                  className="absolute left-4"
                  style={{
                    top: 50,
                  }}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ position: "absolute", top: 48, left: "88%" }}
                  onPress={() => setIsPasswordVisible((prevPass) => !prevPass)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="#0061FF"
                  />
                </TouchableOpacity>
                {passwordError && (
                  <Text className="text-red-500 text-base font-rubik-light p-2">
                    {passwordError}
                  </Text>
                )}
              </View>

              <View className="relative mb-4">
                <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
                  Confirmer mot de passe
                </Text>
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(text: string) =>
                    handleAddToTheFormData("confirmPassword", text)
                  }
                  placeholder="Confirmer votre mot de passe"
                  keyboardType="default"
                  className="bg-white border relative border-primary-300 pl-12 pr-4 py-4 rounded-2xl text-lg placeholder:text-gray-400"
                  numberOfLines={2}
                  secureTextEntry={isPasswordVisible}
                />
                <View
                  className="absolute left-4"
                  style={{
                    top: 49,
                  }}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9ca3af"
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{ position: "absolute", top: 48, left: "88%" }}
                  onPress={() => setIsPasswordVisible((prevPass) => !prevPass)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="#0061FF"
                  />
                </TouchableOpacity>
                {confirmPasswordError && (
                  <Text className="text-red-500 text-base font-rubik-light p-2">
                    {confirmPasswordError}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleNext}
                className="bg-primary-300 p-4 rounded-full mt-6 mb-4"
                disabled={
                  isSignUpLoading ||
                  !formData.password ||
                  !formData.fullname ||
                  !formData.phone
                }
                style={{
                  opacity:
                    isSignUpLoading ||
                    !formData.password ||
                    !formData.fullname ||
                    !formData.phone
                      ? 0.5
                      : 1,
                }}
              >
                {!isSignUpLoading && (
                  <Text className="text-white text-center font-rubik-bold text-xl">
                    Confirmer l'inscription
                  </Text>
                )}

                {isSignUpLoading && (
                  <View className="self-center animate-spin">
                    <Feather name="loader" size={28} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
          {!showOtp && (
            <View className="w-full px-4 pt-2">
              <Text className="flex-row text-center font-rubik-light text-base">
                En s'inscrivant, vous acceptez nos{" "}
                <Text
                  className="text-primary-300 font-rubik-semibold inline"
                  onPress={() => openWebsite("https://pmn.sn/cgu")}
                >
                  termes et conditions{" "}
                </Text>
                et nos{" "}
                <Text
                  className="text-primary-300 font-rubik-semibold inline"
                  onPress={() => openWebsite("https://pmn.sn/cgu")}
                >
                  politiques de confidentialité
                </Text>
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ArtisanSignUp;
