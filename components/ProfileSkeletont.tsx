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

const ProfileSkeleton = () => {
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSkeleton}>
          <AnimatedGradient />
        </View>
        <View style={styles.notifIconSkeleton}>
          <AnimatedGradient />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarSkeleton}>
          <AnimatedGradient />
        </View>
        {/* <View style={styles.editIconSkeleton}>
          <AnimatedGradient />
        </View> */}
        <View style={styles.usernameSkeleton}>
          <AnimatedGradient />
        </View>
      </View>

      {/* Main Menu Items */}
      <View style={styles.menuSection}>
        {/* First Section */}
        <View style={styles.menuGroup}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.menuItem}>
              <View style={styles.menuIconSkeleton}>
                <AnimatedGradient />
              </View>
              <View style={styles.menuTextSkeleton}>
                <AnimatedGradient />
              </View>
              <View style={styles.arrowSkeleton}>
                <AnimatedGradient />
              </View>
            </View>
          ))}
        </View>

        {/* Second Section */}
        <View style={[styles.menuGroup, styles.borderTop]}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.menuItem}>
              <View style={styles.menuIconSkeleton}>
                <AnimatedGradient />
              </View>
              <View style={styles.menuTextSkeleton}>
                <AnimatedGradient />
              </View>
              <View style={styles.arrowSkeleton}>
                <AnimatedGradient />
              </View>
            </View>
          ))}
        </View>

        {/* Logout Section */}
        <View style={[styles.menuGroup, styles.borderTop]}>
          <View style={styles.menuItem}>
            <View style={styles.menuIconSkeleton}>
              <AnimatedGradient />
            </View>
            <View style={[styles.menuTextSkeleton, styles.logoutText]}>
              <AnimatedGradient />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 28,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  titleSkeleton: {
    width: 80,
    height: 24,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
  },
  notifIconSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: "#E1E9EE",
    borderRadius: 12,
    overflow: "hidden",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 40,
  },
  avatarSkeleton: {
    width: 176,
    height: 176,
    backgroundColor: "#E1E9EE",
    borderRadius: 88,
    overflow: "hidden",
  },
  editIconSkeleton: {
    width: 36,
    height: 36,
    backgroundColor: "#E1E9EE",
    borderRadius: 18,
    position: "absolute",
    bottom: 44,
    right: "25%",
    overflow: "hidden",
  },
  usernameSkeleton: {
    width: 150,
    height: 28,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginTop: 8,
    overflow: "hidden",
  },
  menuSection: {
    marginTop: 40,
  },
  menuGroup: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuIconSkeleton: {
    width: 32,
    height: 32,
    backgroundColor: "#E1E9EE",
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
  },
  menuTextSkeleton: {
    flex: 1,
    height: 20,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginRight: 12,
    overflow: "hidden",
  },
  arrowSkeleton: {
    width: 20,
    height: 20,
    backgroundColor: "#E1E9EE",
    borderRadius: 10,
    overflow: "hidden",
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#E1E9EE",
    paddingTop: 20,
  },
  logoutText: {
    backgroundColor: "#FFE1E1",
  },
});

export default ProfileSkeleton;
