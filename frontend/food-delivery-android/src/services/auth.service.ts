import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:8080" : "http://10.0.2.2:8080";
const API_URL = `${BASE_URL}/api/auth`;
// ⚠️ Android emulator: localhost = 10.0.2.2
// iOS simulator: localhost OK

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const requestRegisterOtp = async (data: RegisterRequest) => {
  const res = await axios.post(`${API_URL}/register/request-otp`, data);
  return res.data;
};

export const confirmRegister = async (data: {
  name: string;
  email: string;
  password: string;
  otp: string;
}) => {
  const res = await axios.post(`${API_URL}/register/confirm`, data);
  return res.data;
};

export const loginApi = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return res.data.data as LoginResponse;
};

export const requestForgotPasswordOtp = async (email: string) => {
  const res = await axios.post(`${API_URL}/forgot-password/request-otp`, {
    email,
  });
  return res.data;
};

export const confirmPasswordReset = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const res = await axios.post(`${API_URL}/forgot-password/confirm`, data);
  return res.data;
};
