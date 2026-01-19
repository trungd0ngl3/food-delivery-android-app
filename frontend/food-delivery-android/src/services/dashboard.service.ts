import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web" ? "http://localhost:8080" : "http://10.0.2.2:8080";
const API_URL = `${BASE_URL}/api/dashboard`;

export interface MenuItemRequest {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  availableForPickup: boolean;
  availableForDelivery: boolean;
}

export interface MenuItemResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  restaurantId: number;
  availableForPickup: boolean;
  availableForDelivery: boolean;
  rating: number | null;
  reviewCount: number | null;
}

/**
 * Get all menu items for a restaurant
 */
export const getRestaurantMenus = async (restaurantId: number) => {
  try {
    const res = await axios.get(`${API_URL}/restaurant/${restaurantId}/menus`);
    return res.data.data as MenuItemResponse[];
  } catch (error) {
    console.error("Error fetching restaurant menus:", error);
    throw error;
  }
};

/**
 * Get menu items by category
 */
export const getRestaurantMenusByCategory = async (
  restaurantId: number,
  category: string
) => {
  try {
    const res = await axios.get(
      `${API_URL}/restaurant/${restaurantId}/menus/category/${category}`
    );
    return res.data.data as MenuItemResponse[];
  } catch (error) {
    console.error("Error fetching restaurant menus by category:", error);
    throw error;
  }
};

/**
 * Create a new menu item
 */
export const createMenuItem = async (
  restaurantId: number,
  item: MenuItemRequest
) => {
  try {
    const res = await axios.post(
      `${API_URL}/restaurant/${restaurantId}/menus`,
      item
    );
    return res.data.data as MenuItemResponse;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
};

/**
 * Update menu item
 */
export const updateMenuItem = async (
  menuId: number,
  item: MenuItemRequest
) => {
  try {
    const res = await axios.put(`${API_URL}/menus/${menuId}`, item);
    return res.data.data as MenuItemResponse;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

/**
 * Delete menu item
 */
export const deleteMenuItem = async (menuId: number) => {
  try {
    const res = await axios.delete(`${API_URL}/menus/${menuId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

/**
 * Get single menu item
 */
export const getMenuItem = async (menuId: number) => {
  try {
    const res = await axios.get(`${API_URL}/menus/${menuId}`);
    return res.data.data as MenuItemResponse;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};
