

import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Search as SearchIcon,
  Star,
  X,
} from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  searchRestaurants,
  getAllRestaurants,
  RestaurantResponse,
} from "@/src/services/restaurant.service";

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<RestaurantResponse[]>([]);
  const [suggestions, setSuggestions] = useState<RestaurantResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await getAllRestaurants();
      setSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchRestaurants(searchText);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft color={Colors.black}/>
        </Pressable>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 45 }} /> 
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon color={Colors.darkgray} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Search on foodly"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText ? (
            <Pressable onPress={() => setSearchText("")}>
              <X color="#A0A5BA" size={20} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF7622" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={searchText ? results : suggestions}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            !searchText && suggestions.length > 0 ? (
                <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
            ) : null
          }
          ListEmptyComponent={
            searchText && !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/main/restaurant/${item.id}`)}
              style={styles.restaurantRow}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} fill="#FF7622" color="#FF7622" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.deliveryTime}> • {item.deliveryTime}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: "#ECF0F4",
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#181C2E",
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#181C2E",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#A0A5BA",
  },
  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  restaurantInfo: {
    marginLeft: 16,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    color: "#32343E",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#181C2E",
  },
  deliveryTime: {
      fontSize: 14,
      color: '#A0A5BA'
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#32343E',
      marginBottom: 16,
      marginTop: 10
  }
});
