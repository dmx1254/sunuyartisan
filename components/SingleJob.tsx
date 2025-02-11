import { JOB } from "@/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";

const SingleJob = ({
  item,
  index,
  onSelect,
  categorySelected,
}: {
  item: JOB;
  index: number;
  onSelect: (field: string, val: string) => void;
  categorySelected: string;
}) => {
  // const [activeCategory, setActiveCategory] = useState<string>("");
  const router = useRouter();
  const { width: w } = useWindowDimensions();

  return (
    <View
      // entering={FadeInUp.delay(index * 100).springify()}
      // exiting={SlideOutLeft.duration(500)}
      // layout={LinearTransition.springify()}
      className={`w-full flex-col items-center border border-transparent rounded-2xl ${
        item.slug === categorySelected ? "bg-primary-400" : "bg-primary-50"
      }`}
      style={{
        width: w / 2 - 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {Platform.OS === "android" && <View className="mt-4" />}
      <TouchableOpacity
        activeOpacity={0.5}
        className="w-full flex-col items-center rounded-2xl"
        onPress={() => onSelect("category", item.slug)}
      >
        <View
          className={`items-center w-full bg-primary-100 p-4 rounded-2xl ${
            item.slug === categorySelected ? "bg-primary-200" : "bg-primary-100"
          }`}
        >
          <Image
            source={item.image}
            resizeMode="contain"
            className="w-32 h-28"
          />
        </View>
        <View className="p-4">
          <Text
            className={`text-2xl font-rubik-medium text-center ${
              item.slug === categorySelected ? "text-white" : "text-black-300"
            }`}
            numberOfLines={2}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleJob;
