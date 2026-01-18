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

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');

  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  const onResetPassword = () => {
    // TODO: gọi API reset password với newPassword
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Phần trên */}
        <View style={styles.topSection}>
          <View style={styles.topContent}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backIcon}>{'<'}</Text>
            </TouchableOpacity>

            <View style={styles.topTextWrapper}>
              <Text style={styles.title}>Choose Your New Password</Text>
            </View>
          </View>
        </View>

        {/* Phần dưới */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>NEW PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.darkgray}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={onResetPassword}
          >
            <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.text },
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
  backIcon: { color: Colors.background, fontSize: 18, fontWeight: 'bold' },
  topTextWrapper: { flex: 1, alignItems: 'center' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.background,
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
  resetButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  resetButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
