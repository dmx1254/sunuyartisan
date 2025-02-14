import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { RelativePathString, useRouter } from "expo-router";
import { ArtisanDetail } from "@/types";
import { supabase } from "@/app/lib/supabase";
import { averageReviews } from "@/app/lib/utils";
import { Card, FeaturedCard } from "./Card";
import { categories } from "@/app/lib/constants/data";
import Filters from "./Filters";
import Search from "./Search";
import { useAuth } from "./Auth";
import icons from "@/app/lib/constants/images";
import MetierSkeleton from "./MetierSkeleton"; // Assurez-vous d'importer votre MetierSkeleton

const INITIAL_LIMIT = 20;

const FeaturedArtisans = () => {
  const router = useRouter();
  const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);
  const [artisans, setArtisans] = useState<ArtisanDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [reviews, setReviews] = useState<{ [key: string]: number }>({});
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [unreadAppointments, setUnreadAppointments] = useState<number>(0);

  const [userD, setUserD] = useState<{
    fullname: string;
    avatar: string;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("tous");
  const { user } = useAuth();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        setUserD(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUserD();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const getUnreadCount = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id);

      const { data: messages } = await supabase
        .from("message")
        .select("id")
        .eq("receiverId", user.id)
        .eq("read", false);

      // const idToSelect = data && data[0].role === "ARTISAN" ? "artisanId" : "userId";

      const { data: appointments } = await supabase
        .from("appointment")
        .select("id")
        .or(`userId.eq.${user.id},artisanId.eq.${user.id}`)
        .eq("read", false);

      setUnreadMessages(messages?.length || 0);
      setUnreadAppointments(appointments?.length || 0);
    };

    getUnreadCount();
  }, [user?.id]);

  const getUserD = async () => {
    if (!user?.id) return;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("fullname, avatar")
        .eq("id", user.id);

      if (error) throw error;
      if (data) setUserD(data[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchReviews = async (artisanIds: string[]) => {
    try {
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("artisanId, rate")
        .in("artisanId", artisanIds);

      if (reviewsData) {
        const reviewsAverage = artisanIds.reduce((acc, artisanId) => {
          const artisanReviews = reviewsData.filter(
            (r) => r.artisanId === artisanId
          );
          const rates = artisanReviews.map((r) => Number(r.rate));
          acc[artisanId] = Number(averageReviews(rates, artisanReviews.length));
          return acc;
        }, {} as { [key: string]: number });

        setReviews(reviewsAverage);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchFeaturedArtisans = async (refresh = false) => {
    if (loading || (!refresh && !hasMore)) return;

    const currentPage = refresh ? 0 : page;
    const offset = currentPage * INITIAL_LIMIT;

    setLoading(refresh);
    setLoadingMore(!refresh);

    try {
      let query = supabase
        .from("artisan_detail")
        .select(
          `
          *,
          user:users(avatar, phone, fullname)
        `
        )
        .range(offset, offset + INITIAL_LIMIT - 1);

      if (selectedCategory && selectedCategory !== "tous") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        const newArtisans = refresh ? data : [...artisans, ...data];
        setArtisans(newArtisans);
        setHasMore(data.length === INITIAL_LIMIT);
        if (!refresh) setCurrentLimit((prev) => prev + INITIAL_LIMIT);
        setPage(currentPage + 1);

        // Fetch reviews for new artisans
        const artisanIds = data.map((a) => a.artisanId);
        await fetchReviews(artisanIds);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setArtisans([]);
    setPage(0);
    setHasMore(true);
    fetchFeaturedArtisans(true);
  }, [selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedArtisans(true);
  };

  const renderFooter = () => {
    if (!hasMore || artisans.length < currentLimit) return null;
    return (
      <View className="py-5 flex items-center justify-center">
        {loadingMore ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            onPress={() => fetchFeaturedArtisans()}
            className="bg-primary-300 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-rubik-medium">Voir plus</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleRedirectToNotif = () => {
    if (!user) return;
    router.push("/(user)/notifications");
  };

  const ListHeader = () => (
    <View className="px-5">
      <View
        className={`flex flex-row items-center justify-between ${
          Platform.OS === "android" ? "mt-5" : "mt-3"
        }`}
      >
        <View className="flex flex-row">
          <Image
            source={
              userD?.avatar
                ? { uri: userD.avatar }
                : require("@/assets/icons/defaultuser.png")
            }
            className="size-14 rounded-full"
          />
          {userD?.fullname && (
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-sm font-rubik text-black-200">
                Bonjour,
              </Text>
              <Text className="text-lg font-rubik-medium text-black-300">
                {userD?.fullname || ""}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          className="relative"
          activeOpacity={0.5}
          onPress={handleRedirectToNotif}
        >
          <Image source={icons.notif} className="size-6" />
          {(unreadMessages > 0 || unreadAppointments > 0) && (
            <View className="absolute top-0 right-0 z-10 w-2 h-2 bg-red-600 rounded-full" />
          )}
        </TouchableOpacity>
      </View>
      <Search />
      <View className="my-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-2xl font-rubik-medium text-black-300">
            Services
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/metiers/all" as RelativePathString)}
          >
            <Text className="text-lg font-rubik-medium text-primary-300">
              Voir tous
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={({ item }) => <FeaturedCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex gap-5 mt-5"
        />
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-2xl font-rubik-medium text-black-300">
          Artisans
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/metiers/all" as RelativePathString)}
        >
          <Text className="text-lg font-rubik-medium text-primary-300">
            Voir tous
          </Text>
        </TouchableOpacity>
      </View>
      <Filters onSelectCategory={(val) => setSelectedCategory(val)} />
      {!loading && artisans.length === 0 && (
        <View className="flex items-center justify-center mt-6">
          <Text className="text-xl font-rubik-semibold">
            Aucun résultat trouvé
          </Text>
        </View>
      )}
    </View>
  );

  if (loading && artisans.length === 0) {
    return (
      <>
        <ListHeader />
        <MetierSkeleton />
      </>
    );
  }

  return (
    <FlatList
      key={"two-columns"}
      data={artisans}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card
          item={item}
          reviewLength={reviews[item.artisanId]?.toFixed(1) || "0.0"}
        />
      )}
      contentContainerClassName="pb-32"
      columnWrapperClassName="flex gap-5 px-5"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={renderFooter}
      // Removed onEndReached
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#0000ff"
          colors={["#0000ff"]}
          progressBackgroundColor="#ffffff"
        />
      }
    />
  );
};

export default FeaturedArtisans;
