import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/Auth";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../lib/supabase";
import { averageReviews } from "../lib/utils";

interface Review {
  id: string;
  rate: number;
  message: string;
  userId: string;
  artisanId: string;
  created_at: string;
}

interface User {
  id: string;
  created_at: string;
  updated_at: string;
  role: "ARTISAN" | "PARTICULIER" | "ADMINISTRATION";
  phone: string;
  avatar: string;
  fullname: string;
}

interface ArtisanDetail {
  id: string;
  created_at: string;
  artisanId: string;
  category: string;
  sub_category: string;
  rating: number | null;
  isVerified: boolean;
  availability: string;
  region: string;
  address: string;
  price: number | null;
  commune: string;
  latitude: string;
  longitude: string;
  age: string;
  department: string;
}

// Composants réutilisables
const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="bg-white rounded-xl p-4 mb-4">
    <Text className="text-xl font-rubik-bold mb-4">{title}</Text>
    {children}
  </View>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => (
  <View className="flex-row items-center justify-between py-2">
    <Text className="font-rubik-semibold">{label}</Text>
    <Text className="font-rubik-light">{value || "Non renseigné"}</Text>
  </View>
);

const EditableInfoItem = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "number-pad" | "phone-pad";
}) => (
  <View className="py-2">
    <Text className="font-rubik-semibold mb-2">{label}</Text>
    <TextInput
      className="bg-gray-100 p-4 rounded-xl font-rubik-regular"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const UserInfo = () => {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<Partial<User & ArtisanDetail>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Queries
  const { data: userDetails } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data as User;
    },
  });

  const { data: artisanDetails } = useQuery({
    queryKey: ["artisan", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artisan_detail")
        .select("*")
        .eq("artisanId", user?.id)
        .single();

      if (error) throw error;
      return data as ArtisanDetail;
    },
    enabled: userDetails?.role === "ARTISAN",
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["artisan-reviews", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("artisanId", user?.id);

      if (error) throw error;
      return data as Review[];
    },
    enabled: userDetails?.role === "ARTISAN",
  });

  // Calculer la moyenne des reviews
  const averageRating = useMemo(() => {
    if (!reviewsData?.length) return 0;
    const rates = reviewsData.map((review) => Number(review.rate));
    return averageReviews(rates, reviewsData.length);
  }, [reviewsData]);

  // Initialiser les données d'édition
  useEffect(() => {
    if (userDetails) {
      setEditedUser({
        fullname: userDetails.fullname,
        phone: userDetails.phone,
        ...artisanDetails,
      });
    }
  }, [userDetails, artisanDetails]);

  // Gérer la sauvegarde
  const handleSave = async () => {
    if (!editedUser.fullname || !editedUser.phone) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mise à jour user
      const { error: userError } = await supabase
        .from("users")
        .update({
          fullname: editedUser.fullname,
          phone: editedUser.phone,
        })
        .eq("id", user?.id);

      if (userError) throw userError;

      // Si artisan, mise à jour artisan_detail
      if (userDetails?.role === "ARTISAN") {
        const { error: artisanError } = await supabase
          .from("artisan_detail")
          .update({
            availability: editedUser.availability,
            region: editedUser.region,
            commune: editedUser.commune,
            address: editedUser.address,
            price: editedUser.price,
            age: editedUser.age,
            department: editedUser.department,
          })
          .eq("artisanId", user?.id);

        if (artisanError) throw artisanError;
      }

      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["artisan", user?.id] });

      Alert.alert("Succès", "Vos informations ont été mises à jour");
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <View className="flex-1 bg-backgr-100">
      <StatusBar style="light" />
      <View className="relative">
        <Image
          source={
            userDetails?.avatar
              ? { uri: userDetails.avatar }
              : require("@/assets/icons/defaultuser.png")
          }
          className="w-full h-48"
        />
        <View
          className="absolute w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <View className="absolute top-14 left-4 right-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-primary-50 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#0061FF" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-rubik-bold">
            Mon Profil
          </Text>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            className="bg-primary-50 rounded-full p-2 text-center"
          >
            <Ionicons
              name={isEditing ? "close" : "create-sharp"}
              size={24}
              color="#0061FF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* Profile Section */}
        <View className="flex-row items-center mb-6">
          <Text className="text-xl font-rubik-bold mr-2">
            {userDetails?.fullname}
          </Text>
          <Text className="font-rubik-light text-xl">•</Text>
          <Text className="text-black-100 text-lg font-rubik-medium ml-2">
            {userDetails?.role === "ARTISAN"
              ? artisanDetails?.sub_category
              : "Client"}
          </Text>
        </View>

        {/* Informations de base */}
        <InfoSection title="Informations personnelles">
          {isEditing ? (
            <>
              <EditableInfoItem
                label="Nom complet"
                value={editedUser.fullname || ""}
                onChangeText={(text) =>
                  setEditedUser((prev) => ({ ...prev, fullname: text }))
                }
              />
              <EditableInfoItem
                label="Téléphone"
                value={editedUser.phone || ""}
                onChangeText={(text) =>
                  setEditedUser((prev) => ({ ...prev, phone: text }))
                }
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <InfoItem label="Téléphone" value={userDetails?.phone} />
              <InfoItem
                label="Membre depuis"
                value={new Date(
                  userDetails?.created_at || ""
                ).toLocaleDateString("fr-FR")}
              />
            </>
          )}
        </InfoSection>

        {/* Informations Artisan */}
        {userDetails?.role === "ARTISAN" && artisanDetails && (
          <>
            <InfoSection title="Informations professionnelles">
              {isEditing ? (
                <>
                  <EditableInfoItem
                    label="Disponibilité"
                    value={editedUser.availability || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({ ...prev, availability: text }))
                    }
                  />
                  <EditableInfoItem
                    label="Tarif horaire"
                    value={editedUser.price?.toString() || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        price: Number(text),
                      }))
                    }
                    keyboardType="number-pad"
                  />
                </>
              ) : (
                <>
                  <InfoItem label="Catégorie" value={artisanDetails.category} />
                  <InfoItem
                    label="Spécialité"
                    value={artisanDetails.sub_category}
                  />
                  <InfoItem
                    label="Disponibilité"
                    value={artisanDetails.availability}
                  />
                  <InfoItem
                    label="Tarif horaire"
                    value={
                      artisanDetails.price
                        ? `${artisanDetails.price} FCFA/h`
                        : null
                    }
                  />
                </>
              )}
            </InfoSection>

            <InfoSection title="Localisation">
              {isEditing ? (
                <>
                  <EditableInfoItem
                    label="Région"
                    value={editedUser.region || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({ ...prev, region: text }))
                    }
                  />
                  <EditableInfoItem
                    label="Département"
                    value={editedUser.department || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({ ...prev, department: text }))
                    }
                  />
                  <EditableInfoItem
                    label="Commune"
                    value={editedUser.commune || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({ ...prev, commune: text }))
                    }
                  />
                  <EditableInfoItem
                    label="Adresse"
                    value={editedUser.address || ""}
                    onChangeText={(text) =>
                      setEditedUser((prev) => ({ ...prev, address: text }))
                    }
                  />
                </>
              ) : (
                <>
                  <InfoItem label="Région" value={artisanDetails.region} />
                  <InfoItem
                    label="Département"
                    value={artisanDetails.department}
                  />
                  <InfoItem label="Commune" value={artisanDetails.commune} />
                  <InfoItem label="Adresse" value={artisanDetails.address} />
                </>
              )}
            </InfoSection>

            <InfoSection title="Autres informations">
              {isEditing ? (
                <EditableInfoItem
                  label="Âge"
                  value={editedUser.age || ""}
                  onChangeText={(text) =>
                    setEditedUser((prev) => ({ ...prev, age: text }))
                  }
                  keyboardType="number-pad"
                />
              ) : (
                <>
                  <InfoItem label="Âge" value={`${artisanDetails.age} ans`} />
                  <InfoItem
                    label="Note moyenne"
                    value={
                      Number(averageRating) > 0
                        ? `${averageRating}/5`
                        : "Aucune note"
                    }
                  />
                </>
              )}
            </InfoSection>
          </>
        )}

        {/* Boutons d'action en mode édition */}
        {isEditing ? (
          <View className="flex-row gap-4 mt-4">
            <TouchableOpacity
              className="flex-1 bg-primary-900 p-4 rounded-xl"
              onPress={() => {
                setIsEditing(false);
                setEditedUser({
                  fullname: userDetails?.fullname,
                  phone: userDetails?.phone,
                  ...artisanDetails,
                });
              }}
            >
              <Text className="text-white text-center font-rubik-bold">
                Annuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-primary-300 p-4 rounded-xl"
              onPress={handleSave}
              disabled={isSubmitting}
            >
              <Text className="text-white text-center font-rubik-bold">
                {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-primary-300 p-4 rounded-xl mt-4"
            onPress={() => router.push("/(user)/security")}
          >
            <Text className="text-white text-center text-lg font-rubik-bold">
              Paramètres de sécurité
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default UserInfo;
