import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/app/lib/supabase";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { averageReviews, calculateDistance } from "@/app/lib/utils";
import ArtisanSkeleton from "@/components/ArtisanSkeleton";
import ReviewCard from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import InfoItem from "@/components/InfoItem";
import icons from "../../lib/constants/images";
import { useAuth } from "@/components/Auth";
import AppointmentModal from "@/components/AppointmentModal";
import { StatusBar } from "expo-status-bar";

const fetchArtisanDetails = async (id: string) => {
  const { data, error } = await supabase
    .from("artisan_detail")
    .select(`*, user:users(avatar, phone, fullname)`)
    .eq("artisanId", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Artisan non trouvé");
  return data;
};

const fetchArtisanReviews = async (id: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select(`*, user:users!reviews_userId_fkey(fullname, avatar)`)
    .eq("artisanId", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    throw error;
  }
  return data || [];
};

const ArtisanDetails = () => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams();
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [isAppointmentLoading, setIsAppointmentLoading] = useState(false);

  const { chat, phone } = icons;

  const { data: artisan, isLoading: isLoadingArtisan } = useQuery({
    queryKey: ["artisan", id],
    queryFn: () => fetchArtisanDetails(id as string),
    staleTime: 1000 * 60 * 15,
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["artisanReviews", { id }],
    queryFn: () => fetchArtisanReviews(id as string),
    staleTime: 1000 * 60 * 15,
  });

  const handleAddReview = async (review: { rate: number; message: string }) => {
    setIsReviewLoading(true);
    try {
      const { error } = await supabase.from("reviews").insert([
        {
          artisanId: id,
          userId: user!.id,
          ...review,
        },
      ]);

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ["artisanReviews", { id }],
      });
      setIsReviewModalVisible(false);
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter l'avis");
    } finally {
      setIsReviewLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }
    })();
  }, []);

  const distance = useMemo(() => {
    if (!userLocation || !artisan) return null;
    return calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      parseFloat(artisan.latitude),
      parseFloat(artisan.longitude)
    );
  }, [userLocation, artisan]);

  const handleCreateAppointment = async ({
    service,
    userLocation,
  }: {
    service: string;
    userLocation: { latitude: number; longitude: number };
  }) => {
    if (!user) {
      Alert.alert(
        "Erreur",
        "Vous devez être connecté pour prendre un rendez-vous"
      );
      return;
    }

    setIsAppointmentLoading(true);
    try {
      const { error } = await supabase.from("appointment").insert([
        {
          userId: user.id,
          artisanId: artisan.artisanId,
          service,
          userlocation: JSON.stringify(userLocation),
          status: "pending",
        },
      ]);

      if (error) throw error;

      Alert.alert(
        "Succès",
        "Votre demande de rendez-vous a été envoyée avec succès"
      );
      setIsAppointmentModalVisible(false);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la demande de rendez-vous"
      );
    } finally {
      setIsAppointmentLoading(false);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${artisan.user.phone}`);
  };

  if (isLoadingArtisan || isLoadingReviews) {
    return <ArtisanSkeleton />;
  }

  if (!artisan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Artisan non trouvé</Text>
      </View>
    );
  }

  const reviewExits = reviews ? reviews.map((r) => Number(r.rate)) : 0;
  const revs = averageReviews(reviewExits, reviews?.length || 0);

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      {Platform.OS === "android" && <View className="mt-4" />}
      <TouchableOpacity
        onPress={() => router.back()}
        className="z-20 rounded-full p-4"
      >
        <Ionicons name="arrow-back" size={26} color="#0061FF" />
      </TouchableOpacity>
      <ScrollView className="flex-1">
        {/* Image de couverture */}
        <View className="relative flex items-center justify-center my-4 p-2">
          <Image
            className="w-48 h-48 object-cover justify-center rounded-full border-4 border-primary-200"
            resizeMode="cover"
            source={{ uri: artisan.user.avatar }}
          />
          <View />
        </View>

        {/* Informations principales */}
        <View className="flex items-center justify-center">
          {artisan.isVerified && (
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="verified" size={18} color="#0061FF" />
              <Text className="text-lg">Vérifié</Text>
            </View>
          )}
          <View className="flex flex-col items-start gap-2 px-4 py-2">
            <View className="flex-row items-center justify-center">
              <Text className="text-lg font-rubik-bold">
                {artisan.user.fullname}
              </Text>
              <Text className="mx-4 font-rubik-light text-lg">•</Text>
              <View className="flex-row items-center">
                <Text>{revs}</Text>
                <FontAwesome
                  name="star"
                  size={16}
                  color="#FFD700"
                  className="mx-1"
                />
                <Text>({reviews?.length || 0} avis)</Text>
              </View>
            </View>
            <Text className="text-lg font-rubik-medium capitalize">
              {artisan.category}{" "}
              <Text className="mx-4 font-rubik-light text-lg">-</Text>{" "}
              {artisan.sub_category}
            </Text>
          </View>
        </View>

        {/* Distance */}
        <View className="w-full flex-row items-center justify-between gap-4 p-4">
          {distance && (
            <View className="flex-row items-center gap-2 py-2">
              <Ionicons name="location" size={18} color="#0061FF" />
              <Text className="text-base font-rubik-semibold text-primary-300">
                À {distance.toFixed(1)} km de vous
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              className=" text-blue-500"
              onPress={() =>
                router.push(`/(user)/message/${artisan.artisanId}`)
              }
              activeOpacity={0.5}
              disabled={!user}
              style={{
                opacity: user ? 1 : 0.5,
              }}
            >
              <Image
                source={chat}
                className="w-8 h-8 object-cover"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              className=" text-blue-500"
              onPress={handleCall}
              activeOpacity={0.5}
              disabled={!user}
              style={{
                opacity: user ? 1 : 0.5,
              }}
            >
              <Image
                source={phone}
                className="w-8 h-8 object-cover"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section À propos */}
        <View className="px-4">
          <View className="w-full flex-row items-center justify-between mb-4">
            <Text className="text-lg font-rubik-bold">À propos</Text>
            <TouchableOpacity
              className="bg-blue-500 rounded-full shadow-lg"
              activeOpacity={0.5}
              onPress={() => setIsAppointmentModalVisible(true)}
              disabled={!user}
              style={{
                opacity: user ? 1 : 0.5,
              }}
            >
              <Text className="text-white text-sm font-rubik-bold p-2">
                Réserver un rendez-vous
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-col items-start gap-4">
            <View className="flex-row gap-4">
              <InfoItem
                icon="location"
                text={`${artisan.commune}, ${artisan.region}`}
                subtitle="Zone d'intervention"
              />
              <InfoItem
                icon="time"
                text={artisan.availability}
                subtitle="Disponibilité"
              />
            </View>
            <View className="flex-row gap-4">
              <InfoItem
                icon="person"
                text={`${artisan.age} ans`}
                subtitle="Âge"
              />
              <InfoItem
                icon="location-sharp"
                text={artisan.department}
                subtitle="Département"
              />
            </View>
          </View>
        </View>

        {/* Section Adresse */}
        <View className="flex-col items-start gap-1 p-4">
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={18} color="#9ca3af" />
            <Text className="text-base font-rubik-bold">Adresse</Text>
          </View>
          <Text className="font-rubik-light text-base">{artisan.address}</Text>
        </View>

        {/* Section Avis */}
        <View className="p-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-base font-rubik-semibold">
              Avis clients ({reviews?.length || 0})
            </Text>
            <Text className="text-lg font-rubik-light mx-1">•</Text>
            <TouchableOpacity onPress={() => setIsReviewModalVisible(true)}>
              <Text className="text-base font-rubik-semibold text-primary-300">
                Ajouter un avis
              </Text>
            </TouchableOpacity>
          </View>

          {reviews?.length === 0 ? (
            <View>
              <Text>Aucun avis pour le moment</Text>
            </View>
          ) : (
            reviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </View>

        {/* Espace en bas pour les boutons fixes */}
        <View />
      </ScrollView>

      <AppointmentModal
        visible={isAppointmentModalVisible}
        onClose={() => setIsAppointmentModalVisible(false)}
        onSubmit={handleCreateAppointment}
        isLoading={isAppointmentLoading}
      />

      <ReviewModal
        visible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onSubmit={handleAddReview}
        isReviewLoading={isReviewLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFD",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#F75555",
    textAlign: "center",
  },
});

export default ArtisanDetails;
