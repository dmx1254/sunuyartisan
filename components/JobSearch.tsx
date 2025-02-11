import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const JobSearch = ({
  searchTerm,
  handleChangeText,
}: {
  searchTerm: string;
  handleChangeText: (value: string) => void;
}) => {
  return (
    <View className="relative flex-row mx-4 border border-primary-200 rounded-2xl">
      <View className="absolute z-20 top-4 left-4">
        <Ionicons name="search-outline" size={32} color="#94a3b8" />
      </View>
      <TextInput
        className="w-full rounded-2xl bg-white text-xl font-rubik-medium pr-4 py-4 placeholder:text-gray-500 pl-16"
        placeholder="Rechercher votre metier"
        value={searchTerm}
        onChangeText={(value) => handleChangeText(value)}
      />
    </View>
  );
};

export default JobSearch;
