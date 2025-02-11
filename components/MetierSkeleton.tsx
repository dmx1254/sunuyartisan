import { useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const MetierSkeleton = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const translateX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    translateX.value = withDelay(
      0,
      withRepeat(
        withSequence(
          withTiming(SCREEN_WIDTH, { duration: 1000 }),
          withTiming(-SCREEN_WIDTH, { duration: 0 })
        ),
        -1
      )
    );
  }, [SCREEN_WIDTH]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const SkeletonItem = () => (
    <View
      className="mt-4 mb-8 overflow-hidden rounded-t-2xl"
      style={{
        width: SCREEN_WIDTH / 2 - 32,
      }}
    >
      <View className="rounded-2xl bg-white">
        {/* Image skeleton */}
        <View className="relative">
          <View className="w-full h-48 rounded-t-2xl bg-[#E1E9EE] overflow-hidden">
            <Animated.View className="absolute inset-0" style={animatedStyle}>
              <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>

          {/* Badge skeleton */}
          <View className="absolute top-3 left-3 w-16 h-6 bg-[#E1E9EE] rounded-full overflow-hidden">
            <Animated.View className="absolute inset-0" style={animatedStyle}>
              <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
        </View>

        <View className="p-4">
          {/* Name skeleton */}
          <View className="flex-row items-center justify-between">
            <View className="w-24 h-5 bg-[#E1E9EE] rounded-md overflow-hidden">
              <Animated.View className="absolute inset-0" style={animatedStyle}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
            <View className="w-12 h-5 bg-[#E1E9EE] rounded-md overflow-hidden">
              <Animated.View className="absolute inset-0" style={animatedStyle}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
          </View>

          {/* Category skeleton */}
          <View className="w-3/4 h-4 bg-[#E1E9EE] rounded-md overflow-hidden mt-2">
            <Animated.View className="absolute inset-0" style={animatedStyle}>
              <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>

          {/* Location skeleton */}
          <View className="w-full h-4 bg-[#E1E9EE] rounded-md overflow-hidden mt-2">
            <Animated.View className="absolute inset-0" style={animatedStyle}>
              <LinearGradient
                colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>

          {/* Price and availability skeleton */}
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <View className="w-20 h-4 bg-[#E1E9EE] rounded-md overflow-hidden">
              <Animated.View className="absolute inset-0" style={animatedStyle}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
            <View className="w-24 h-6 bg-[#E1E9EE] rounded-full overflow-hidden">
              <Animated.View className="absolute inset-0" style={animatedStyle}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={{ flex: 1 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="px-4 flex-row flex-wrap justify-between">
      {[1, 2, 3, 4].map((item) => (
        <SkeletonItem key={item} />
      ))}
    </View>
  );
};

export default MetierSkeleton;
