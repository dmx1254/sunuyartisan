import React, { useMemo, useState } from "react";
import jobs, { subJobs } from "@/app/lib/constants/data";
import { ArtisanFormData, JOB, SubJob } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SingleJob from "./SingleJob";

const FirstStep = ({
  onSelect,
  categorySelected,
}: {
  onSelect: (field: string, val: string) => void;
  categorySelected: string;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <View className="flex-1">
      <View className="py-4 flex-row items-center z-20">
        <View className="flex-1 items-center">
          <Text className="text-3xl font-rubik-bold text-gray-900">
            Choisir mon métier
          </Text>
          <Text className="text-ls font-rubik-regular text-gray-500 mt-1">
            Explorez les possibilités
          </Text>
        </View>
      </View>
      {/* <JobSearch searchTerm={searchTerm} handleChangeText={handleChangeText} /> */}
      <View className="flex-1 items-center mt-8">
        {/* <Text className="text-6xl font-rubik-bold my-6">Mon metier</Text> */}
        <View className="flex-1 flex-row justify-center gap-6 flex-wrap">
          {jobs.map((item, index) => (
            <SingleJob
              key={item.id}
              item={item}
              index={index}
              onSelect={onSelect}
              categorySelected={categorySelected}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default FirstStep;
