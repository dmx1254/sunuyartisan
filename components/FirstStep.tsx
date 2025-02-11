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
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeIn,
  FadeOut,
  LinearTransition,
  FadeInRight,
} from "react-native-reanimated";
import SingleJob from "./SingleJob";

const FirstStep = ({
  onSelect,
  categorySelected,
}: {
  onSelect: (field: string, val: string) => void;
  categorySelected: string;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [filteredJobs, setFilteredJobs] =
  //   useState<Array<(typeof jobs)[number]>>(jobs);
  // const handleChangeText = (searchTerm: string) => {
  //   setSearchTerm(searchTerm);
  // };

  // useMemo(() => {
  //   const filtered = jobs.filter((job) =>
  //     job.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredJobs(filtered);
  // }, [searchTerm]);

  return (
    <View className="flex-1">
      <StatusBar hidden={true} backgroundColor="#000" barStyle="dark-content" />

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
          {/* <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <SingleJob item={item} index={index} onSelect={onSelect} />
            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 10,
              marginHorizontal: 20,
              marginTop: 20,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default FirstStep;
