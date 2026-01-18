import { Colors } from "@/src/constants/Color";
import { requestRegisterOtp } from "@/src/services/auth.service";
import { useRouter } from "expo-router";
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

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onBackToLogin = () => {
    router.replace("/auth/login");
  };

  const onSignUp = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await requestRegisterOtp({ name, email, password });

      router.replace({
        pathname: "/auth/verify-otp",
        params: {
          flow: "register",
          name,
          email,
          password,
        },
      });
    } catch (err: any) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Phần trên: nền đen + nút back + tiêu đề */}
        <View style={styles.topSection}>
          <View style={styles.topContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBackToLogin}>
              <Text style={styles.backIcon}>{"<"}</Text>
            </TouchableOpacity>

            <View style={styles.topTextWrapper}>
              <Text style={styles.title}>SIGN UP</Text>
              <Text style={styles.description}>
                Please sign up to get started
              </Text>
            </View>
          </View>
        </View>

        {/* Phần dưới: nền trắng, các input + nút SIGN UP */}
        <View style={styles.bottomSection}>
          {/* Name */}
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={Colors.darkgray}
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor={Colors.darkgray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.darkgray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Nút SIGN UP */}
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
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
    fontSize: 28,
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
    marginTop: 15,
  },
  input: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  signUpButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
