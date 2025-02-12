import {
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/components/Auth";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/app/lib/supabase";
import FeaturedArtisans from "@/components/FeaturedArtisans";
import { useNotification } from "@/context/NotificationContext";
import { sendPushNotification } from "@/services/notifications";
import { useRouter } from "expo-router";

// import { Audio } from "expo-av";
// import { Sound } from "expo-av/build/Audio";

const Home = () => {
  const { notification, expoPushToken, error } = useNotification();
  const { user } = useAuth();
  const router = useRouter();

  // const [sound, setSound] = useState<Sound>();

  // console.log(user);

  // console.log("......................................")
  // console.log(session)

  // async function playNotificationSound() {
  //   // console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("@/assets/sounds/notification.mp3")
  //   );
  //   // setSound(sound);

  //   // console.log("Playing Sound");
  //   await sound.playAsync();
  // }

  useEffect(() => {
    if (!user?.id) return;
    const messagesSubscription = supabase
      .channel("message_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "message",
          filter: `receiverId=eq.${user!.id}`,
        },
        async (payload: any) => {
          // console.log(payload);
          const { data: userSending } = await supabase
            .from("users")
            .select("fullname")
            .eq("id", user!.id);
          // await playNotificationSound();
          await sendPushNotification(
            expoPushToken,
            `Nouveau message de ${userSending ? userSending[0].fullname : ""}`,
            payload.new.content
          );
        }
      )
      .subscribe();

    //Subscription for user notifications

    const appointmentsSubscriptionUser = supabase
      .channel("appointment_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "appointment",
          filter: `userId=eq.${user!.id}`,
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
              payload.new.artisanId === user!.id
                ? "Demande de rendez-vous"
                : `Votre rendez-vous est ${
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
        }
      )
      .subscribe();

    // Subscribtions for artisans notifications

    const appointmentsSubscriptionArtisan = supabase
      .channel("appointment_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "appointment",
          filter: `artisanId=eq.${user!.id}`,
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
              payload.new.artisanId === user!.id
                ? "Demande de rendez-vous"
                : `Votre rendez-vous est ${
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
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      appointmentsSubscriptionUser.unsubscribe();
      appointmentsSubscriptionArtisan.unsubscribe();
    };
  }, [user?.id]);

  return (
    <SafeAreaView className="h-full bg-white">
      {Platform.OS === "android" && <View className="mt-5" />}
      <StatusBar style="dark" />
      <FeaturedArtisans />
    </SafeAreaView>
  );
};

export default Home;
