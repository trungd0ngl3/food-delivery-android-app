import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import {
  getMenusByRestaurant,
  MenuResponse,
  deleteMenu,
} from "@/src/services/restaurant.service";
import { LoginResponse } from "@/src/services/auth.service";

export default function RestaurantDashboard() {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [menuItems, setMenuItems] = useState<MenuResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // In a real app, you would get the restaurant ID from the user profile
        // For now, we'll assume the restaurantId comes from params or context
        setRestaurantId(parsedUser.id);
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.replace("/auth/login");
    }
  };

  const fetchMenuItems = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const items = await getMenusByRestaurant(restaurantId);
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      Alert.alert("Error", "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = (menuId: number) => {
    Alert.alert(
      "Delete Menu Item",
      "Are you sure you want to delete this menu item?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteMenu(menuId);
              fetchMenuItems();
              Alert.alert("Success", "Menu item deleted successfully");
            } catch (error) {
              console.error("Error deleting menu item:", error);
              Alert.alert("Error", "Failed to delete menu item");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderMenuItemCard = ({ item }: { item: MenuResponse }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuHeader}>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuCategory}>{item.category}</Text>
        </View>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
      </View>

      <Text style={styles.menuDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.menuActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/main/restaurant/edit-menu",
              params: { menuId: item.id },
            })
          }
        >
          <Ionicons name="pencil" size={16} color="#FFF" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteMenuItem(item.id)}
        >
          <Ionicons name="trash" size={16} color="#FFF" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Menu Items Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu Items</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/main/restaurant/add-menu")}
          >
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      ) : menuItems.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="fast-food-outline" size={64} color="#CCC" />
          <Text style={styles.emptyText}>No menu items yet</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/main/restaurant/add-menu")}
          >
            <Text style={styles.primaryButtonText}>Add First Menu Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          renderItem={renderMenuItemCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  menuCategory: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "500",
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B35",
  },
  menuDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
    lineHeight: 18,
  },
  menuActions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  actionButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
