import React from "react";
import { View, Text, Image } from "react-native";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={require("@/assets/images/no-result.png")}
        className="w-11/12 h-80"
        resizeMode="contain"
      />
      <Text className="text-2xl font-rubik-bold text-black-300 mt-5">
        Pas de résultats
      </Text>
      <Text className="text-base text-black-100 mt-2">
        Nous n'avons trouvé aucun résultat
      </Text>
    </View>
  );
};

export default NoResults;
