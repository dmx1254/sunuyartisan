// app/(user)/explore.tsx
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import RenderCardMetier from "@/components/RenderCardMetier";
import { supabase } from "@/app/lib/supabase";
import { ArtisanDetail } from "@/types";
import LocationFilter from "@/components/LocationFilter";
import SearchExplore from "@/components/SearchExplore";
import { averageReviews } from "@/app/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import MetierSkeleton from "@/components/MetierSkeleton";

const Explore = () => {
  const router = useRouter();
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(routeQuery || "");
  const [searchResults, setSearchResults] = useState<ArtisanDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState<{
    region?: string;
    department?: string;
    commune?: string;
  }>({
    region: "",
    department: "",
    commune: "",
  });
  const [reviews, setReviews] = useState<{ [key: string]: number }>({});
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const LIMIT = 20;

  // console.log(routeQuery);
  // console.log("searchQuery: " + searchQuery);

  const fetchResults = async (isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);
    try {
      const from = isLoadMore ? page * LIMIT : 0;
      const to = from + LIMIT - 1;

      let supabaseQuery = supabase
        .from("artisan_detail")
        .select(
          `
          *,
          user:users!artisan_detail_artisanId_fkey(fullname, avatar)
        `
        )
        .range(from, to);

      // Ajout des filtres de recherche
      if (searchQuery) {
        supabaseQuery = supabaseQuery.or(
          `category.ilike.%${searchQuery}%,sub_category.ilike.%${searchQuery}%`
        );
      }

      // Ajout des filtres de localisation avec ilike pour ignorer la casse
      if (locationFilter.region) {
        supabaseQuery = supabaseQuery.ilike("region", locationFilter.region);
      }
      if (locationFilter.department) {
        supabaseQuery = supabaseQuery.ilike(
          "department",
          locationFilter.department
        );
      }
      if (locationFilter.commune) {
        supabaseQuery = supabaseQuery.ilike("commune", locationFilter.commune);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      if (data) {
        // Gestion des reviews comme avant
        const artisanIds = data.map((artisan) => artisan.artisanId);
        const { data: reviewsData } = await supabase
          .from("reviews")
          .select("artisanId, rate")
          .in("artisanId", artisanIds);

        if (reviewsData) {
          const reviewsAverage = artisanIds.reduce((acc, artisanId) => {
            const artisanReviews = reviewsData.filter(
              (review) => review.artisanId === artisanId
            );
            const rates = artisanReviews.map((review) => Number(review.rate));
            acc[artisanId] = Number(
              averageReviews(rates, artisanReviews.length)
            );
            return acc;
          }, {} as { [key: string]: number });

          setReviews(reviewsAverage);
        }

        // Mise à jour des résultats
        if (isLoadMore) {
          setSearchResults((prev) => [...prev, ...data]);
        } else {
          setSearchResults(data);
        }

        // Vérifier s'il y a plus de résultats
        setHasMore(data.length === LIMIT);
        if (isLoadMore) setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(0);
    fetchResults();
  };

  const handleLoadMore = () => {
    if (hasMore) {
      fetchResults(true);
    }
  };

  // Effect qui s'exécute quand searchQuery ou locationFilter changent
  useEffect(() => {
    fetchResults();
  }, [searchQuery, locationFilter]);

  // Gestionnaire pour la recherche en temps réel
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Pas besoin d'appeler fetchResults ici car l'useEffect s'en chargera
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <View className="bg-primary-300 pt-16 px-4 pb-4">
        <TouchableOpacity
          className="p-2 mb-3 h-10 w-10 rounded-full justify-center bg-white"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#0061FF" />
        </TouchableOpacity>
        <SearchExplore onSearch={handleSearch} searchQuery={searchQuery} />
      </View>
      <LocationFilter onFilterChange={setLocationFilter} />

      {loading && !refreshing ? (
        <MetierSkeleton />
      ) : (
        <View className="flex-1 px-4">
          {searchResults.length > 0 ? (
            <FlatList
              key="grid-2"
              data={searchResults}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperClassName="flex justify-between"
              contentContainerClassName="pb-5"
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              renderItem={({ item }) => (
                <RenderCardMetier
                  item={item}
                  reviewLength={reviews[item.artisanId] || 0}
                />
              )}
              ListFooterComponent={() =>
                hasMore ? (
                  <View className="py-4">
                    <TouchableOpacity
                      className="bg-primary-300 px-4 py-2 rounded-full self-center"
                      onPress={handleLoadMore}
                    >
                      <Text className="text-white font-rubik-medium">
                        Voir plus
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null
              }
            />
          ) : (
            routeQuery && (
              <View className="flex-1 items-center justify-center">
                <Text className="text-black-100 font-rubik-medium">
                  Aucun résultat trouvé
                </Text>
              </View>
            )
          )}
        </View>
      )}
    </View>
  );
};

export default Explore;
