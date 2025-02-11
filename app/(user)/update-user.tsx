import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ArtisanFormData } from "@/types";
import * as Location from "expo-location";
import { useAuth } from "@/components/Auth";

import Feather from "@expo/vector-icons/Feather";
import FirstStep from "@/components/FirstStep";
import SecondStep from "@/components/SecondStep";
import ThirdStep from "@/components/ThirdStep";
import LastStep from "@/components/LastStep";
import { updateArtisan } from "../lib/supabase";
import Toast from "react-native-toast-message";

const UpdateUser = () => {
  const { isSignUpLoading, signUp, user } = useAuth();

  const [isUpadting, setIsUpdating] = useState<boolean>(false);

  const [isShowPopup, setIsShowPopup] = useState<boolean>(true);

  // OPENCAGE_GEOCODER_API_KEY
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [formData, setFormData] = useState<ArtisanFormData>({
    category: "",
    sub_category: "",
    region: "",
    department: "",
    commune: "",
    address: "",
    age: "",
    price: "",
    availability: "",
    latitude: location?.coords.latitude || null,
    longitude: location?.coords.longitude || null,
  });

  const [geolocationLoading, setGeolocationLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("info");

  const handleAddToTheFormData = (
    name: keyof FormData | string,
    val: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  //   console.log(formData);

  // console.log(location);

  useEffect(() => {
    if (location) {
      const fetchAddress = async () => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=74b24a60c44f4e44b2d77601aee03a87`;

        try {
          setGeolocationLoading(true);
          const response = await fetch(url);
          const data = await response.json();

          if (data) {
            const address = data.results[0].formatted;
            setFormData({ ...formData, address: address });
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l’adresse :", error);
        } finally {
          setGeolocationLoading(false);
        }
      };
      fetchAddress();
    }
  }, [location]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("L'autorisation d'accéder à l'emplacement a été refusée");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      handleAddToTheFormData("latitude", location.coords.latitude);
      handleAddToTheFormData("longitude", location.coords.longitude);
      setLocation(location);
    };
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("L'autorisation d'accéder à l'emplacement a été refusée");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const steps = [
    { number: 1, title: "Spécialité" },
    { number: 2, title: "Métier" },
    { number: 3, title: "Informations" },
    { number: 4, title: "Finalisation" },
  ];

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.category) {
          Alert.alert("Erreur", "Veuillez sélectionner une spécialité");
          return false;
        }
        break;
      case 2:
        if (!formData.sub_category) {
          Alert.alert("Erreur", "Veuillez remplir tous les champs");
          return false;
        }
        break;
      case 3:
        if (
          !formData.age ||
          !formData.availability ||
          !formData.region ||
          !formData.department ||
          !formData.commune
        ) {
          Alert.alert("Erreur", "Veuillez remplir tous les champs");
          return false;
        }
        break;
    }
    return true;
  };

  const showSucessToast = () => {
    Toast.show({
      type: "success",
      text1: "Notification",
      text2: "Vos informations ont été mises à jour",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Notification",
      text2: "Quelque chose s'est mal passé",
    });
  };

  const handleNext = async () => {
    // console.log(formData);
    if (validateStep()) {
      if (currentStep === 4) {
        try {
          setIsUpdating(true);
          const response = await updateArtisan(formData, user?.id);
          if (response?.error) {
            showErrorToast();
          }
          if (response?.success) {
            showSucessToast();
            setTimeout(() => {
              router.push("/(root)/(tabs)/profile");
            }, 3000);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsUpdating(false);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {Platform.OS === "android" && <View className="mt-4" />}
      <Toast />
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-6 top-4 z-10"
        >
          <Ionicons name="arrow-back" size={24} color="#0061FF" />
        </TouchableOpacity>
        <Text className="text-2xl font-rubik-bold text-center text-black-300">
          Information de profile
        </Text>
      </View>

      {/* Stepper */}
      <View className="flex-row justify-between px-6 py-4">
        {steps.map((step, index) => (
          <View key={step.number} className="items-center flex-1">
            <TouchableOpacity
              onPress={() => {
                if (step.number === 1) {
                  setCurrentStep(1);
                } else if (step.number === 2 && formData.category) {
                  setCurrentStep(2);
                } else if (
                  step.number === 4 &&
                  formData.age &&
                  formData.availability
                ) {
                  setCurrentStep(4);
                }
              }}
              className={`w-12 h-12 rounded-full items-center justify-center z-50 ${
                currentStep >= step.number ? "bg-primary-300" : "bg-gray-300"
              }`}
            >
              <Text className="text-white text-xl font-rubik-bold">
                {step.number}
              </Text>
            </TouchableOpacity>
            <Text className="text-base mt-1 text-black-200">{step.title}</Text>
            {index < steps.length - 1 && (
              <View
                className={`h-0.5 w-full absolute top-6 left-1/2 ${
                  currentStep > step.number ? "bg-primary-300" : "bg-gray-200"
                }`}
              />
            )}
          </View>
        ))}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView className="flex-1">
          {currentStep === 1 && (
            <View className="py-4">
              <FirstStep
                onSelect={(name, val) => handleAddToTheFormData(name, val)}
                categorySelected={formData.category}
              />
            </View>
          )}

          {currentStep === 2 && (
            <SecondStep
              categorySelected={formData.sub_category}
              category={formData.category}
              onSelect={(name, val) => handleAddToTheFormData(name, val)}
            />
          )}

          {currentStep === 3 && (
            <ThirdStep
              formData={formData}
              onSelect={(name, val) => handleAddToTheFormData(name, val)}
              getCurrentLocation={getCurrentLocation}
              geolocationLoading={geolocationLoading}
            />
          )}
          {currentStep === 4 && <LastStep formData={formData} />}
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <TouchableOpacity
        className="self-center mb-8"
        style={{
          opacity: currentStep < 2 ? 0.5 : 1,
        }}
        disabled={currentStep < 2}
        onPress={() =>
          setCurrentStep((prevCurrentState) => prevCurrentState - 1)
        }
      >
        <Text className="text-xl font-rubik-medium rounded-2xl px-4 py-2 bg-primary-900 text-white">
          Retour
        </Text>
      </TouchableOpacity> */}

      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleNext}
          className="w-full flex items-center justify-center p-4 bg-primary-300 rounded-full"
          disabled={
            isSignUpLoading ||
            (currentStep === 1 && !formData.category) ||
            (currentStep === 2 && !formData.sub_category)
          }
          style={{
            opacity:
              isSignUpLoading ||
              (currentStep === 1 && !formData.category) ||
              (currentStep === 2 && !formData.sub_category)
                ? 0.5
                : 1,
          }}
        >
          {currentStep === 4 && !isUpadting && (
            <Text className="text-white text-center font-rubik-bold text-xl">
              Confirmer
            </Text>
          )}
          {currentStep < 4 && !isUpadting && (
            <Text className="text-white text-center font-rubik-bold text-xl">
              Suivant
            </Text>
          )}

          {isUpadting && currentStep === 4 && (
            <View className="self-center animate-spin">
              <Feather name="loader" size={28} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
