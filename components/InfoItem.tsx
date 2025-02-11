import { Ionicons } from "@expo/vector-icons";
import { View, Text, useWindowDimensions } from "react-native";

const InfoItem = ({
  icon,
  text,
  subtitle,
}: {
  icon: string;
  text: string;
  subtitle: string;
}) => {
  const { width: w } = useWindowDimensions();
  return (
    <View
      className="flex-col items-center gap-2 bg-backgr-100 rounded-xl"
      style={{
        width: w / 2 - 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 12,
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <View>
        <Ionicons name={icon as any} size={28} color="#0061FF" />
      </View>
      <Text numberOfLines={1} className="text-base font-rubik-medium">
        {text}
      </Text>
      <Text numberOfLines={1} className="text-base font-rubik-light">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoItem;
