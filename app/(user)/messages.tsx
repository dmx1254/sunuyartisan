import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/Auth";
import { supabase } from "../lib/supabase";
import { MESSAGE } from "@/types";
import { useRouter } from "expo-router";
import MessageSkeleton from "@/components/MessageSkeleton";
import { StatusBar } from "expo-status-bar";

const Message = () => {
  const router = useRouter();
  const { user } = useAuth();

  const fetchUserMessages = async (userId: string) => {
    if (!userId) {
      console.log("UserId est undefined ou null");
      return [];
    }
    // console.log("UserId reçu:", userId);
    const { data, error } = await supabase.rpc("get_last_messages", {
      user_id: userId,
    });

    if (error) {
      console.log(error);
      throw error;
    }

    // console.log(data);

    return data || [];
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["artisan-message", user?.id],
    queryFn: () => fetchUserMessages(user?.id as string),
  });

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {/* Header */}
      <View className="bg-primary-300 px-4 pt-16 pb-4">
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            className="z-20"
            activeOpacity={0.5}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-rubik-bold">
            Mes discussions
          </Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-2 py-4 bg-white border-b border-gray-100">
        <View className="flex flex-row items-center bg-backgr-100 rounded-lg px-2">
          <Ionicons
            name="search-outline"
            size={20}
            color="#9ca3af"
            style={{ marginRight: 4 }}
          />
          <TextInput
            placeholder="Rechercher une conversation..."
            className="flex-1 p-4 text-base font-rubik-light"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Messages List */}
      <ScrollView className="flex-1 bg-white">
        {isLoading ? (
          <MessageSkeleton />
        ) : (
          data?.map((message: MESSAGE) => (
            <TouchableOpacity
              key={message.id}
              className="flex flex-row items-center px-3 py-3 border-b border-gray-100"
              activeOpacity={0.6}
              onPress={() => {
                const otherUserId =
                  message.senderId === user!.id
                    ? message.receiverId
                    : message.senderId;

                router.push(`/(user)/message/${otherUserId}`);
              }}
            >
              {/* Avatar */}
              <View className="h-12 w-12 rounded-full bg-primary-50 mr-3 flex items-center justify-center">
                <Image
                  source={
                    message.avatar
                      ? { uri: message.avatar }
                      : require("@/assets/icons/defaultuser.png")
                  }
                  className="h-12 w-12 rounded-full"
                />
              </View>

              {/* Message Content */}
              <View className="flex-1 border-gray-100">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-black-300 font-rubik-semibold text-lg">
                    {message.fullname || ""}
                  </Text>
                  <Text className="text-black-100 font-rubik-bold text-xs">
                    {formatDate(message.created_at)}
                  </Text>
                </View>

                <View className="flex flex-row justify-between items-center mt-1">
                  <Text
                    numberOfLines={1}
                    className="flex-1 text-black-100 text-sm font-rubik-light"
                  >
                    {message.content}
                  </Text>
                  {message.unread_count > 0 && (
                    <View className="bg-primary-300 rounded-full h-5 w-5 flex items-center justify-center ml-2">
                      <Text className="text-white text-xs font-bold">
                        {message.unread_count}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Message;
