import React from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
type KeyBoardUser = "numeric" | "email-address" | "phone-pad" | "default";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  getCurrentLocation,
  geolocationLoading,
  keyboard = "default",
  secu = false,
  icon,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  getCurrentLocation?: () => void;
  geolocationLoading?: boolean;
  keyboard?: KeyBoardUser;
  secu?: boolean;
  icon?: string;
}) => (
  <View className="relative mb-4">
    <Text className="text-black-200 text-lg mb-2 font-rubik-medium">
      {label}
    </Text>
    <TextInput
      value={value}
      onChangeText={(text: string) => onChangeText(text)}
      placeholder={placeholder}
      keyboardType={keyboard}
      className="bg-white border relative border-primary-300 p-4 rounded-xl text-xl placeholder:text-gray-400"
      numberOfLines={2}
      secureTextEntry={secu}
    />

    {label === "Adresse" && (
      <>
        {geolocationLoading && (
          <View
            style={{
              position: "absolute",
              top: 40,
              right: 10,
              backgroundColor: "#E6F0FF",
              padding: 2,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#0061FF",
              zIndex: 100,
              elevation: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            className="animate-spin"
          >
            <Ionicons name="reload-circle" size={28} color="#0061FF" />
          </View>
        )}
        {!geolocationLoading && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              position: "absolute",
              top: 42,
              right: 10,
              backgroundColor: "#E6F0FF",
              padding: 2,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#0061FF",
              zIndex: 100,
              elevation: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={getCurrentLocation}
          >
            <Ionicons name="location" size={28} color="#0061FF" />
          </TouchableOpacity>
        )}
      </>
    )}
  </View>
);

export default CustomInput;
