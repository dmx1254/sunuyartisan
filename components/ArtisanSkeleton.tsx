import { useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const ArtisanSkeleton = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const translateX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    // Ajoutez un petit délai pour éviter l'accès pendant le rendu
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
  }, [SCREEN_WIDTH]); // Ajoutez SCREEN_WIDTH comme dépendance

  // Déplacez le style animé en dehors du rendu
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Créez un composant réutilisable pour le gradient animé
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
      {/* Image Squelette */}
      <View style={styles.imageSkeleton}>
        <AnimatedGradient />
      </View>

      {/* Info Principales Squelette */}
      <View style={styles.mainInfoSkeleton}>
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
        <View style={styles.ratingSkeleton}>
          <Animated.View style={[styles.shine, animatedStyle]}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>
        <View style={styles.categorySkeleton}>
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

      {/* Distance Squelette */}
      <View style={styles.distanceSkeleton}>
        <Animated.View style={[styles.shine, animatedStyle]}>
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>

      {/* Info Grid Squelette */}
      <View style={styles.infoGridSkeleton}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.infoItemSkeleton}>
            <View style={styles.iconSkeleton}>
              <Animated.View style={[styles.shine, animatedStyle]}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
            <View style={styles.infoTextSkeleton}>
              <Animated.View style={[styles.shine, animatedStyle]}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.3)",
                    "transparent",
                  ]}
                  style={styles.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </Animated.View>
            </View>
          </View>
        ))}
      </View>

      {/* Boutons d'action Squelette */}
      <View style={styles.actionButtonsSkeleton}>
        <View style={styles.buttonSkeleton}>
          <Animated.View style={[styles.shine, animatedStyle]}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>
        <View style={styles.buttonSkeleton}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  imageSkeleton: {
    width: 148,
    height: 148,
    backgroundColor: "#E1E9EE",
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
    alignSelf: "center",
  },
  mainInfoSkeleton: {
    padding: 20,
    backgroundColor: "white",
  },
  nameSkeleton: {
    height: 32,
    width: "70%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
    alignSelf: "center",
  },
  ratingSkeleton: {
    height: 20,
    width: "40%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
    alignSelf: "center",
  },
  categorySkeleton: {
    height: 16,
    width: "60%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
    alignSelf: "center",
  },
  distanceSkeleton: {
    height: 48,
    margin: 20,
    backgroundColor: "#E1E9EE",
    borderRadius: 12,
    overflow: "hidden",
  },
  infoGridSkeleton: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItemSkeleton: {
    width: "48%",
    marginBottom: 16,
  },
  iconSkeleton: {
    width: 40,
    height: 40,
    backgroundColor: "#E1E9EE",
    borderRadius: 20,
    marginBottom: 8,
    overflow: "hidden",
  },
  infoTextSkeleton: {
    height: 16,
    width: "100%",
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    overflow: "hidden",
  },
  actionButtonsSkeleton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    gap: 12,
  },
  buttonSkeleton: {
    flex: 1,
    height: 56,
    backgroundColor: "#E1E9EE",
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default ArtisanSkeleton;
