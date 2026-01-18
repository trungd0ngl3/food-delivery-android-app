import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Clock, MoreHorizontal, Star, Truck } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getRestaurantById, RestaurantResponse, MenuResponse } from "@/src/services/restaurant.service";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (id) {
      fetchRestaurant(Number(id));
    }
  }, [id]);

  const fetchRestaurant = async (restaurantId: number) => {
      try {
          const data = await getRestaurantById(restaurantId);
          setRestaurant(data);
          // Set default category if menu exists
            if (data.menu && data.menu.length > 0) {
                const categories = Array.from(new Set(data.menu.map(m => m.category).filter(c => c)));
                if(categories.length > 0) {
                     setSelectedCategory(categories[0]);
                }
            }
      } catch (error) {
          console.error("Error fetching restaurant details:", error);
      } finally {
          setLoading(false);
      }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7622" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const uniqueCategories = restaurant.menu 
    ? Array.from(new Set(restaurant.menu.map((item) => item.category).filter(c => c)))
    : [];
    
  const filteredMenu = restaurant.menu?.filter(item => 
      selectedCategory === "All" || item.category === selectedCategory
  ) || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Image & Navigation */}
      <View style={styles.header}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <View style={styles.headerOverlay}>
            <SafeAreaView style={styles.headerSafeArea} edges={["top"]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Restaurant View</Text>
                 <TouchableOpacity style={styles.iconButton}>
                    <MoreHorizontal color="#000" size={24} />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
      </View>

      <View style={styles.contentContainer}>
         <FlatList
            data={filteredMenu}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={() => (
                <View>
                     <Text style={styles.restaurantName}>{restaurant.name}</Text>
                     <Text style={styles.description}>{restaurant.description}</Text>
                     
                     <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Star size={18} color="#FF7622" fill="#FF7622" />
                            <Text style={styles.infoText}>{restaurant.rating}</Text>
                        </View>
                         <View style={styles.infoItem}>
                            <Truck size={18} color="#FF7622" />
                            <Text style={styles.infoText}>Free</Text>
                        </View>
                         <View style={styles.infoItem}>
                            <Clock size={18} color="#FF7622" />
                            <Text style={styles.infoText}>{restaurant.deliveryTime}</Text>
                        </View>
                     </View>

                     {/* Categories */}
                     <FlatList
                        horizontal
                        data={uniqueCategories}
                        keyExtractor={item => item}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={[
                                    styles.categoryChip, 
                                    selectedCategory === item && styles.categoryChipActive
                                ]}
                                onPress={() => setSelectedCategory(item)}
                            >
                                <Text style={[
                                    styles.categoryText, 
                                    selectedCategory === item && styles.categoryTextActive
                                ]}>{item}</Text>
                            </TouchableOpacity>
                        )}
                     />
                     
                     <Text style={styles.menuSectionTitle}>{selectedCategory} ({filteredMenu.length})</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => router.push({
                        pathname: "/main/food/[id]",
                        params: {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            description: item.description,
                            image: item.image,
                            restaurantName: restaurant.name
                        }
                    })}
                >
                    <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                    <View style={styles.menuItemContent}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDescription} numberOfLines={2}>{restaurant.name} - {item.category}</Text> 
                        <View style={styles.priceRow}>
                                <Text style={styles.price}>${item.price}</Text>
                                <View style={styles.addButton}>
                                    <Text style={styles.plusIcon}>+</Text>
                                </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
         />
      </View>
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
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      height: 250,
      width: '100%',
  },
  headerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
       paddingHorizontal: 24,
  },
  headerSafeArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  iconButton: {
      width: 40,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff', 
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
  },
  contentContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -30,
      paddingHorizontal: 24,
      paddingTop: 30,
  },
  restaurantName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#181C2E',
      marginBottom: 8,
  },
  description: {
      fontSize: 14,
      color: '#A0A5BA',
      marginBottom: 20,
      lineHeight: 22,
  },
  infoRow: {
      flexDirection: 'row',
      marginBottom: 24,
  },
  infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 24,
  },
  infoText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#181C2E',
  },
  categoriesList: {
      marginBottom: 24,
  },
  categoryChip: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#EDEDED',
      marginRight: 10,
      backgroundColor: '#fff',
  },
  categoryChipActive: {
      backgroundColor: '#FF7622',
      borderColor: '#FF7622',
  },
  categoryText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#181C2E',
  },
  categoryTextActive: {
      color: '#fff',
  },
  menuSectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#181C2E',
      marginBottom: 16,
  },
  menuItem: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 16,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 5,
      padding: 12,
  },
  menuItemImage: {
      width: '100%',
      height: 100,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: '#f0f0f0'
  },
  menuItemContent: {
      
  },
  menuItemName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#181C2E',
      marginBottom: 4,
  },
  menuItemDescription: {
      fontSize: 12,
      color: '#A0A5BA',
      marginBottom: 8,
  },
  priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
  },
  price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#181C2E',
  },
  addButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#FF7622',
      justifyContent: 'center',
      alignItems: 'center',
  },
  plusIcon: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: -2,
  }
});
