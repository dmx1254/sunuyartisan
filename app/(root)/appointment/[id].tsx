import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Appointment = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Appointment - {id}</Text>
    </View>
  );
};

export default Appointment;
