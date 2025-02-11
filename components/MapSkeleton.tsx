import { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const MapSkeleton = () => {
  const { width: SCREEN_WIDTH, height: h } = useWindowDimensions();
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

  const AnimatedGradient = () => (
    <Animated.View style={[styles.shine, animatedStyle]}>
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Map Skeleton */}
      <View style={[styles.mapSkeleton, { height: h }]}>
        <AnimatedGradient />
      </View>

      {/* Close Button Skeleton */}
      <View style={styles.closeButtonSkeleton}>
        <AnimatedGradient />
      </View>

      {/* Legend Box Skeleton */}
      <View style={styles.legendBoxSkeleton}>
        <View style={styles.legendHeaderSkeleton}>
          <View style={styles.titleSkeleton}>
            <AnimatedGradient />
          </View>
          <View style={styles.iconSkeleton}>
            <AnimatedGradient />
          </View>
        </View>

        {/* Legend Items */}
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.legendItemSkeleton}>
            <View style={styles.legendIconSkeleton}>
              <AnimatedGradient />
            </View>
            <View style={styles.legendTextContainer}>
              <View style={styles.legendTitleSkeleton}>
                <AnimatedGradient />
              </View>
              <View style={styles.legendSubtitleSkeleton}>
                <AnimatedGradient />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFD",
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  mapSkeleton: {
    width: "100%",
    backgroundColor: "#E1E9EE",
    position: "relative",
    overflow: "hidden",
  },
  closeButtonSkeleton: {
    position: "absolute",
    top: 80,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E1E9EE",
    overflow: "hidden",
  },
  legendBoxSkeleton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendHeaderSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleSkeleton: {
    width: 150,
    height: 24,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
  },
  iconSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: "#E1E9EE",
    borderRadius: 12,
    overflow: "hidden",
  },
  legendItemSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  legendIconSkeleton: {
    width: 32,
    height: 32,
    backgroundColor: "#E1E9EE",
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
  },
  legendTextContainer: {
    flex: 1,
  },
  legendTitleSkeleton: {
    width: "60%",
    height: 16,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginBottom: 4,
    overflow: "hidden",
  },
  legendSubtitleSkeleton: {
    width: "40%",
    height: 12,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
  },
});

export default MapSkeleton;
