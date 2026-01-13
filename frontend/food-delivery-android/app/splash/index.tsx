import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const STORAGE_KEYS = {
  HAS_SEEN_INTRO: "hasSeenIntro",
  ACCESS_TOKEN: "accessToken",
};

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!isActive) return;

        const hasSeenIntro = await AsyncStorage.getItem(
          STORAGE_KEYS.HAS_SEEN_INTRO
        );
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (!hasSeenIntro) {
          router.replace("/intro");
        } else if (!token) {
          router.replace("/auth");
        } else {
          router.replace("/main");
        }
      } catch (error) {
        if (isActive) router.replace("/intro");
      }
    };

    bootstrap();

    return () => {
      isActive = false;
    };
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require("../../src/assets/images/splash/icon.png")} style={styles.logo} />
      <Text style={styles.appName}>Food App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF7622",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
});
