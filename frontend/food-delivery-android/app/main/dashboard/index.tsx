import {
  CategoryResponse,
  getAllCategories,
} from "@/src/services/category.service";
import {
  createMenuItem,
  deleteMenuItem,
  getRestaurantMenus,
  getRestaurantMenusByCategory,
  MenuItemRequest,
  MenuItemResponse,
} from "@/src/services/dashboard.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { AlertCircle, ChevronLeft, Trash2, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TabType {
  id: string;
  label: string;
}

interface FormData {
  name: string;
  price: string;
  category: string;
  description: string;
  availableForPickup: boolean;
  availableForDelivery: boolean;
  image: string | null;
}

const TABS: TabType[] = [
  { id: "foodList", label: "My Food List" },
  { id: "addItem", label: "Add New Item" },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("foodList");
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    initializeRestaurantId();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories([{ id: 0, name: "All", image: "" }, ...data]);
      setCategoryOptions(data.map((cat) => cat.name));
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback to defaults if service fails
      setCategories([
        { id: 0, name: "All", image: "" },
        { id: 1, name: "Breakfast", image: "" },
        { id: 2, name: "Lunch", image: "" },
        { id: 3, name: "Dinner", image: "" },
      ]);
      setCategoryOptions(["Breakfast", "Lunch", "Dinner"]);
    }
  };

  const initializeRestaurantId = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        // For now, using user id as restaurant id (should be mapped properly in real scenario)
        setRestaurantId(user.id);
      }
    } catch (error) {
      console.error("Error initializing restaurant ID:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF7622" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Dashboard</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === "foodList" && restaurantId && (
          <FoodListTab restaurantId={restaurantId} categories={categories} />
        )}
        {activeTab === "addItem" && restaurantId && (
          <AddItemTab
            restaurantId={restaurantId}
            categoryOptions={categoryOptions}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface FoodListTabProps {
  restaurantId: number;
  categories: CategoryResponse[];
}

function FoodListTab({ restaurantId, categories }: FoodListTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [foodItems, setFoodItems] = useState<MenuItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory, restaurantId]);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      let items: MenuItemResponse[];
      if (selectedCategory === "All") {
        items = await getRestaurantMenus(restaurantId);
      } else {
        items = await getRestaurantMenusByCategory(
          restaurantId,
          selectedCategory,
        );
      }
      setFoodItems(items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = (itemId: number, itemName: string) => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${itemName}"?`,
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteMenuItem(itemId);
              setFoodItems(foodItems.filter((item) => item.id !== itemId));
              Alert.alert("Success", "Item deleted successfully");
            } catch (err) {
              Alert.alert("Error", "Failed to delete item");
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  return (
    <View>
      {/* Category Tabs */}
      <View style={styles.categoryTabsContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.name && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category.name &&
                  styles.categoryTabTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Item Count */}
      <Text style={styles.itemCount}>Total {foodItems.length} items</Text>

      {/* Loading State */}
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF7622" />
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <AlertCircle size={24} color="#FF0000" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Empty State */}
      {!loading && foodItems.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items found</Text>
        </View>
      )}

      {/* Food Items */}
      <View style={styles.foodListContainer}>
        {foodItems.map((item) => (
          <View key={item.id} style={styles.foodItemCard}>
            <Image source={{ uri: item.image }} style={styles.foodItemImage} />

            <View style={styles.foodItemInfo}>
              <Text style={styles.foodItemName}>{item.name}</Text>

              <Text style={styles.foodItemCategory}>{item.category}</Text>

              <View style={styles.foodItemBottom}>
                <Text style={styles.foodItemPrice}>${item.price}</Text>

                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStars}>★</Text>
                  <Text style={styles.rating}>
                    {(item.rating || 0).toFixed(1)}
                  </Text>
                  <Text style={styles.reviews}>
                    ({item.reviewCount || 0} reviews)
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={
                    item.availableForPickup
                      ? styles.pickupBtn
                      : styles.pickupBtnInactive
                  }
                >
                  <Text style={styles.pickupBtnText}>Pick UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    item.availableForDelivery
                      ? styles.deliveryBtn
                      : styles.deliveryBtnInactive
                  }
                >
                  <Text style={styles.deliveryBtnText}>Delivery</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id, item.name)}
            >
              <Trash2 size={20} color="#FF0000" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

function AddItemTab({
  restaurantId,
  categoryOptions,
}: {
  restaurantId: number;
  categoryOptions: string[];
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    category: categoryOptions[0] || "Breakfast",
    description: "",
    availableForPickup: true,
    availableForDelivery: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.cancelled && result.assets && result.assets[0]) {
        setFormData({
          ...formData,
          image: result.assets[0].uri,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error("Image picker error:", error);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter item name");
      return;
    }
    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      Alert.alert("Error", "Please enter valid price");
      return;
    }
    if (!formData.description.trim()) {
      Alert.alert("Error", "Please enter item description");
      return;
    }

    setLoading(true);
    try {
      const menuItem: MenuItemRequest = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image || "https://via.placeholder.com/200",
        category: formData.category,
        availableForPickup: formData.availableForPickup,
        availableForDelivery: formData.availableForDelivery,
      };

      await createMenuItem(restaurantId, menuItem);
      Alert.alert("Success", "Menu item created successfully");

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "Breakfast",
        description: "",
        availableForPickup: true,
        availableForDelivery: true,
        image: null,
      });
    } catch (error) {
      console.error("Error creating menu item:", error);
      Alert.alert("Error", "Failed to create menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.addItemContainer}>
      {/* Image Picker Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ITEM IMAGE</Text>
        {formData.image ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: formData.image }}
              style={styles.imagePreview}
            />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={removeImage}
            >
              <X size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={pickImage}
            >
              <Text style={styles.changeImageButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            <View style={styles.imagePlaceholderContent}>
              <Text style={styles.imagePlaceholderText}>📷</Text>
              <Text style={styles.imagePlaceholderLabel}>
                Tap to select image
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Item Name */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>ITEM NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Price Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>PRICE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={formData.price}
          onChangeText={(text) => handleInputChange("price", text)}
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />
      </View>

      {/* Category Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>CATEGORY</Text>
        <View style={styles.categorySelectContainer}>
          {categoryOptions.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categorySelectButton,
                formData.category === category &&
                  styles.categorySelectButtonActive,
              ]}
              onPress={() => handleInputChange("category", category)}
            >
              <Text
                style={[
                  styles.categorySelectText,
                  formData.category === category &&
                    styles.categorySelectTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.detailsInput]}
          placeholder="Enter item description"
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />
      </View>

      {/* Availability Options */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>AVAILABILITY</Text>
        <View style={styles.availabilityContainer}>
          <TouchableOpacity
            style={styles.availabilityOption}
            onPress={() =>
              handleInputChange(
                "availableForPickup",
                !formData.availableForPickup,
              )
            }
          >
            <View
              style={[
                styles.checkbox,
                formData.availableForPickup && styles.checkboxActive,
              ]}
            />
            <Text style={styles.optionText}>Available for Pick up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.availabilityOption}
            onPress={() =>
              handleInputChange(
                "availableForDelivery",
                !formData.availableForDelivery,
              )
            }
          >
            <View
              style={[
                styles.checkbox,
                formData.availableForDelivery && styles.checkboxActive,
              ]}
            />
            <Text style={styles.optionText}>Available for Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingHorizontal: 24,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#FF7622",
  },
  tabText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#FF7622",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE4CC",
    padding: 16,
    marginHorizontal: 24,
    marginVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: "#FF0000",
    fontWeight: "500",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },

  // Food List Tab Styles
  categoryTabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  categoryTabActive: {
    backgroundColor: "#FF7622",
  },
  categoryTabText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  categoryTabTextActive: {
    color: "#fff",
  },
  itemCount: {
    fontSize: 12,
    color: "#999",
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  foodListContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  foodItemCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  foodItemImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#A8B8C8",
    borderRadius: 12,
    marginRight: 16,
  },
  foodItemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#F0F0F0",
  },
  foodItemInfo: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  foodItemCategory: {
    fontSize: 12,
    color: "#FF7622",
    backgroundColor: "#FFE4CC",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  foodItemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  foodItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF7622",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingStars: {
    fontSize: 14,
    color: "#FF7622",
  },
  rating: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },
  reviews: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  pickupBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#FF7622",
    borderRadius: 4,
  },
  pickupBtnInactive: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    backgroundColor: "#F0F0F0",
  },
  pickupBtnText: {
    fontSize: 11,
    color: "#FF7622",
    fontWeight: "500",
  },
  deliveryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
  },
  deliveryBtnInactive: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  deliveryBtnText: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
  },

  // Add Item Tab Styles
  addItemContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color: "#333",
  },
  categorySelectContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  categorySelectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  categorySelectButtonActive: {
    backgroundColor: "#FF7622",
    borderColor: "#FF7622",
  },
  categorySelectText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  categorySelectTextActive: {
    color: "#FFF",
  },
  detailsInput: {
    minHeight: 100,
    paddingVertical: 16,
    textAlignVertical: "top",
  },
  availabilityContainer: {
    gap: 12,
  },
  availabilityOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    backgroundColor: "#FFF",
  },
  checkboxActive: {
    backgroundColor: "#FF7622",
    borderColor: "#FF7622",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  imagePlaceholder: {
    borderWidth: 2,
    borderColor: "#DDD",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  imagePlaceholderContent: {
    alignItems: "center",
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 48,
  },
  imagePlaceholderLabel: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  imagePreviewContainer: {
    position: "relative",
    alignItems: "center",
    gap: 12,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  removeImageButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#FF7622",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  changeImageButton: {
    backgroundColor: "#666",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  changeImageButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#FF7622",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
