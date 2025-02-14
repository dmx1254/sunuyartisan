import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ImageSourcePropType,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/components/Auth";
import { Redirect, RelativePathString, useRouter } from "expo-router";

import icons from "@/app/lib/constants/images";
import { TouchableOpacity } from "react-native";
import { settings } from "@/app/lib/constants/data";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "@/app/lib/supabase";

import { decode } from "base64-arraybuffer";
import Toast from "react-native-toast-message";
import ProfileSkeleton from "@/components/ProfileSkeletont";

const showSucessToast = () => {
  Toast.show({
    type: "success",
    text1: "Notification",
    text2: "Votre photo de profile a été ajouté avec succès",
  });
};

const profile = () => {
  const router = useRouter();

  const { user, signOut } = useAuth();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setuserName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [unreadAppointments, setUnreadAppointments] = useState<number>(0);

  useEffect(() => {
    if (!user?.id) return;

    const getUnreadCount = async () => {
      const { data: messages } = await supabase
        .from("message")
        .select("id")
        .eq("receiverId", user.id)
        .eq("read", false);

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

  const getUserImageAndName = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("avatar, fullname")
      .eq("id", user!.id);

    if (error) {
      console.log(error);
      return;
    }

    if (data && data.length > 0) {
      setUserImage(data[0].avatar);
      setuserName(data[0].fullname);
    }

    // console.log(data);
  };

  useEffect(() => {
    getUserImageAndName();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result);
      setUserImage(result.assets[0].uri);
      if (!result.canceled) {
        const img = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: "base64",
        });
        const filePath = `${user!.id}/${new Date().getTime()}.${
          img.type === "image" ? "png" : "mp4"
        }`;
        const contentType = img.type === "image" ? "image/png" : "video/mp4";
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(filePath, decode(base64), { contentType });

        if (data) {
          // Obtenir l'URL publique
          const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(data.path);

          // console.log("url", publicUrlData.publicUrl);

          // Enregistrer l'URL publique dans la base de données

          const { data: updateData, error: updateError } = await supabase
            .from("users")
            .update({ avatar: publicUrlData.publicUrl }) // Utiliser publicUrl au lieu de path
            .eq("id", user!.id);

          if (updateError) {
            console.error("Error updating avatar:", updateError);
            return;
          }

          if (updateData) {
            showSucessToast();
            console.log("User avatar is successfully updated");
            await getUserImageAndName();
          }
        }

        if (error) {
          console.log(error);
        }
      }
    } else {
      alert("Vous n'avez selectionner aucune image.");
    }
  };

  interface SettingsItemProp {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
    path: string;
  }

  const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    showArrow = true,
    path,
  }: SettingsItemProp) => (
    <TouchableOpacity
      onPress={() => router.push(`(user)/${path}` as RelativePathString)}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-8" />
        <Text
          className={`text-xl font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  useEffect(() => {
    // Vérifie l'état de l'authentification après un court délai
    const checkAuth = setTimeout(() => {
      if (!user) {
        router.replace("/(auth)/sign-in");
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(checkAuth);
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={24} color="#0061FF" />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      {Platform.OS === "android" && <View className="mt-5" />}
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <TouchableOpacity
            className="relative"
            activeOpacity={0.5}
            onPress={() => router.push("/(user)/notifications")}
          >
            <Image source={icons.notif} className="size-6" />
            {(unreadMessages > 0 || unreadAppointments > 0) && (
              <View className="absolute top-0 right-0 z-10 w-2 h-2 bg-red-600 rounded-full" />
            )}
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={
                userImage
                  ? { uri: userImage as string }
                  : require("@/assets/icons/defaultuser.png")
              }
              alt={userName || "user"}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity
              className="absolute bottom-11 right-2"
              onPress={pickImageAsync}
            >
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{userName}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem
            icon={icons.schedule}
            title="Mes rendez-vous"
            path="schedules"
          />
          <SettingsItem
            icon={icons.messages}
            title="Mes messages"
            path="messages"
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex flex-row items-center justify-between py-3"
          >
            <View className="flex flex-row items-center gap-3">
              <Image source={icons.logout} className="size-8" />
              <Text className={`text-xl font-rubik-medium text-red-400 `}>
                Se deconnecter
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
