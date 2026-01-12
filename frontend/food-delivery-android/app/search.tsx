import { useRouter } from 'expo-router';
import { ChevronLeft, Search as SearchIcon, ShoppingBag, Star, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const recentKeywords = ['Burger', 'Sandwich', 'Pizza', 'Sandwich'];
  
  const suggestedRestaurants = [
    {
      id: '1',
      name: 'Pansi Restaurant',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    },
    {
      id: '2',
      name: 'American Spicy Burger Shop',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    },
    {
      id: '3',
      name: 'Cafenio Coffee Club',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    },
  ];

  const popularFastFoods = [
    {
      id: '1',
      name: 'European Pizza',
      restaurant: 'Uttora Coffe House',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    },
    {
      id: '2',
      name: 'Buffalo Pizza',
      restaurant: 'Cafenio Coffee Club',
      image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a',
    },
    {
      id: '3',
      name: 'Cheese Burger',
      restaurant: 'Burger King',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft color="#181C2E" />
        </Pressable>
        <Text style={styles.headerTitle}>Search</Text>
        <Pressable style={styles.cartButton}>
             <ShoppingBag color="#fff" />
             <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
             </View>
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon color="#A0A5BA" size={20} />
          <TextInput
            style={styles.input}
            placeholder="Search on foodly"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText ? (
            <Pressable onPress={() => setSearchText('')}>
              <X color="#A0A5BA" size={20} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Recent Keywords */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Keywords</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {recentKeywords.map((keyword, index) => (
              <Pressable key={index} style={styles.keywordChip}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Suggested Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
          {suggestedRestaurants.map((restaurant) => (
            <Pressable key={restaurant.id} style={styles.restaurantRow}>
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} fill="#FF7622" color="#FF7622" />
                  <Text style={styles.ratingText}>{restaurant.rating}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Popular Fast Food */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Fast Food</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
             {popularFastFoods.map((food) => (
                <Pressable key={food.id} style={styles.foodCard}>
                   <Image source={{ uri: food.image }} style={styles.foodImage} />
                   <Text style={styles.foodName}>{food.name}</Text>
                   <Text style={styles.foodRestaurant}>{food.restaurant}</Text>
                </Pressable>
             ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: '#ECF0F4',
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181C2E',
  },
  cartButton: {
      width: 45,
      height: 45,
      backgroundColor: '#181C2E',
      borderRadius: 22.5,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
  },
  cartBadge: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: '#FF7622',
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#fff'
  },
  cartBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold'
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 12
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#181C2E',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#32343E',
    marginBottom: 16,
    // fontWeight: 'normal' // Font from image looks regular/medium
  },
  horizontalScroll: {
    // paddingHorizontal: 24, // Handled by section padding for title alignment? No, scrollview needs to go edge to edge usually or fit.
    // If we want items to scroll normally, we can remove paddingHorizontal from section for the scrollview part, but easiest is to just have padding in container
    marginHorizontal: -24,
    paddingHorizontal: 24
  },
  keywordChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EDEDED',
    marginRight: 12,
  },
  keywordText: {
    color: '#181C2E',
    fontSize: 16,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  restaurantInfo: {
    marginLeft: 16,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    color: '#32343E',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#181C2E',
  },
  foodCard: {
      width: 150,
      marginRight: 20,
  },
  foodImage: {
      width: 150,
      height: 120,
      borderRadius: 15,
      marginBottom: 12
  },
  foodName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#181C2E',
      marginBottom: 4
  },
  foodRestaurant: {
      fontSize: 13,
      color: '#A0A5BA'
  }
});
