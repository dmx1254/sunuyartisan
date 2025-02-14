import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabase";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/components/Auth";
import MapSkeleton from "@/components/MapSkeleton";

interface Appointment {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  artisanId: string;
  service: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  artisan: {
    fullname: string;
    avatar: string;
  };
  client: {
    fullname: string;
    avatar: string;
  };
  userlocation: {
    latitude: number;
    longitude: number;
  };
}

interface RouteCoordinates {
  latitude: number;
  longitude: number;
}

const getInitialRegion = (userLocation: any, artisanLocation: any) => {
  if (!userLocation || !artisanLocation) {
    // Valeurs par défaut si pas de données
    return {
      latitude: userLocation?.latitude || 14.728094,
      longitude: userLocation?.longitude || -17.208889,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    };
  }

  // On part de la position de l'artisan (point de départ)
  const startLat = parseFloat(artisanLocation.latitude);
  const startLng = parseFloat(artisanLocation.longitude);

  // Vers la position du client (destination)
  const destLat = userLocation.latitude;
  const destLng = userLocation.longitude;

  // Centre de la carte
  const midLat = (startLat + destLat) / 2;
  const midLng = (startLng + destLng) / 2;

  // Calculer les deltas pour voir tout l'itinéraire
  const latDelta = Math.abs(startLat - destLat) * 2; // Facteur 2 pour avoir de la marge
  const lngDelta = Math.abs(startLng - destLng) * 2;

  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: Math.max(latDelta, 0.02), // Zoom minimum plus large
    longitudeDelta: Math.max(lngDelta, 0.02),
  };
};

const ScheduleDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { height: h, width: w } = useWindowDimensions();
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinates[]>(
    []
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["schedule", id],
    queryFn: async () => {
      const { data: appointmentData, error } = await supabase
        .from("appointment")
        .select(
          `
          *,
          artisan:users!appointment_artisanId_fkey(fullname, avatar),
          client:users!appointment_userId_fkey(fullname, avatar)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      if (appointmentData) {
        const { data: artisanDetails } = await supabase
          .from("artisan_detail")
          .select("latitude, longitude")
          .eq("artisanId", appointmentData.artisanId)
          .single();

        return {
          ...appointmentData,
          artisanLocation: artisanDetails,
        };
      }
      return null;
    },
  });

  useEffect(() => {
    const fetchRoute = async () => {
      if (data?.artisanLocation && data?.userlocation) {
        try {
          const userLocation =
            typeof data.userlocation === "string"
              ? JSON.parse(data.userlocation)
              : data.userlocation;

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${data.artisanLocation.latitude},${data.artisanLocation.longitude}&destination=${userLocation.latitude},${userLocation.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );

          const result = await response.json();

          if (result.routes.length > 0) {
            const points = decodePolyline(
              result.routes[0].overview_polyline.points
            );
            setRouteCoordinates(points);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'itinéraire:",
            error
          );
        }
      }
    };

    fetchRoute();
  }, [data]);

  const decodePolyline = (encoded: string): RouteCoordinates[] => {
    const points: RouteCoordinates[] = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let shift = 0,
        result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  if (!data) {
    return (
      <View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-primary-300 text-2xl font-rubik-bold">
            Rendez-vous introuvable
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return <MapSkeleton />;
  }

  const locationData =
    typeof data.userlocation === "string"
      ? JSON.parse(data.userlocation)
      : data.userlocation;

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <View className="flex-1 relative bg-white">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute left-4 top-20 bg-white z-10"
      >
        <Ionicons name="close-circle" size={28} color="#0061FF" />
      </TouchableOpacity>

      {data.userlocation && (
        <View className="flex-1 rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              width: w,
              height: h,
            }}
            initialRegion={getInitialRegion(
              locationData,
              data?.artisanLocation
            )}
          >
            {locationData && data?.artisanLocation && (
              <>
                <Marker
                  coordinate={{
                    latitude: locationData.latitude || 0,
                    longitude: locationData.longitude || 0,
                  }}
                  title="Point de rendez-vous"
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(data.artisanLocation.latitude) || 0,
                    longitude: parseFloat(data.artisanLocation.longitude) || 0,
                  }}
                  pinColor="blue"
                >
                  <Callout tooltip>
                    <View
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                        borderColor: "#ccc",
                        borderWidth: 1,
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        Position de l'artisan
                      </Text>
                    </View>
                  </Callout>
                </Marker>

                {/* Tracé de l'itinéraire */}
                {routeCoordinates.length > 0 && (
                  <Polyline
                    coordinates={routeCoordinates}
                    strokeWidth={3}
                    strokeColor="#0061FF"
                  />
                )}
              </>
            )}
          </MapView>
          <View className="absolute bottom-4 left-4 right-4">
            <View className="bg-white p-4 rounded-xl shadow-lg">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-rubik-bold">
                  Informations sur le trajet
                </Text>
                <Ionicons name="information-circle" size={24} color="#0061FF" />
              </View>

              <View className="space-y-3">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-red-50 rounded-full mr-3 items-center justify-center border-2 border-white shadow">
                    <Ionicons name="location" size={16} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="font-rubik-semibold">
                      Point de rendez-vous
                    </Text>
                    <Text className="text-gray-500 text-sm font-rubik-light">
                      Lieu de rencontre prévu
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-primary-50 rounded-full mr-3 items-center justify-center border-2 border-white shadow">
                    <Ionicons name="location" size={16} color="#0061FF" />
                  </View>
                  <View>
                    <Text className="font-rubik-semibold">
                      Position de l'artisan
                    </Text>
                    <Text className="text-gray-500 text-sm font-rubik-light">
                      Localisation actuelle
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <View className="w-8 h-8 mr-3 items-center justify-center">
                    <Ionicons name="git-branch" size={20} color="#0061FF" />
                  </View>
                  <View>
                    <Text className="font-rubik-semibold">Itinéraire</Text>
                    <Text className="text-gray-500 text-sm font-rubik-light">
                      Chemin le plus rapide
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScheduleDetails;
