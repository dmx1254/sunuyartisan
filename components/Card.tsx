import { useEffect, useState } from "react";
import images from "@/app/lib/constants/images";
import { ArtisanDetail, JOB } from "@/types";
import { RelativePathString, useRouter } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import * as Location from "expo-location";
import { calculateDistance } from "@/app/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  item: JOB;
  onPress?: () => void;
}

interface CardItem {
  item: ArtisanDetail;
  reviewLength: string | number;
}

export const FeaturedCard = ({ item }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex flex-col items-start w-60 h-80 relative"
      activeOpacity={0.5}
      onPress={() => router.push(`/metiers/${item.slug}` as RelativePathString)}
    >
      <Image source={item.image} className="size-full rounded-2xl" />

      <Image
        source={images.imageGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            className="text-2xl font-rubik-extrabold text-white"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          {/* <Image source={images.heart} className="size-6" /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, reviewLength }: CardItem) => {
  const [distance, setDistance] = useState<number | null>(null);

  const router = useRouter();
  const { width: w } = useWindowDimensions();

  useEffect(() => {
    const getDistance = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        if (item.latitude && item.longitude) {
          const dist = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            parseFloat(item.latitude),
            parseFloat(item.longitude)
          );
          setDistance(dist);
        }
      }
    };

    getDistance();
  }, [item]);

  // console.log(item);

  // const dist = getDistance();

  // console.log(dist);

  return (
    <TouchableOpacity
      className="mt-4 mb-8 overflow-hidden rounded-t-2xl z-40"
      onPress={() =>
        // À remplacer par artisanId: 46e7b49f-23f7-4cce-8f9f-9f45219d48ae
        router.push(`/(user)/artisan/${item.artisanId}` as RelativePathString)
      }
      activeOpacity={0.5}
      style={{
        width: w / 2 - 32,
      }}
    >
      <View className="rounded-2xl bg-white">
        {/* Image Container avec Gradient */}
        <View className="relative">
          <Image
            source={
              item.user.avatar
                ? { uri: item.user.avatar }
                : require("@/assets/icons/defaultuser.png")
            }
            className="w-full h-48 rounded-t-2xl"
            resizeMode="cover"
          />

          {/* Badge Vérifié */}
          {item.isVerified && (
            <View className="absolute top-3 left-3 bg-white/95 rounded-full">
              {/* <Text className="text-xs font-rubik-medium text-white">
                Vérifié
              </Text> */}

              <MaterialIcons name="verified" size={18} color="#0061FF" />
            </View>
          )}

          {/* Note */}

          <View className="absolute top-3 right-3 flex-row items-center bg-white/95 px-2.5 py-1.5 rounded-full">
            <Image source={images.star} className="size-3.5" />
            <Text className="text-sm font-rubik-bold text-primary-300 ml-1">
              {reviewLength}
            </Text>
          </View>
        </View>

        {/* Contenu */}
        <View className="px-2 py-4">
          {/* En-tête */}
          <View className="flex-col items-start">
            <Text className="text-sm font-rubik-bold text-black-300 flex-1">
              {item.user.fullname}
            </Text>
          </View>

          {/* Informations */}
          <View className="space-y-1.5">
            <View className="flex-row items-center">
              <MaterialIcons
                name="work"
                size={14}
                color="#9A9DA1"
                className="mr-1"
              />
              <Text className="text-sm font-rubik-light">
                {item.sub_category}
              </Text>
            </View>
          </View>
          <View className="space-y-1.5">
            <View className="flex-row items-center">
              <Image
                source={images.location}
                className="size-4 mr-1"
                tintColor="#9A9DA1"
              />
              <Text className="text-sm font-rubik-bold">{item.region}</Text>
              <Text className="mx-1 font-rubik-bold text-xl">•</Text>
              <Text className="text-sm font-rubik-bold">{item.commune}</Text>
            </View>
          </View>
          <View className="space-y-1.5">
            <Text className="text-sm font-rubik-bold text-primary-300 flex-1 mx-1">
              à &nbsp;{distance?.toFixed(1)} km de vous
            </Text>
          </View>

          {/* Prix */}
          {/* {true && (
            <View className="mt-3 pt-3 border-t border-gray-100">
              <Text className="text-base font-rubik-bold text-primary-300">
                À partir de {1500} FCFA
              </Text>
            </View>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
