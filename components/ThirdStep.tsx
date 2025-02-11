import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArtisanFormData, Commune, Department } from "@/types";
import CustomInput from "./CustomInput";
import { availabilityOptions, regions } from "@/app/lib/constants/data";

const ThirdStep = ({
  formData,
  onSelect,
  getCurrentLocation,
  geolocationLoading,
}: {
  formData: ArtisanFormData;
  onSelect: (name: keyof FormData | string, val: string) => void;
  getCurrentLocation: () => void;
  geolocationLoading: boolean;
}) => {
  const [dep, setDep] = useState<Department[]>([]);
  const [com, setCom] = useState<Commune[]>([]);
  const [rgion, setRgion] = useState<string>("");
  const [rdep, setRdep] = useState<string>("");

  useEffect(() => {
    const deps = regions.find((r) => r.region === rgion);
    setDep(deps?.departments || []);
  }, [rgion]);

  useEffect(() => {
    const coms = dep?.find((d) => d.department === rdep);
    setCom(coms?.communes || []);
  }, [rdep]);

  return (
    <View className="flex-1 justify-center py-4 mx-4">
      <CustomInput
        label="Âge"
        value={formData.age}
        onChangeText={(text) => onSelect("age" as keyof FormData, text)}
        placeholder="Votre âge"
        keyboard="numeric"
        icon="birthday-cake"
      />
      <Text className="text-black-200 text-lg mt-2 mb-4 font-rubik-bold">
        Disponibilité
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {availabilityOptions.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect("availability" as keyof FormData, option)}
            className={`px-4 py-2 rounded-full border ${
              formData.availability === option
                ? "border-primary-300 bg-primary-50"
                : "border-gray-200"
            }`}
          >
            <Text
              className={`text-lg ${
                formData.availability === option
                  ? "text-primary-300"
                  : "text-black-200"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text className="text-black-200 text-lg mt-4 font-rubik-bold">
          Région
        </Text>
        <ScrollView
          className="mt-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, gap: 10 }}
        >
          {regions.map((r, index) => (
            <TouchableOpacity
              onPress={() => {
                setRgion(r.region);
                onSelect("region" as keyof FormData, r.region);
              }}
              key={`${r.region}-${index}`}
              className={`flex-row items-center p-4 mb-4 rounded-xl border ${
                formData.region === r.region
                  ? "border-primary-300 bg-primary-50"
                  : "border-gray-200"
              }`}
            >
              <Text className="capitalize">{r.region}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {dep.length > 0 && (
        <View>
          <Text className="text-black-200 text-lg mt-4 font-rubik-bold">
            Département
          </Text>
          <ScrollView
            className="mt-2"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, gap: 10 }}
          >
            {dep.map((d, index) => (
              <TouchableOpacity
                onPress={() => {
                  setRdep(d.department);
                  onSelect("department" as keyof FormData, d.department);
                }}
                key={`${d.department}-${index}`}
                className={`flex-row items-center p-4 mb-4 rounded-xl border ${
                  formData.department === d.department
                    ? "border-primary-300 bg-primary-50"
                    : "border-gray-200"
                }`}
              >
                <Text className="capitalize">{d.department}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {com.length > 0 && (
        <View>
          <Text className="text-black-200 text-lg mt-4 font-rubik-bold">
            Commune
          </Text>
          <ScrollView
            className="mt-2"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10, gap: 10 }}
          >
            {com.map((c, index) => (
              <TouchableOpacity
                onPress={() => onSelect("commune" as keyof FormData, c)}
                key={`${c}-${index}`}
                className={`flex-row items-center p-4 mb-4 rounded-xl border ${
                  c === formData.commune
                    ? "border-primary-300 bg-primary-50"
                    : "border-gray-200"
                }`}
              >
                <Text className="capitalize">{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <CustomInput
        label="Adresse"
        value={formData.address}
        onChangeText={(text: string) => onSelect("address", text)}
        placeholder="Votre adresse"
        getCurrentLocation={getCurrentLocation}
        geolocationLoading={geolocationLoading}
      />
    </View>
  );
};

export default ThirdStep;
