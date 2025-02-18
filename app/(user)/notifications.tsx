import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from "react-native";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/components/Auth";
import { format, differenceInHours, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Redirect, RelativePathString, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useNotification } from "@/context/NotificationContext";

import { sendPushNotification } from "@/services/notifications";

type Message = {
  id: string;
  created_at: string;
  senderId: string;
  receiverId: string;
  content: string;
  updated_at: string;
  read: boolean;
  sender?: {
    fullname: string;
    avatar: string;
  };
};

type Appointment = {
  id: string;
  created_at: string;
  userId: string;
  artisanId: string;
  service: string;
  status: string;
  updated_at: string;
  userlocation: {
    latitude: number;
    longitude: number;
  };
  user?: {
    fullname: string;
    avatar: string;
  };
  artisan?: {
    fullname: string;
    avatar: string;
  };
};

const getTimeAgo = (date: string) => {
  const hours = differenceInHours(new Date(), new Date(date));
  const days = differenceInDays(new Date(), new Date(date));

  if (hours < 24) {
    return `il y a ${hours}h`;
  } else if (days < 7) {
    return `il y a ${days}j`;
  }
  return format(new Date(date), "d MMM", { locale: fr });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "canceled":
      return "bg-red-500";
    case "pending":
      return "bg-yellow-500";
    case "completed":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusEmoji = (status: string) => {
  switch (status) {
    case "confirmed":
      return "✅";
    case "canceled":
      return "❌";
    case "pending":
      return "⏳";
    case "completed":
      return "🎉";
    default:
      return "📅";
  }
};

const NotificationIcon = ({
  type,
  status,
}: {
  type: string;
  status?: string;
}) => {
  const iconColor =
    type === "message" ? "bg-blue-500" : getStatusColor(status || "");
  const emoji = type === "message" ? "💬" : getStatusEmoji(status || "");

  return (
    <View
      className={`w-12 h-12 rounded-full ${iconColor} items-center justify-center`}
    >
      <Text className="text-xl">{emoji}</Text>
    </View>
  );
};

const Notifications = () => {
  const { notification, expoPushToken, error } = useNotification();
  const [messages, setMessages] = useState<Message[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sound, setSound] = useState<Sound>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const router = useRouter();

  async function playNotificationSound() {
    // console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/notification.mp3")
    );
    // setSound(sound);

    // console.log("Playing Sound");
    await sound.playAsync();
  }

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data: messagesData } = await supabase
        .from("message")
        .select(
          `
          *,
          sender:users!senderId(fullname, avatar)
        `
        )
        .eq("receiverId", user.id)
        .eq("read", false)
        .order("created_at", { ascending: false });

      const { data: appointmentsData } = await supabase
        .from("appointment")
        .select(
          `
          *,
          user:users!userId(fullname, avatar),
          artisan:users!artisanId(fullname, avatar)
        `
        )
        .or(`artisanId.eq.${user.id},userId.eq.${user.id}`)
        .order("updated_at", { ascending: false })
        .limit(20);

      // console.log(appointmentsData);

      setMessages(messagesData || []);
      setAppointments(appointmentsData || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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

  useEffect(() => {
    fetchNotifications();

    if (!user?.id) return;

    const messagesSubscription = supabase
      .channel("message_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "message",
          filter: `receiverId=eq.${user.id}`,
        },
        async (payload: any) => {
          // console.log(payload);
          await playNotificationSound();
          await fetchNotifications();
          const { data: userSending } = await supabase
            .from("users")
            .select("fullname")
            .eq("id", payload.new.senderId);
          await sendPushNotification(
            expoPushToken,
            `Nouveau message de ${userSending ? userSending[0].fullname : ""}`,
            payload.new.content
          );
        }
      )
      .subscribe();

    // Appointments subscriptions notifications for artisan

    const appointmentsSubscriptionArtisan = supabase
      .channel("appointment_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "appointment",
          filter: `artisanId=eq.${user.id}`,
        },
        async (payload: any) => {
          // console.log(payload);
          // await playNotificationSound();

          const statusMessage = {
            confirmed: "confirmé",
            pending: "en attente",
            canceled: "annulé",
            completed: "terminé",
          };

          await sendPushNotification(
            expoPushToken,
            `${
              payload.new.artisanId === user.id
                ? "Demande de rendez-vous"
                : `Votre demande de rendez-vous est ${
                    statusMessage[
                      payload.new.status as
                        | "confirmed"
                        | "pending"
                        | "canceled"
                        | "completed"
                    ]
                  }`
            }
            `,
            payload.new.service
          );
          await fetchNotifications();
        }
      )
      .subscribe();

    // Appointments subscriptions notifications for user

    const appointmentsSubscriptionUser = supabase
      .channel("appointment_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "appointment",
          filter: `userId=eq.${user.id}`,
        },
        async (payload: any) => {
          // console.log(payload);
          // await playNotificationSound();

          const statusMessage = {
            confirmed: "confirmé",
            pending: "en attente",
            canceled: "annulé",
            completed: "terminé",
          };

          await sendPushNotification(
            expoPushToken,
            `${
              payload.new.artisanId === user.id
                ? "Demande de rendez-vous"
                : `Votre demande de rendez-vous est ${
                    statusMessage[
                      payload.new.status as
                        | "confirmed"
                        | "pending"
                        | "canceled"
                        | "completed"
                    ]
                  }`
            }
            `,
            payload.new.service
          );
          await fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      appointmentsSubscriptionArtisan.unsubscribe();
      appointmentsSubscriptionUser.unsubscribe();
    };
  }, [user?.id]);

  const handleNotificationPress = (
    type: string,
    item: Message | Appointment
  ) => {
    if (type === "message") {
      const message = item as Message;
      router.push(`(user)/message/${message.senderId}` as RelativePathString);
    } else {
      router.push("/schedules");
    }
  };

  const renderNotificationItem = ({
    item,
  }: {
    item: Message | Appointment;
  }) => {
    const isMessage = "senderId" in item;
    let title = "";
    let subtitle = "";
    let avatar = "";

    if (isMessage) {
      const message = item as Message;
      title = message.sender?.fullname || "Utilisateur";
      subtitle = message.content;
      avatar = message.sender?.avatar || "";
    } else {
      const appointment = item as Appointment;
      const isArtisan = user?.id === appointment.artisanId;
      const otherPerson = isArtisan
        ? appointment.user?.fullname
        : appointment.artisan?.fullname;
      avatar = isArtisan
        ? appointment.user?.avatar || ""
        : appointment.artisan?.avatar || "";

      title = `${otherPerson}`;
      subtitle = `Rendez-vous ${
        appointment.status === "confirmed"
          ? "confirmé"
          : appointment.status === "pending"
          ? "en attente de confirmation"
          : appointment.status === "canceled"
          ? "Annulé"
          : appointment.status === "completed"
          ? "terminé"
          : ""
      }: ${appointment.service}`;
    }

    // console.log(item)

    return (
      <TouchableOpacity
        onPress={() =>
          handleNotificationPress(isMessage ? "message" : "appointment", item)
        }
        className="flex-row items-center p-4 gap-4 border-b border-gray-100 active:bg-gray-50"
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        ) : (
          <NotificationIcon
            type={isMessage ? "message" : "appointment"}
            status={!isMessage ? (item as Appointment).status : undefined}
          />
        )}

        <View className="relative flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              className="text-base font-rubik-semibold text-black-300 flex-1"
            >
              {title}
            </Text>
            <Text className="text-xs font-rubik text-gray-500 ml-2">
              {getTimeAgo(item.created_at)}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            className="text-base font-rubik-light text-gray-600 mt-1"
          >
            {subtitle}
          </Text>
          {!(item as Message).read && isMessage && (
            <View
              style={{
                position: "absolute",
                borderRadius: 4,
                width: 8,
                height: 8,
                top: 0,
                right: -2,
                backgroundColor: "#0061FF",
                transform: [{ translateY: -6 }],
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={24} color="#0061FF" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={24} color="#0061FF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="flex-row items-center py-4 px-5 bg-primary-300 pt-16 pb-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" className="mr-4" />
        </TouchableOpacity>
        <Text className="text-2xl font-rubik-bold text-white">
          Mes notifications
        </Text>
      </View>

      <FlatList
        data={[...messages, ...appointments].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchNotifications();
            }}
            tintColor="#0000ff"
            colors={["#0000ff"]}
          />
        }
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-base font-rubik text-gray-500">
              Aucune notification
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Notifications;
