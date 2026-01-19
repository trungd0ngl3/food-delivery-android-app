import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Category from "@/src/components/home/Category";
import Header from "@/src/components/home/Header";
import RestaurantItem from "@/src/components/home/RestaurantItem";

import {
  getAllRestaurants,
  RestaurantResponse,
} from "@/src/services/restaurant.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllCategories, CategoryResponse } from "@/src/services/category.service";
import { LoginResponse } from "@/src/services/auth.service";

export default function MainScreen() {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [selectedCategory]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
        const [restaurantsData, categoriesData] = await Promise.all([
            getAllRestaurants(),
            getAllCategories()
        ]);
        setRestaurants(restaurantsData);
        setCategories(categoriesData);

        // Fetch User
        const userJson = await AsyncStorage.getItem("user");
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
        const restaurantsData = await getAllRestaurants(selectedCategory || undefined);
        setRestaurants(restaurantsData);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    } finally {
        setLoading(false);
    }
  };

  const onSelectCategory = (id: number) => {
    if (selectedCategory === id) {
        setSelectedCategory(null);
    } else {
        setSelectedCategory(id);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 24 }}>
            <TouchableOpacity
              onPress={() => router.push(`/main/restaurant/${item.id}`)}
            >
              <RestaurantItem
                name={item.name}
                image={item.image}
                rating={item.rating}
                time={item.deliveryTime}
                tags={item.tags}
              />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Header user={user} />
            <Category 
                categories={categories} 
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />
            <Text style={styles.sectionTitle}>Open Restaurants</Text>
          </View>
        )}
        ListFooterComponent={() =>
          loading ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="large" color="#FF7622" />
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#181C2E",
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
});
