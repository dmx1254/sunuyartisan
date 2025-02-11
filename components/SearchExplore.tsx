// components/SearchExplore.tsx (nouveau composant spécifique pour la page explore)
import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/app/lib/constants/images";

interface SearchExploreProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchExplore = ({ onSearch, searchQuery }: SearchExploreProps) => {
  const [search, setSearch] = useState<string>(searchQuery);

  const debouncedSearch = useDebouncedCallback((value) => {
    onSearch(value);
  }, 300);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Trouver un artisan..."
          className="text-base font-rubik ml-4 flex-1 placeholder:text-gray-400 p-1"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.searchbar} className="size-6" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchExplore;
