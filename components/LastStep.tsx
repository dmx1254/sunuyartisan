import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArtisanFormData } from "@/types";

const LastStep = ({ formData }: { formData: ArtisanFormData }) => {
  const summaryData = [
    { label: "Spécialité", value: formData.category },
    { label: "Métier", value: formData.sub_category },
    { label: "Région", value: formData.region },
    { label: "Département", value: formData.department },
    { label: "Commune", value: formData.commune },
    { label: "Adresse", value: formData.address },
    { label: "Âge", value: formData.age },
    { label: "Disponibilité", value: formData.availability },
  ];

  const renderSummaryItem = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <View key={label} className="mb-4 bg-white rounded-lg p-4 shadow-sm">
      <Text className="text-gray-500 text-xl font-bold mb-1">{label}</Text>
      <Text className="text-gray-900 font-medium text-lg">
        {value || "Non renseigné"}
        {label === "Âge" && <Text className="ml-2"> ans</Text>}
      </Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 py-4 px-4">
      <View className="bg-blue-50 p-4 rounded-lg mb-6">
        <Text className="text-primary-300 font-rubik-medium text-xl mb-2">
          Résumé de votre profil
        </Text>
        <Text className="text-black-300 font-rubik-light text-lg">
          Vérifiez les informations ci-dessous. Vous pouvez revenir en arrière
          pour modifier si nécessaire.
        </Text>
      </View>

      <View className="space-y-2">{summaryData.map(renderSummaryItem)}</View>

      <View className="mt-6 bg-green-50 p-4 rounded-lg">
        <Text className="text-gree-500 font-rubik-bold text-lg text-center">
          Tout semble correct ? Vous pouvez maintenant valider votre profil !
        </Text>
      </View>
    </ScrollView>
  );
};

export default LastStep;
