import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RestaurantIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/main/restaurant/dashboard");
  }, []);

  return null;
}
