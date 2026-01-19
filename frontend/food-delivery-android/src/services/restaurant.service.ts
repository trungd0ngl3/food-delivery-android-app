import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:8080" : "http://10.0.2.2:8080";
const API_URL = `${BASE_URL}/api/restaurants`;

export interface MenuResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface MenuRequest {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  restaurantId: number;
}

export interface RestaurantResponse {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  description: string;
  tags: string[];
  menu: MenuResponse[];
}

export const getAllRestaurants = async (categoryId?: number) => {
  let url = `${API_URL}`;
  if (categoryId) {
    url += `?categoryId=${categoryId}`;
  }
  const res = await axios.get(url);
  // Assuming backend returns ApiResponse<List<RestaurantResponse>>
  return res.data.data as RestaurantResponse[];
};

export const getRestaurantById = async (id: number) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.data as RestaurantResponse;
};

export const searchRestaurants = async (keyword: string) => {
  const res = await axios.get(`${API_URL}/search?name=${keyword}`);
  return res.data.data as RestaurantResponse[];
};

// Menu Management APIs
const MENU_API_URL = `${BASE_URL}/api/menus`;

export const getMenusByRestaurant = async (restaurantId: number) => {
  const res = await axios.get(`${MENU_API_URL}/restaurant/${restaurantId}`);
  return res.data.data as MenuResponse[];
};

export const getMenuById = async (id: number) => {
  const res = await axios.get(`${MENU_API_URL}/${id}`);
  return res.data.data as MenuResponse;
};

export const createMenu = async (data: MenuRequest) => {
  const res = await axios.post(MENU_API_URL, data);
  return res.data.data as MenuResponse;
};

export const updateMenu = async (id: number, data: MenuRequest) => {
  const res = await axios.put(`${MENU_API_URL}/${id}`, data);
  return res.data.data as MenuResponse;
};

export const deleteMenu = async (id: number) => {
  const res = await axios.delete(`${MENU_API_URL}/${id}`);
  return res.data.data;
};
