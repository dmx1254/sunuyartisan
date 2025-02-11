import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/Auth";
import { supabase } from "../lib/supabase";
import ScheduleSkeleton from "@/components/ScheduleSkeleton";
import { formatedScheduleDate } from "../lib/utils";
import { Redirect, RelativePathString, useRouter } from "expo-router";

interface Appointment {
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  artisanId: string;
  service: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  artisan: {
    fullname: string;
    avatar: string;
  };
  client: {
    fullname: string;
    avatar: string;
  };
  userlocation: {
    latitude: number;
    longitude: number;
  };
}

type UserRole = "ARTISAN" | "PARTICULIER" | "ADMINISTRATION";

const StatusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-primary-300",
  completed: "bg-green-500",
  canceled: "bg-red-500",
};

const StatusText = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  canceled: "Annulé",
};

const Schedules = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [isStatusLoadingText, setIsStatusLoadingText] = useState<string>("");

  // Récupération du rôle de l'utilisateur
  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data?.role;
    },
    enabled: !!user?.id,
  });

  const updateAppointmentStatus = async (status: Appointment["status"]) => {
    if (!selectedAppointment || !userRole) return;

    // Vérifications des permissions selon le rôle
    // console.log(status);
    if (userRole === "ARTISAN") {
      // Un artisan peut confirmer, terminer ou annuler
      if (!["confirmed", "completed", "canceled"].includes(status)) {
        console.log("Action non autorisée pour l'artisan");
        return;
      }
    } else if (["PARTICULIER", "ADMINISTRATION"].includes(userRole)) {
      // Les clients et administrateurs peuvent seulement annuler
      if (status !== "canceled") {
        console.log("Seule l'annulation est autorisée pour ce rôle");
        return;
      }
    }

    setStatusLoading(true);
    const { error } = await supabase
      .from("appointment")
      .update({ status })
      .eq("id", selectedAppointment.id);

    if (error) {
      console.log("Erreur lors de la mise à jour:", error);
      return;
    }

    setStatusLoading(false);

    // Mettre à jour le cache immédiatement
    queryClient.setQueryData(
      ["appointments", user?.id, userRole],
      (oldData: Appointment[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, status }
            : appointment
        );
      }
    );

    setModalVisible(false);
  };

  // Récupération des rendez-vous
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments", user?.id, userRole],
    queryFn: async () => {
      const isArtisan = userRole === "ARTISAN";
      const { data, error } = await supabase
        .from("appointment")
        .select(
          `
          *,
          artisan:users!appointment_artisanId_fkey(fullname, avatar),
          client:users!appointment_userId_fkey(fullname, avatar)
        `
        )
        .eq(isArtisan ? "artisanId" : "userId", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!userRole,
  });

  // console.log(appointments);
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="bg-primary-300 px-4 pt-12 pb-4">
          <Text className="text-white text-xl font-rubik-bold">
            Rendez-vous
          </Text>
        </View>
        <ScheduleSkeleton />
      </SafeAreaView>
    );
  }

  // useEffect(() => {
  //   if (!user) {
  //     return router.replace("/(auth)/sign-in");
  //   }
  // });

  // console.log(userRole);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="flex-row items-center gap-4 bg-primary-300 px-4 pt-16 pb-6">
        <TouchableOpacity onPress={() => router.back()} className="z-20">
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-rubik-bold">
          {userRole === "ARTISAN"
            ? "Demandes de rendez-vous"
            : "Mes rendez-vous"}
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {appointments?.length === 0 ? (
          <View className="items-center justify-center mt-12">
            <Text className="text-xl font-rubik-light">
              Aucun rendez-vous trouvé
            </Text>
          </View>
        ) : (
          appointments?.map((appointment: Appointment) => (
            <TouchableOpacity
              key={appointment.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
              onPress={() => {
                setSelectedAppointment(appointment);
                setModalVisible(true);
              }}
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-rubik-semibold text-black-300 flex-1">
                  {appointment.service}
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${
                    StatusColors[
                      appointment.status as
                        | "pending"
                        | "confirmed"
                        | "completed"
                        | "canceled"
                    ]
                  }`}
                >
                  <Text className="text-white text-sm font-rubik-bold">
                    {
                      StatusText[
                        appointment.status as
                          | "pending"
                          | "confirmed"
                          | "completed"
                          | "canceled"
                      ]
                    }
                  </Text>
                </View>
              </View>

              <View className="mb-2">
                <Text className="text-black-100 font-rubik-semibold">
                  Rendez vous avec
                  {userRole === "PARTICULIER" || userRole === "ADMINISTRATION"
                    ? ` l'artisan ${appointment.artisan?.fullname}`
                    : " le client"}
                </Text>
                <Text className="text-black-100 font-rubik-medium">
                  Date: {formatedScheduleDate(appointment.created_at)}
                </Text>
              </View>

              {/* Nouveau bouton d'itinéraire pour les rendez-vous confirmés */}
              {appointment.status === "confirmed" && (
                <TouchableOpacity
                  className="flex-row items-center mt-2 bg-primary-50 p-3 rounded-lg"
                  onPress={() =>
                    router.push(
                      `/(user)/schedule/${appointment.id}` as RelativePathString
                    )
                  }
                >
                  <Ionicons name="map-outline" size={20} color="#0061FF" />
                  <Text className="text-primary-300 font-rubik-medium ml-2">
                    Voir l'itinéraire
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="bg-white rounded-3xl p-6 mx-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-rubik-bold text-black-300">
                    {userRole === "ARTISAN"
                      ? "Gérer le rendez-vous"
                      : "Details du rendez-vous"}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#191D31" />
                  </TouchableOpacity>
                </View>

                {selectedAppointment && (
                  <>
                    {/* Status Banner */}
                    <View
                      className={`p-4 rounded-xl mb-6 ${
                        selectedAppointment.status === "canceled"
                          ? "bg-red-50"
                          : selectedAppointment.status === "completed"
                          ? "bg-green-50"
                          : selectedAppointment.status === "confirmed"
                          ? "bg-primary-50"
                          : "bg-yellow-50"
                      }`}
                    >
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                          <Ionicons
                            name={
                              selectedAppointment.status === "canceled"
                                ? "close-circle"
                                : selectedAppointment.status === "completed"
                                ? "checkmark-circle"
                                : selectedAppointment.status === "confirmed"
                                ? "calendar"
                                : "time"
                            }
                            size={24}
                            color={
                              selectedAppointment.status === "canceled"
                                ? "#EF4444"
                                : selectedAppointment.status === "completed"
                                ? "#10B981"
                                : selectedAppointment.status === "confirmed"
                                ? "#0061FF"
                                : "#F59E0B"
                            }
                          />
                          <Text
                            className={`ml-2 text-base font-rubik-semibold ${
                              selectedAppointment.status === "canceled"
                                ? "text-red-600"
                                : selectedAppointment.status === "completed"
                                ? "text-green-600"
                                : selectedAppointment.status === "confirmed"
                                ? "text-primary-300"
                                : "text-yellow-600"
                            }`}
                          >
                            {StatusText[selectedAppointment.status]}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="mb-6">
                      <Text className="text-xl font-rubik-medium text-black-300 mb-2">
                        {selectedAppointment.service}
                      </Text>
                      <View className="flex-row items-center mb-2">
                        <Ionicons
                          name="person"
                          size={20}
                          color="#8C8E98"
                          className="mr-2"
                        />
                        <Text className="text-black-100 font-rubik-regular text-base">
                          {userRole === "PARTICULIER"
                            ? "Artisan: " +
                              selectedAppointment.artisan?.fullname
                            : userRole === "ARTISAN"
                            ? "Client: " + selectedAppointment.client?.fullname
                            : "Administration: " +
                              selectedAppointment.client?.fullname}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons
                          name="calendar"
                          size={20}
                          color="#8C8E98"
                          className="mr-2"
                        />
                        <Text className="text-black-100 text-base font-rubik-regular">
                          {formatedScheduleDate(selectedAppointment.created_at)}
                        </Text>
                      </View>
                    </View>

                    {/* Actions Section */}
                    {!["completed", "canceled"].includes(
                      selectedAppointment.status
                    ) && (
                      <View className="gap-3">
                        {userRole === "ARTISAN" &&
                          selectedAppointment.status === "pending" && (
                            <TouchableOpacity
                              className="bg-primary-300 p-4 rounded-xl flex-row justify-center items-center"
                              onPress={() => {
                                setIsStatusLoadingText("confirmed");
                                updateAppointmentStatus("confirmed");
                              }}
                            >
                              <Ionicons
                                name="checkmark-circle"
                                size={24}
                                color="white"
                                className="mr-2"
                              />
                              <Text className="text-white text-xl text-center font-rubik-semibold">
                                {statusLoading &&
                                isStatusLoadingText === "confirmed"
                                  ? "En cours..."
                                  : "Confirmer le rendez-vous"}
                              </Text>
                            </TouchableOpacity>
                          )}

                        {userRole === "ARTISAN" &&
                          selectedAppointment.status === "confirmed" && (
                            <TouchableOpacity
                              className="bg-green-500 p-4 rounded-xl flex-row justify-center items-center"
                              onPress={() => {
                                setIsStatusLoadingText("completed");
                                updateAppointmentStatus("completed");
                              }}
                            >
                              <Ionicons
                                name="checkmark-done-circle"
                                size={24}
                                color="white"
                                className="mr-2"
                              />
                              <Text className="text-white text-xl text-center font-rubik-semibold">
                                {statusLoading &&
                                isStatusLoadingText === "completed"
                                  ? "En cours..."
                                  : "Marquer comme terminé"}
                              </Text>
                            </TouchableOpacity>
                          )}

                        {["pending", "confirmed"].includes(
                          selectedAppointment.status
                        ) && (
                          <TouchableOpacity
                            className="bg-red-500 p-4 rounded-xl flex-row justify-center items-center"
                            onPress={() => {
                              setIsStatusLoadingText("canceled");
                              updateAppointmentStatus("canceled");
                            }}
                          >
                            <Ionicons
                              name="close-circle"
                              size={24}
                              color="white"
                              className="mr-2"
                            />
                            <Text className="text-white text-xl text-center font-rubik-semibold">
                              {statusLoading &&
                              isStatusLoadingText === "canceled"
                                ? "En cours..."
                                : "Annuler le rendez-vous"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Schedules;
