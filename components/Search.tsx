// components/Search.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const handleSubmit = () => {
    router.push(`/explore?query=${search}`);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Trouver un artisan..."
          className="text-base font-rubik ml-2 flex-1 p-1 placeholder:text-gray-400"
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!search}
        className="bg-primary-300 p-1 rounded-full ml-1"
        style={{
          opacity: search ? 1 : 0.5,
        }}
      >
        <Ionicons name="search" size={20} className="p-0.5" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
