import { View } from "react-native";
// SwiperDot.js
export const DotSwipe = () => {
  return (
    <View
      style={{
        backgroundColor: "#9A9A9A",
        width: 15,
        height: 15,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
      }}
    />
  );
};

export const DotActiveSwipe = () => {
  return (
    <View
      style={{
        backgroundColor: "#0061FF",
        width: 15,
        height: 15,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
      }}
    />
  );
};
