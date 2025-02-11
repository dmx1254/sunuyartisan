import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";

import { subCat } from "@/app/lib/constants/data";
import { ICATEGORY } from "@/types";

interface FiltersProps {
  onSelectCategory: (category: string) => void;
}

const Filters = ({ onSelectCategory }: FiltersProps) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "tous"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      onSelectCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    onSelectCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="my-4"
    >
      {subCat.map((item: ICATEGORY, index: number) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.slug)}
          key={`${item.slug}-${index}`}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item.slug
              ? "bg-primary-300"
              : "bg-primary-50 border border-primary-200"
          }`}
        >
          <Text
            className={`text-base ${
              selectedCategory === item.slug
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
