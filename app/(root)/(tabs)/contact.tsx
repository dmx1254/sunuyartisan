import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { supabase } from "@/app/lib/supabase";

const Contact = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !message) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    // Ici votre logique d'envoi de message

    const { error } = await supabase
      .from("contact")
      .insert([{ fullname: name, message, phone }]);

    setIsLoading(false);

    if (error) {
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'envoi du message"
      );
    }

    Alert.alert(
      "Success",
      "Votre message a été bien pris en compte, merci de nous avoir contacté"
    );
  };

  const contactMethods = [
    {
      icon: "call",
      label: "Téléphone",
      value: "+221 76 624 85 05",
      action: () => Linking.openURL("tel:+221766248505"),
    },
    {
      icon: "mail",
      label: "Email",
      value: "info.sunuyartisan@pmn.sn",
      action: () => Linking.openURL("mailto:info.sunuyartisan@pmn.sn"),
    },
    {
      icon: "location",
      label: "Adresse",
      value: "Diamniadio cité Senegindia Villa 009-TYPE A",
      action: () => Linking.openURL("https://maps.google.com"),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View className="flex-1 bg-white">
        <StatusBar style="light" />

        {/* Header */}
        <View className="bg-primary-300 px-4 pt-16 pb-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-rubik-bold">
              Nous contacter
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/* Contact Info Cards */}
          <View className="p-4">
            <Text className="text-xl font-rubik-bold text-black-300 mb-4">
              Comment pouvons-nous vous aider ?
            </Text>

            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                onPress={method.action}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100 flex-row items-center"
              >
                <View className="bg-primary-50 p-3 rounded-full mr-4">
                  <Ionicons
                    name={method.icon as "call" | "mail" | "location"}
                    size={24}
                    color="#0061FF"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-rubik-semibold text-lg">
                    {method.label}
                  </Text>
                  <Text className="font-rubik-light text-sm">
                    {method.value}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#8C8E98" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Form */}
          <View className="p-4">
            <Text className="text-xl font-rubik-bold text-black-300 mb-4">
              Envoyez-nous un message
            </Text>

            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="mb-4">
                <Text className="text-lg font-rubik-medium mb-2">
                  Nom complet
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-300 font-rubik-regular"
                  value={name}
                  onChangeText={setName}
                  placeholder="Entrez votre nom"
                />
              </View>

              <View className="mb-4">
                <Text className="text-lg font-rubik-medium mb-2">
                  Téléphone
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-300 font-rubik-regular"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Entrez votre téléphone"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>

              <View className="mb-4">
                <Text className="text-lg font-rubik-medium mb-2">Message</Text>
                <TextInput
                  className="bg-gray-50 rounded-xl p-4 border border-gray-300 font-rubik-regular"
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Écrivez votre message"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                className={`bg-primary-300 p-4 rounded-xl ${
                  isLoading ? "opacity-70" : ""
                }`}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-rubik-bold text-lg">
                  {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Media Links */}
          <View className="p-4 mb-4">
            <Text className="text-xl font-rubik-bold mb-4">Suivez-nous</Text>

            <View className="flex-row justify-center gap-4">
              {[
                {
                  icon: "logo-facebook",
                  lnk: "https://www.facebook.com/profile.php?viewas=100000686899395&id=61559819632773&_rdc=1&_rdr#",
                },
                {
                  icon: "logo-youtube",
                  lnk: "https://www.youtube.com/@projetmobiliernational",
                },
                { icon: "logo-twitter", lnk: "https://x.com/MobilierProjet" },
                {
                  icon: "logo-linkedin",
                  lnk: "https://www.linkedin.com/company/projet-mobilier-national/?viewAsMember=trueclearn",
                },
              ].map((ic, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-primary-50 p-3 rounded-full"
                  onPress={() => Linking.openURL(ic.lnk)}
                >
                  <Ionicons
                    name={
                      ic.icon as
                        | "logo-facebook"
                        | "logo-instagram"
                        | "logo-twitter"
                        | "logo-linkedin"
                    }
                    size={24}
                    color="#0061FF"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Text className="text-sm text-center font-rubik-medium">
            © 2025 Ministère du Tourisme et de l'Artisanat | Projet du Mobilier
            National
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Contact;
