// AppointmentModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";

type AppointmentModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    service: string;
    userLocation: {
      latitude: number;
      longitude: number;
    };
  }) => Promise<void>;
  isLoading: boolean;
};

const AppointmentModal = ({
  visible,
  onClose,
  onSubmit,
  isLoading,
}: AppointmentModalProps) => {
  const [service, setService] = useState("");

  const handleSubmit = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "La localisation est nécessaire pour la prise de rendez-vous"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      await onSubmit({
        service,
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      setService("");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer votre position");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center p-4">
        <View className="bg-white rounded-3xl p-6">
          <Text className="text-2xl font-rubik-bold mb-4">
            Réserver un rendez-vous
          </Text>

          <View className="mb-4">
            <Text className="text-lg font-rubik-medium mb-2">
              Service demandé
            </Text>
            <TextInput
              value={service}
              onChangeText={setService}
              placeholder="Ex: Installation électrique, Réparation..."
              className="border border-gray-300 rounded-xl p-4 font-rubik"
            />
          </View>

          <View className="flex-row justify-end gap-4 mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="px-6 py-3 rounded-xl bg-gray-100"
            >
              <Text className="font-rubik-medium">Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!service || isLoading}
              className={`px-6 py-3 rounded-xl ${
                !service || isLoading ? "bg-gray-300" : "bg-primary-300"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size={24} />
              ) : (
                <Text className="font-rubik-medium text-white">Réserver</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentModal;
