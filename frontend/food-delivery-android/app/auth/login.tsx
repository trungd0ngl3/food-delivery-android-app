import { Colors } from "@/src/constants/Color";
import { STORAGE_KEYS } from "@/src/constants/storage";
import { loginApi } from "@/src/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    if (!validate()) return;

    try {
      const res = await loginApi(email, password);

      const token = res.token;

      if (rememberMe) {
        const expiredAt = Date.now() + 24 * 60 * 60 * 1000; // 1 ngày

        await AsyncStorage.multiSet([
          [STORAGE_KEYS.ACCESS_TOKEN, token],
          [STORAGE_KEYS.TOKEN_EXPIRED_AT, expiredAt.toString()],
        ]);
        router.replace("/main");
      } else {
        // chỉ lưu trong memory (session)
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        router.replace("/main");
      } 
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const validate = () => {
    if (!email.trim()) {
      alert("Please enter email");
      return false;
    }
    if (!password.trim()) {
      alert("Please enter password");
      return false;
    }
    return true;
  };

  const onGoSignUp = () => {
    router.replace("/auth/register");
  };
  const onGoForgotPass = () => {
    router.replace("/auth/forgot-password");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Phần trên - nền đen 30% */}
        <View style={styles.topSection}>
          <Text style={styles.title}>LOGIN</Text>
          <Text style={styles.description}>
            Please sign in your existing account
          </Text>
        </View>

        {/* Phần dưới - nền trắng 70% */}
        <View style={styles.bottomSection}>
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

          {/* Remember me & Forgot password */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              >
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onGoForgotPass}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Nút Login */}
          <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Sign up */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Does not have an account?</Text>
            <TouchableOpacity onPress={onGoSignUp}>
              <Text style={styles.signupLink}> SIGN UP</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 10,
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.darkgray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberText: {
    fontSize: 13,
    color: Colors.darkgray,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signupText: {
    fontSize: 14,
    color: Colors.darkgray,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default LoginScreen;
