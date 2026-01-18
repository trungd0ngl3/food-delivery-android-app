import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:8080" : "http://10.0.2.2:8080";
const API_URL = `${BASE_URL}/api/categories`;

export interface CategoryResponse {
  id: number;
  name: string;
  image: string;
}

export const getAllCategories = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data.data as CategoryResponse[];
};
