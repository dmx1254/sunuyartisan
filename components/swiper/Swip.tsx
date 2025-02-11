import React, { useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Swiper from "react-native-swiper";
import { DotActiveSwipe, DotSwipe } from "./SwiperDot";
import { useRouter } from "expo-router";

import useStore from "@/app/lib/store/manage";

const Swip = () => {
  const router = useRouter();
  const { updateStartup } = useStore();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabLength = 4;
  const swiperRef = useRef<Swiper>(null);

  const handleChangeIndex = () => {
    if (activeIndex < tabLength - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      updateStartup(true);
      router.push("/(root)/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          dot={<DotSwipe />}
          activeDot={<DotActiveSwipe />}
          horizontal
          autoplayTimeout={3.5}
          showsButtons={false}
          removeClippedSubviews={false}
          index={activeIndex}
          onIndexChanged={setActiveIndex}
          loop={false}
          paginationStyle={styles.pagination}
        >
          <View className="flex-1 flex-col items-center justify-center">
            <Image
              source={require("../../assets/images/swiper/demarrage.png")}
              resizeMode="cover"
              className="rounded-[10px] z-10"
              style={{
                width: 280,
                height: 240,
                objectFit: "contain",
              }}
            />
            <Text className="text-5xl font-rubik-bold mt-8 mb-4">
              Démarrage
            </Text>
            <View className="w-full mb-6">
              <Text className="text-2xl font-light mx-8 text-center">
                Avec l'application{" "}
                <Text className="font-rubik-bold">Suñuy Artisan</Text>, trouver
                un artisan certifié n'a jamais été aussi simple.
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col items-center justify-center">
            <Image
              source={require("../../assets/images/swiper/create-account.png")}
              resizeMode="cover"
              className="rounded-[10px] z-10"
              style={{
                width: 280,
                height: 240,
                objectFit: "cover",
              }}
            />
            <Text className="text-5xl font-rubik-bold mt-8 mb-4 w-full max-w-72 text-center">
              Créez votre compte
            </Text>
            <View className="w-full mb-6">
              <Text className="text-2xl font-light mx-8 text-center">
                Trouvez facilement tous les corps de métier pour vos travaux de
                réparation et de dépannage.
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-col items-center justify-center">
            <Image
              source={require("../../assets/images/swiper/search-artisan.png")}
              resizeMode="cover"
              className="rounded-[10px] z-10"
              style={{
                width: 280,
                height: 240,
                objectFit: "contain",
              }}
            />
            <Text className="text-5xl font-rubik-bold mt-8 mb-4 w-full max-w-72 text-center">
              Recherchez un artisan
            </Text>
            <View className="w-full mb-6">
              <Text className="text-2xl font-light mx-8 text-center">
                Trouvez facilement tous les corps de métier pour vos travaux de
                réparation et de dépannage.
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-col items-center justify-center">
            <Image
              source={require("../../assets/images/swiper/ready.png")}
              resizeMode="contain"
              className="rounded-[10px] z-10"
              style={{
                width: 280,
                height: 240,
                objectFit: "contain",
              }}
            />
            <Text className="text-5xl font-rubik-bold mt-8 mb-4 w-full max-w-72 text-center">
              C'est lancé !
            </Text>
            <View className="w-full mb-6">
              <Text className="text-2xl font-light mx-8 text-center">
                Désormais, vous pouvez tirer pleinement parti de votre
                application.
              </Text>
            </View>
          </View>
        </Swiper>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-primary-300 p-4 rounded-full w-full max-w-56"
        onPress={handleChangeIndex}
        style={[styles.button]}
      >
        <Text className="font-rubik-medium text-white text-2xl text-center">
          Suivant
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: 80, // Espace pour le bouton
  },
  pagination: {
    bottom: Platform.OS === "android" ? 55 : 80,
  },
  button: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 60 : 80,
    alignSelf: "center",
  },
});

export default Swip;
