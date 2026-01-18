import { Colors } from "@/src/constants/Color";
import { restaurants } from "@/src/data/restaurants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Clock, MoreHorizontal, Plus, Star, Truck } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const restaurant = restaurants.find((r) => r.id === id);
  const [activeCategory, setActiveCategory] = useState("Burger");

  if (!restaurant) {
    return (
      <View style={styles.center}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const menuCategories = ["Burger", "Sandwich", "Pizza", "Sanwich"]; // Mock categories

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Image Section */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <View style={styles.headerOverlay} />
        
        <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton}>
              <MoreHorizontal size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Pager Indicators (Mock) */}
        <View style={styles.pagerContainer}>
           <View style={[styles.pagerDot, styles.pagerDotActive]} />
           <View style={styles.pagerDot} />
           <View style={styles.pagerDot} />
           <View style={styles.pagerDot} />
        </View>
      </View>

      <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          
          {/* Restaurant Info */}
          <View style={styles.infoSection}>
             <View style={styles.ratingRow}>
                <View style={styles.metaItem}>
                    <Star size={20} color={Colors.primary} fill={Colors.primary} />
                    <Text style={styles.metaText}>{restaurant.rating}</Text>
                    <Text style={styles.metaSubText}>(100+)</Text>
                </View>
                <View style={styles.metaItem}>
                    <Truck size={20} color={Colors.primary} />
                    <Text style={styles.metaText}>{restaurant.delivery}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Clock size={20} color={Colors.primary} />
                    <Text style={styles.metaText}>{restaurant.time}</Text>
                </View>
             </View>

             <Text style={styles.restaurantName}>{restaurant.name}</Text>
             <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
          </View>

          {/* Menu Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
             {menuCategories.map((category, index) => (
                 <TouchableOpacity 
                    key={index} 
                    style={[styles.categoryChip, activeCategory === category && styles.categoryChipActive]}
                    onPress={() => setActiveCategory(category)}
                 >
                     <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>{category}</Text>
                 </TouchableOpacity>
             ))}
          </ScrollView>

          {/* Menu Section */}
          <View style={styles.menuSection}>
             <Text style={styles.sectionTitle}>{activeCategory} (10)</Text>

             <View style={styles.menuGrid}>
                 {restaurant.menu && restaurant.menu.length > 0 ? (
                    restaurant.menu.map((item) => (
                       <View key={item.id} style={styles.menuItem}>
                          <View style={styles.menuItemImageContainer}>
                             <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                          </View>
                          <View style={styles.menuItemContent}>
                             <Text style={styles.menuItemName}>{item.name}</Text>
                             <Text style={styles.menuItemStore}>{item.description}</Text>
                             <View style={styles.menuItemFooter}>
                                <Text style={styles.menuItemPrice}>${item.price}</Text>
                                <TouchableOpacity style={styles.addButton}>
                                   <Plus size={20} color={Colors.white} />
                                </TouchableOpacity>
                             </View>
                          </View>
                       </View>
                    ))
                 ) : (
                    <Text style={{color: Colors.darkgray}}>No menu items available for this restaurant yet.</Text>
                 )}
             </View>
          </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
    backgroundColor: Colors.gray, 
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerContainer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
  },
  pagerDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255,255,255,0.5)',
  },
  pagerDotActive: {
      backgroundColor: Colors.white,
      width: 8,
  },
  contentContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -20, // Overlap header
      paddingTop: 24,
  },
  infoSection: {
      paddingHorizontal: 24,
      marginBottom: 24,
  },
  ratingRow: {
      flexDirection: 'row',
      marginBottom: 16,
      alignItems: 'center',
  },
  metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 24,
  },
  metaText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.text,
  },
  metaSubText: {
      marginLeft: 4,
      fontSize: 14,
      color: Colors.darkgray,
  },
  restaurantName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 8,
  },
  restaurantDescription: {
      fontSize: 14,
      color: Colors.darkgray,
      lineHeight: 22,
  },
  categoriesContainer: {
      marginBottom: 24,
  },
  categoriesContent: {
      paddingHorizontal: 24,
      gap: 16,
  },
  categoryChip: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 100,
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: Colors.gray,
  },
  categoryChipActive: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
  },
  categoryText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.text,
  },
  categoryTextActive: {
      color: Colors.white,
  },
  menuSection: {
      paddingHorizontal: 24,
  },
  sectionTitle: {
      fontSize: 20,
      color: Colors.text,
      marginBottom: 24,
  },
  menuGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 16,
  },
  menuItem: {
      width: '47%',
      backgroundColor: Colors.background,
      borderRadius: 24,
      marginBottom: 8,
      // Shadow for iOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      // Shadow for Android
      elevation: 5,
  },
  menuItemImageContainer: {
      height: 140,
      width: '100%',
      padding: 12,
  },
  menuItemImage: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      resizeMode: 'cover',
  },
  menuItemContent: {
      padding: 12,
      paddingTop: 0,
  },
  menuItemName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 4,
  },
  menuItemStore: {
      fontSize: 13,
      color: Colors.darkgray,
      marginBottom: 12,
  },
  menuItemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  menuItemPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
  },
  addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
