import { Colors } from "@/src/constants/Color";
import { confirmRegister } from "@/src/services/auth.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyScreen = () => {
  const [code, setCode] = useState("");
  const { flow, email, name, password } = useLocalSearchParams<{
    flow?: "register" | "forgot-password";
    email?: string;
    name?: string;
    password?: string;
  }>();

  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  const onConfirm = async () => {
    if (!code) {
      alert("Please input OTP");
      return;
    }

    try {
      if (flow === "register") {
        await confirmRegister({
          name: name!,
          email: email!,
          password: password!,
          otp: code,
        });

        alert("Register success");
        router.replace("/auth/login");
      }

      if (flow === "forgot-password") {
        router.replace({
          pathname: "/auth/reset-password",
          params: {
            email,
            otp: code,
          },
        });
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "OTP invalid");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Phần trên */}
        <View style={styles.topSection}>
          <View style={styles.topContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backIcon}>{"<"}</Text>
            </TouchableOpacity>

            <View style={styles.topTextWrapper}>
              <Text style={styles.title}>VERIFY</Text>
              <Text style={styles.description}>Input your code in email</Text>
            </View>
          </View>
        </View>

        {/* Phần dưới */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>CODE</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            placeholderTextColor={Colors.darkgray}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6} // ví dụ 6 số
          />

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
  },
  topSection: {
    flex: 0.3,
    backgroundColor: Colors.text,
    justifyContent: "center",
  },
  topContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.darkgray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backIcon: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
  topTextWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.darkgray,
    textAlign: "center",
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkgray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
    letterSpacing: 4, // cho cảm giác kiểu code/OTP
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyScreen;
