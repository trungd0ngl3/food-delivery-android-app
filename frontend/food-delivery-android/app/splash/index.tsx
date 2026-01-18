import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { STORAGE_KEYS } from "../../src/constants/storage";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isActive) return;

        const [token, expiredAt, hasSeenIntro] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRED_AT),
          AsyncStorage.getItem(STORAGE_KEYS.HAS_SEEN_INTRO),
        ]);

        // 1️⃣ Chưa xem intro → intro
        if (!hasSeenIntro) {
          router.replace("/intro");
          return;
        }

        if (!token) {
          router.replace("/auth/login");
          return;
        }

        if (expiredAt && Date.now() > Number(expiredAt)) {
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.TOKEN_EXPIRED_AT,
          ]);
          router.replace("/auth/login");
          return;
        }

        // 4️⃣ Token hợp lệ → main
        router.replace("/main");
      } catch (error) {
        console.log("Error during bootstrap:", error);
        router.replace("/auth/login");
      }
    };

    bootstrap();

    return () => {
      isActive = false;
    };
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../src/assets/images/splash/icon.png")}
        style={styles.logo}
      />
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
