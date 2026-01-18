import { Colors } from '@/src/constants/Color';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onBackToLogin = () => {
    router.replace("/auth/login");
  };

  const onSendCode = () => {
    // TODO: gửi request gửi code reset password
    router.replace({
        pathname: "/auth/verify-otp",
        params: {
          flow: "forgot-password",
        },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Phần trên: giống Register nhưng đổi title/description */}
        <View style={styles.topSection}>
          <View style={styles.topContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBackToLogin}>
              <Text style={styles.backIcon}>{'<'}</Text>
            </TouchableOpacity>

            <View style={styles.topTextWrapper}>
              <Text style={styles.title}>FORGOT PASSWORD</Text>
              <Text style={styles.description}>Give us your email</Text>
            </View>
          </View>
        </View>

        {/* Phần dưới: chỉ có email + nút SEND CODE */}
        <View style={styles.bottomSection}>
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

          <TouchableOpacity style={styles.sendButton} onPress={onSendCode}>
            <Text style={styles.sendButtonText}>SEND CODE</Text>
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
    justifyContent: 'center',
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.darkgray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topTextWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.background,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.darkgray,
    textAlign: 'center',
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
    fontWeight: '600',
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
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  sendButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
