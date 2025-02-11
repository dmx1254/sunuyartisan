import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";

import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/components/Auth";

import Feather from "@expo/vector-icons/Feather";
import { Artisan } from "@/types";

const OtpVerification = ({
  formData,
  countryCode,
  role,
}: {
  formData: Artisan;
  countryCode: string;
  role: string;
}) => {
  const { verifyYourOtp, isSignOtpLoading, user } = useAuth();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);

  // console.log("formData");
  // console.log(formData);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleResendCode = () => {
    Alert.alert(
      "Information",
      "Veuillez patienter pour recevoir le code. Si vous ne le recevez pas, contactez notre support", // Message
      [{ text: "OK" }]
    );
  };

  const handleChange = async (value: string, index: number) => {
    // const copiedText = await Clipboard.getStringAsync();
    // if (copiedText && copiedText.length > 0 && copiedText.length < 7) {
    //   setOtp(copiedText.trim().split(""));
    // }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (inputRefs.current[index + 1] && newOtp[index]) {
      inputRefs.current[index + 1]?.focus();
    }

    if (inputRefs.current[index - 1] && !newOtp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    const phone = countryCode + formData.phone;

    try {
      setIsOtpLoading(true);
      const data = await verifyYourOtp(phone, otpCode, formData, role);
      if (data.success) {
        if (role === "ARTISAN") {
          router.replace("/(user)/update-user");
        } else {
          router.replace("/(root)/(tabs)/profile");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOtpLoading(false);
    }

    // console.log(otpCode, phone);
    // console.log(formData);
  };

  return (
    <View className="mt-12">
      <View className="w-full p-4">
        <View className="items-center mb-8">
          <Text className="text-3xl font-rubik-bold text-center mt-4 mb-2">
            Veuillez saisir le code OTP envoyé à votre numero de téléphone.
          </Text>

          <View className="flex-row justify-between text-center gap-1 items-center w-full my-8">
            {otp.map((digit, index) => (
              <View
                key={index}
                className="w-14 h-14 bg-white rounded-full text-center items-center justify-center"
              >
                <TextInput
                  value={digit}
                  onChangeText={(value) => handleChange(value, index)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  keyboardType="numeric"
                  className="w-14 h-14 border border-primary-300 rounded-full text-center font-rubik-bold text-2xl"
                  onSubmitEditing={() => focusNextInput(index)}
                />
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-center gap-4 w-full">
            <Text className="text-lg font-rubik-bold italic">
              Vous n'avez pas reçu le code?
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleResendCode()}
            >
              <Text className="text-primary-300 font-medium text-lg font-rubik-bold">
                Renvoyer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-primary-300 rounded-full py-4 px-8 mx-4"
        disabled={otp.join("").length < 6}
        style={{
          opacity: otp.join("").length < 6 ? 0.7 : 1,
        }}
        onPress={handleVerifyOtp}
      >
        {isOtpLoading ? (
          <View className="self-center animate-spin">
            <Feather name="loader" size={28} color="#ffffff" />
          </View>
        ) : (
          <Text className="text-white text-center text-2xl font-rubik-medium">
            Valider
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerification;
