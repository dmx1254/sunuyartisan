import { View } from "react-native";

const ScheduleSkeleton = () => {
  return (
    <View className="p-4">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <View
          key={item}
          className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
        >
          <View className="flex-row justify-between items-start mb-4">
            <View className="bg-gray-200 h-6 w-2/3 rounded-md" />
            <View className="bg-gray-200 h-6 w-20 rounded-full" />
          </View>
          <View className="space-y-2">
            <View className="bg-gray-200 h-4 w-1/2 rounded-md" />
            <View className="bg-gray-200 h-4 w-1/3 rounded-md" />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ScheduleSkeleton;
