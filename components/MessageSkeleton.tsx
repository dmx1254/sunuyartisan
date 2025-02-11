import { useEffect } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const MessageSkeleton = () => {
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

  const MessageSkeletonItem = () => (
    <View style={styles.messageItem}>
      {/* Avatar */}
      <View style={styles.avatarSkeleton}>
        <Animated.View style={[styles.shine, animatedStyle]}>
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>

      {/* Message Content */}
      <View style={styles.contentContainer}>
        {/* Name */}
        <View style={styles.nameSkeleton}>
          <Animated.View style={[styles.shine, animatedStyle]}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>

        {/* Message Preview */}
        <View style={styles.messageSkeleton}>
          <Animated.View style={[styles.shine, animatedStyle]}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <MessageSkeletonItem key={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  messageItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1ef",
  },
  avatarSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E1E9EE",
    marginRight: 12,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameSkeleton: {
    height: 16,
    width: "40%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  messageSkeleton: {
    height: 14,
    width: "80%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
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
});

export default MessageSkeleton;
