// components/LocationFilter.tsx
import { regions } from "@/app/lib/constants/data";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface LocationFilterProps {
  onFilterChange: (location: {
    region?: string;
    department?: string;
    commune?: string;
  }) => void;
}

const LocationFilter = ({ onFilterChange }: LocationFilterProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);

  const departments = selectedRegion
    ? regions.find((r) => r.region === selectedRegion)?.departments || []
    : [];

  const communes = selectedDepartment
    ? departments.find((d) => d.department === selectedDepartment)?.communes ||
      []
    : [];

  useEffect(() => {
    onFilterChange({
      region: selectedRegion || undefined,
      department: selectedDepartment || undefined,
      commune: selectedCommune || undefined,
    });
  }, [selectedRegion, selectedDepartment, selectedCommune]);

  return (
    <View className=" p-4">
      {/* Régions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-2"
      >
        {regions.map((region) => (
          <TouchableOpacity
            key={region.region}
            onPress={() => {
              setSelectedRegion(
                selectedRegion === region.region ? null : region.region
              );
              setSelectedDepartment(null);
              setSelectedCommune(null);
            }}
            className={`mr-2 px-4 py-2 rounded-full ${
              selectedRegion === region.region
                ? "bg-primary-300"
                : "bg-gray-200"
            }`}
          >
            <Text
              className={`${
                selectedRegion === region.region
                  ? "text-white"
                  : "text-black-300"
              } font-rubik-medium capitalize`}
            >
              {region.region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Départements */}
      {selectedRegion && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {departments.map((department) => (
            <TouchableOpacity
              key={department.department}
              onPress={() => {
                setSelectedDepartment(
                  selectedDepartment === department.department
                    ? null
                    : department.department
                );
                setSelectedCommune(null);
              }}
              className={`mr-2 px-4 py-2 rounded-full  ${
                selectedDepartment === department.department
                  ? "bg-primary-300"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedDepartment === department.department
                    ? "text-white"
                    : "text-black-300"
                } font-rubik-medium capitalize`}
              >
                {department.department}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Communes */}
      {selectedDepartment && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
        >
          {communes.map((commune) => (
            <TouchableOpacity
              key={commune}
              onPress={() => {
                setSelectedCommune(
                  selectedCommune === commune ? null : commune
                );
              }}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCommune === commune ? "bg-primary-300" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedCommune === commune ? "text-white" : "text-black-300"
                } font-rubik-medium capitalize`}
              >
                {commune}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default LocationFilter;
