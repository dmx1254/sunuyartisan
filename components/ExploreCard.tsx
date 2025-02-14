import { ArtisanDetail } from "@/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { calculateDistance } from "@/app/lib/utils";

const RenderCardMetier = ({
  item,
  reviewLength,
}: {
  item: ArtisanDetail;
  reviewLength: string | number;
}) => {
  const router = useRouter();
  const { width: w } = useWindowDimensions();
  const [distance, setDistance] = useState<number | null>(null);

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

  return (
    <TouchableOpacity
      className="mt-4 mb-8 overflow-hidden rounded-t-2xl z-40"
      onPress={() => router.push(`/artisan/${item.artisanId}`)}
      activeOpacity={0.7}
      style={{
        width: w / 2 - 24,
      }}
    >
      <View className="rounded-2xl bg-white">
        {/* Avatar et Badge Vérifié */}
        <View className="relative">
          <Image
            source={{ uri: item.user.avatar }}
            className="w-full h-48 rounded-t-2xl"
            resizeMode="cover"
          />
          {item.isVerified && (
            <View className="absolute top-3 left-3 bg-primary-300/90 px-3 py-1 rounded-full">
              <Text className="text-xs font-rubik-medium text-white">
                Vérifié
              </Text>
            </View>
          )}

          {/* Badge de note */}
          <View className="absolute top-3 right-3 flex-row items-center bg-white/95 px-2.5 py-1.5 rounded-full">
            <Text className="text-sm font-rubik-medium mr-1">
              {reviewLength}
            </Text>
            <Ionicons name="star" size={16} color="#FFB800" />
          </View>
        </View>

        <View className="py-4 px-2">
          {/* Informations principales */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-base font-rubik-bold text-black-300"
              numberOfLines={1}
            >
              {item.user.fullname}
            </Text>
            {distance !== null && (
              <Text className="text-sm font-rubik-bold text-primary-300">
                à &nbsp;{distance.toFixed(1)} km
              </Text>
            )}
          </View>

          {/* Catégorie et Spécialité */}
          <Text
            className="text-sm font-rubik-light text-black-200 capitalize mt-1"
            numberOfLines={1}
          >
            {item.category} • {item.sub_category}
          </Text>

          {/* Localisation et Distance */}
          <View className="flex-row items-center justify-between mt-2">
            <View className="flex-row items-center flex-1">
              <Ionicons name="location-outline" size={14} color="#666876" />
              <Text
                className="text-sm font-rubik-regular text-black-200 ml-1"
                numberOfLines={1}
              >
                {item.commune}
              </Text>
            </View>
            <Text className="text-xs font-rubik-medium px-2 py-1 bg-primary-50 text-primary-300 rounded-full">
              {item.availability}
            </Text>
          </View>

          {/* Prix et Disponibilité */}
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            {item.price ? (
              <Text className="text-sm font-rubik-bold text-primary-300">
                {item.price.toLocaleString()} FCFA/h
              </Text>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderCardMetier;
