import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/components/Auth";
import { USERINFO } from "@/types";
import icons from "../../lib/constants/images";

interface Message {
  id: string;
  content: string;
  created_at: string;
  senderId: string;
  receiverId: string;
  read: boolean;
}

const UserSingleMessage = () => {
  const { phone } = icons;
  const router = useRouter();
  const { id: receiverId } = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState<USERINFO | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const markMessagesAsRead = async () => {
    if (!user?.id || !receiverId) return;

    // Mettre à jour tous les messages non lus où l'utilisateur courant est le destinataire
    const { error } = await supabase
      .from("message")
      .update({ read: true })
      .eq("receiverId", user.id)
      .eq("senderId", receiverId)
      .eq("read", false);

    if (error) {
      console.log("Erreur lors de la mise à jour des messages:", error);
    }
  };

  useEffect(() => {
    const getUserNameAndAvatar = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("fullname, avatar, phone")
        .eq("id", receiverId);

      if (error) {
        console.log("Erreur récupération utilisateur:", error);
        return;
      }

      if (data.length === 0) {
        console.log("Utilisateur non trouvé");
        return;
      }

      // console.log(data);
      setUserInfo(data[0]);
    };

    getUserNameAndAvatar();
  }, []);

  // Charger les messages initiaux
  const getInitialMessages = async () => {
    if (!user?.id || !receiverId) return;

    // console.log("senderId", user.id);
    // console.log("receiverId", receiverId);

    const { data, error } = await supabase
      .from("message")
      .select("*")
      .or(
        `and(senderId.eq.${user.id},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${user.id})`
      )
      .order("created_at", { ascending: false })
      .limit(50); // Limite pour la pagination

    // console.log("Messages récupérés:", data);

    if (error) {
      console.log("Erreur chargement messages:", error);
      return;
    }

    setMessages(data.reverse() || []);
    scrollToBottom();
  };

  useEffect(() => {
    // console.log("Initialisation du channel...");
    getInitialMessages();
    markMessagesAsRead();

    // On utilise directement le channelId comme nom du channel
    const channelId = [user?.id, receiverId].sort().join("_");
    // console.log("Channel ID:", channelId);

    // console.log(filter);
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "INSERT", // ou "*" si vous voulez tous les événements
          schema: "public",
          table: "message",
          filter: `senderId=in.(${user?.id},${receiverId})`,
        },
        (payload) => {
          // console.log("Filter utilisé:", `senderId=eq.${user?.id}`);
          // console.log("User ID:", user?.id);
          // console.log("Payload reçu:", payload);
          // console.log("Message reçu en temps réel:", payload);
          setMessages((prev) => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      // console.log("Nettoyage du channel...");
      channel.unsubscribe();
    };
  }, [user?.id, receiverId]);

  const handleCall = () => {
    if (userInfo?.phone) {
      Linking.openURL(`tel:${userInfo.phone}`);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.id || !receiverId) return;

    const { error } = await supabase.from("message").insert({
      content: newMessage.trim(),
      senderId: user.id,
      receiverId: receiverId,
      read: false,
    });

    if (error) {
      console.log("Erreur envoi message:", error);
      return;
    }

    setNewMessage("");
  };

  useEffect(() => {
    if (!user) {
      return router.replace("/(auth)/sign-in");
    }
  });

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="w-full flex items-center bg-primary-300 pt-16 pb-4 px-4 flex-row">
        <View className="flex-row w-full justify-between items-center gap-4">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()} className="">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="flex-row gap-3 items-center">
              <Image
                source={
                  userInfo?.avatar
                    ? { uri: userInfo?.avatar }
                    : require("@/assets/icons/defaultuser.png")
                }
                resizeMode="cover"
                className="w-14 h-14 object-cover object-center rounded-full border-2 border-white"
              />
              <Text className="text-base font-rubik-medium text-white">
                {userInfo?.fullname || ""}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="text-white"
            onPress={handleCall}
            activeOpacity={0.5}
          >
            <MaterialIcons name="phone" size={32} color="white" />
          </TouchableOpacity>
          {/* <Text className="text-white">Hey</Text> */}
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 20 }}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 max-w-[80%] ${
              message.senderId === user?.id ? "self-end" : "self-start"
            }`}
          >
            <View
              className={`p-3 rounded-2xl ${
                message.senderId === user?.id
                  ? "bg-primary-300 rounded-tr-none"
                  : "bg-gray-100 rounded-tl-none"
              }`}
            >
              <Text
                className={`font-rubik-light text-base ${
                  message.senderId === user?.id ? "text-white" : "text-black"
                }`}
              >
                {message.content}
              </Text>
            </View>
            <Text className="text-xs font-rubik-light text-gray-500 mt-1">
              {new Date(message.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input de message */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        className="bg-white"
      >
        <View className="pb-12 px-4 py-6 border-t border-gray-200 flex-row items-center">
          <TextInput
            className="flex-1 bg-gray-100 text-base font-rubik-light rounded-full p-4 mr-2"
            placeholder="Votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full text-center ${
              newMessage.trim() ? "bg-primary-300" : "bg-gray-300"
            }`}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserSingleMessage;
