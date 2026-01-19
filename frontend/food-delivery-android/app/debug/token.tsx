import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function DebugToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then(setToken);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Token:</Text>
      <Text selectable>{token ?? "NO TOKEN"}</Text>
    </View>
  );
}
