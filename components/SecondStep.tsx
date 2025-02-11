import React from "react";
import { subJobs } from "@/app/lib/constants/data";
import { SubJob } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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

const SecondStep = ({
  categorySelected,
  category,
  onSelect,
}: {
  category: string;
  onSelect: (field: string, sub_category: string) => void;
  categorySelected: string;
}) => {
  const filteredSubJobs = subJobs.find((j) => j.slug === category);

  // Animation de la hauteur pour la description
  const animatedHeight = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 300 }),
      transform: [
        {
          translateY: withSpring(0, {
            damping: 12,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  // Gérer l'animation lors de la sélection
  const handleSelect = (slug: string) => {
    if (categorySelected === slug) {
      animatedHeight.value = withSpring(0);
    } else {
      animatedHeight.value = withSpring(80); // Ajustez cette valeur selon la hauteur souhaitée
    }
    onSelect("sub_category", slug);
  };

  return (
    <View className="flex-1 py-4 justify-center mx-4 my-4">
      <Text className="text-2xl font-rubik-medium mb-4">
        Choisissez votre spécialité
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredSubJobs?.sousMetier.map((j: SubJob) => (
          <View key={j.id}>
            <TouchableOpacity
              onPress={() => handleSelect(j.slug)}
              className={`flex-row items-center p-4 mb-4 rounded-xl border ${
                categorySelected === j.slug
                  ? "border-primary-300 bg-primary-50"
                  : "border-gray-200"
              }`}
            >
              {/* Icône du métier */}
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${
                  categorySelected === j.id ? "bg-primary-300" : "bg-gray-100"
                }`}
              >
                <Ionicons
                  name="construct"
                  size={24}
                  color={categorySelected === j.id ? "white" : "#666876"}
                />
              </View>

              {/* Informations du métier */}
              <View className="flex-1 ml-4">
                <Text
                  className={`text-lg font-rubik-light ${
                    categorySelected === j.id
                      ? "text-primary-300 font-medium"
                      : "text-black-300"
                  }`}
                >
                  {j.metier}
                </Text>
              </View>

              {/* Indicateur de sélection */}
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  categorySelected === j.slug
                    ? "border-primary-300 bg-primary-300"
                    : "border-gray-300"
                }`}
              >
                {categorySelected === j.slug && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>

            {/* Description animée */}
            {categorySelected === j.slug && (
              <Animated.View
                layout={LinearTransition.springify()}
                className="overflow-hidden"
              >
                <View
                  // entering={FadeInRight.duration(400).springify()}
                  // exiting={FadeOut.duration(300)}
                  className="px-4 mt-2 mb-4"
                >
                  <Text className="text-black-100 text-lg font-rubik-light">
                    {j.description}
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SecondStep;
