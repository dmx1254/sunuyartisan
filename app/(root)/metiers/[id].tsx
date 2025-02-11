import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
  useWindowDimensions,
  Platform,
} from "react-native";
import {
  RelativePathString,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArtisanDetail } from "@/types";
import { subJobs } from "@/app/lib/constants/data";
import { supabase } from "@/app/lib/supabase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { averageReviews } from "@/app/lib/utils";
import MetierSkeleton from "@/components/MetierSkeleton";
import RenderCardMetier from "@/components/RenderCardMetier";

const LIMIT = 20;

const MetierPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [artisans, setArtisans] = useState<ArtisanDetail[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState<{ [key: string]: number }>({});

  // Trouver les sous-métiers correspondants
  const categorySubJobs =
    subJobs.find((job) => job.slug === id)?.sousMetier || [];

  const fetchArtisans = async (start = 0, subcategory?: string) => {
    if (start === 0) setLoading(true);
    else setFetchingMore(true);

    try {
      let query = supabase
        .from("artisan_detail")
        .select(
          `
              *,
              user:users(avatar, phone, fullname)
            `
        )
        .range(start, start + LIMIT - 1);

      // Si l'id n'est pas 'tous', alors filtrer par catégorie
      if (id && id !== "all") {
        query = query.eq("category", id);
      }

      if (subcategory) {
        query = query.eq("sub_category", subcategory);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (start === 0) {
        setArtisans(data || []);
      } else {
        setArtisans((prev) => [...prev, ...(data || [])]);
      }

      setHasMore((data || []).length === LIMIT);
    } catch (error) {
      console.error("Error fetching artisans:", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  const fetchArtisansReviews = async (artisanIds: string[]) => {
    const { data, error } = await supabase
      .from("reviews")
      .select("artisanId, rate")
      .in("artisanId", artisanIds);

    if (error) {
      console.error("Error fetching reviews:", error);
      return;
    }

    // Calculate average for each artisan
    const reviewsAverage = artisanIds.reduce((acc, artisanId) => {
      const artisanReviews = data.filter(
        (review) => review.artisanId === artisanId
      );
      const rates = artisanReviews.map((review) => Number(review.rate));
      acc[artisanId] = Number(averageReviews(rates, artisanReviews.length));
      return acc;
    }, {} as { [key: string]: number });

    setReviews(reviewsAverage);
  };

  useEffect(() => {
    fetchArtisans(0, selectedSubCategory || undefined);
  }, [id, selectedSubCategory]);

  useEffect(() => {
    if (artisans.length > 0) {
      fetchArtisansReviews(artisans.map((a) => a.artisanId));
    }
  }, [artisans]);

  const filteredArtisans = useMemo(() => {
    return artisans.filter(
      (artisan) =>
        artisan.user.fullname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        artisan.sub_category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        artisan.commune.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [artisans, searchQuery]);

  const handleLoadMore = () => {
    if (!hasMore || fetchingMore || loading) return;
    fetchArtisans(artisans.length, selectedSubCategory || undefined);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Header */}
      <View className="bg-primary-300 px-4 pt-16 pb-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-rubik-bold">
            {id === "all"
              ? "Tous les artisans"
              : subJobs.find((job) => job.slug === id)?.metier}
          </Text>
        </View>
      </View>

      {/* Barre de recherche */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
          <Ionicons name="search" size={20} color="#8C8E98" />
          <TextInput
            className="flex-1 ml-2  placeholder:text-black font-rubik-regular p-2"
            placeholder="Rechercher un artisan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8C8E98" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {id === "all" && (
        <View className="py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {subJobs.map((job, index) => (
              <TouchableOpacity
                key={`${job.id}-${index}`}
                onPress={() =>
                  router.push(
                    `/(root)/metiers/${job.slug}` as RelativePathString
                  )
                }
                className="mr-2 px-4 py-2 rounded-full bg-gray-100"
              >
                <Text className="text-black-300 font-rubik-medium">
                  {job.metier}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Sous-catégories */}
      {id && id !== "all" && (
        <View className="py-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            <TouchableOpacity
              onPress={() => setSelectedSubCategory(null)}
              className={`mr-2 px-4 py-2 rounded-full ${
                !selectedSubCategory ? "bg-primary-300" : "bg-gray-100"
              }`}
            >
              <Text
                className={`${
                  !selectedSubCategory ? "text-white" : "text-black-300"
                } font-rubik-medium`}
              >
                Tous
              </Text>
            </TouchableOpacity>
            {categorySubJobs.map((subJob, index) => (
              <TouchableOpacity
                key={`${subJob.slug}-${index}`}
                onPress={() => setSelectedSubCategory(subJob.slug)}
                className={`mr-2 px-4 py-2 rounded-full ${
                  selectedSubCategory === subJob.slug
                    ? "bg-primary-300"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedSubCategory === subJob.slug
                      ? "text-white"
                      : "text-black-300"
                  } font-rubik-medium`}
                >
                  {subJob.metier}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Liste des artisans */}
      {loading ? (
        <MetierSkeleton />
      ) : (
        <FlatList
          data={filteredArtisans}
          keyExtractor={(item) => item.id}
          className="px-4"
          numColumns={2}
          renderItem={({ item }) => (
            <RenderCardMetier
              item={item}
              reviewLength={reviews[item.artisanId] || "0.0"}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5"
          ListFooterComponent={
            fetchingMore ? (
              <View className="py-4">
                <ActivityIndicator size="small" color="#0061FF" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-8">
              <Text className="text-black-100 font-rubik-medium">
                Aucun artisan trouvé
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default MetierPage;
