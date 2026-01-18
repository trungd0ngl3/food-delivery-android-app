import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for sizes and ingredients since backend doesn't provide them yet
const SIZES = [
  { id: "10", label: '10"' },
  { id: "14", label: '14"' },
  { id: "16", label: '16"' },
];

const INGREDIENTS = [
  { id: "1", icon: "🧂" },
  { id: "2", icon: "🍗" },
  { id: "3", icon: "🧅" },
  { id: "4", icon: "🧄" },
  { id: "5", icon: "🌶️" },
];

export default function FoodDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, price, description, image, restaurantName } = params;

  const [selectedSize, setSelectedSize] = useState("14");
  const [quantity, setQuantity] = useState(2);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeft color="#181C2E" />
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
        <Pressable style={styles.iconButton}>
             {/* Placeholder for favorite action */}
             <Heart color="#181C2E" size={24} /> 
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
             <Image source={{ uri: image as string }} style={styles.foodImage} />
             <Pressable style={styles.favoriteButtonOnImage}>
                 <Heart color="#fff" fill="transparent" />
             </Pressable>
        </View>

        <View style={styles.restaurantChip}>
            {/* Mock Icon */}
            <View style={styles.restaurantIconPlaceholder} /> 
            <Text style={styles.restaurantName}>{restaurantName || "Restaurant"}</Text>
        </View>

        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Rating & Delivery Info Row - Mocked for visual match */}
        <View style={styles.infoRow}>
            <View style={styles.infoItem}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.infoTextBold}>4.7</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.truckIcon}>🚚</Text>
                <Text style={styles.infoText}>Free</Text>
            </View>
             <View style={styles.infoItem}>
                <Text style={styles.clockIcon}>⏰</Text>
                <Text style={styles.infoText}>20 min</Text>
            </View>
        </View>

        <Text style={styles.sectionLabel}>SIZE:</Text>
        <View style={styles.sizeContainer}>
            {SIZES.map((size) => (
                <Pressable 
                    key={size.id} 
                    style={[
                        styles.sizeButton, 
                        selectedSize === size.id && styles.selectedSizeButton
                    ]}
                    onPress={() => setSelectedSize(size.id)}
                >
                    <Text style={[
                        styles.sizeText,
                         selectedSize === size.id && styles.selectedSizeText
                    ]}>{size.label}</Text>
                </Pressable>
            ))}
        </View>

        <Text style={styles.sectionLabel}>INGREDIENTS</Text>
        <View style={styles.ingredientsContainer}>
            {INGREDIENTS.map((ing) => (
                <View key={ing.id} style={styles.ingredientBadge}>
                    <Text style={{ fontSize: 20 }}>{ing.icon}</Text> 
                </View>
            ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
             <Text style={styles.price}>${price}</Text>
        </View>
        
        <View style={styles.quantityContainer}>
            <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
                <Minus color="#fff" size={20} />
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
                <Plus color="#fff" size={20} />
            </Pressable>
        </View>
      </View>
       
       <View style={styles.addToCartContainer}>
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>ADD TO CART</Text>
            </TouchableOpacity>
       </View>

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
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#181C2E'
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: "#ECF0F4",
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
      paddingBottom: 120,
      paddingHorizontal: 24
  },
  imageContainer: {
      marginTop: 24,
      borderRadius: 24,
      overflow: 'hidden',
      height: 200,
      backgroundColor: '#ccc',
      position: 'relative'
  },
  foodImage: {
      width: '100%',
      height: '100%'
  },
  favoriteButtonOnImage: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 10,
      borderRadius: 20
  },
  restaurantChip: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
      alignSelf: 'flex-start',
      // backgroundColor: '#fff', // if we want a border/shadow
  },
  restaurantIconPlaceholder: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'red',
      marginRight: 8
  },
  restaurantName: {
      fontSize: 14,
      fontWeight: '600',
      color: '#181C2E'
  },
  foodName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#181C2E',
      marginTop: 16
  },
  description: {
      fontSize: 14,
      color: '#A0A5BA',
      marginTop: 8,
      lineHeight: 22
  },
  infoRow: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center'
  },
  infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 24
  },
  starIcon: { color: '#FF7622', marginRight: 4, fontSize: 16 },
  truckIcon: { color: '#FF7622', marginRight: 4, fontSize: 16 },
  clockIcon: { color: '#FF7622', marginRight: 4, fontSize: 16 },
  infoText: { color: '#181C2E', fontSize: 14 },
  infoTextBold: { color: '#181C2E', fontSize: 14, fontWeight: 'bold' },
  sectionLabel: {
      fontSize: 14,
      color: '#32343E',
      marginTop: 24,
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 1
  },
  sizeContainer: {
      flexDirection: 'row',
  },
  sizeButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#F0F5FA',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16
  },
  selectedSizeButton: {
      backgroundColor: '#FF7622'
  },
  sizeText: {
      fontSize: 16,
      color: '#181C2E'
  },
  selectedSizeText: {
      color: '#fff',
      fontWeight: 'bold'
  },
  ingredientsContainer: {
      flexDirection: 'row',
  },
  ingredientBadge: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#FFF0F0', // Light orange/pink ish
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16
  },
  footer: {
      position: 'absolute',
      bottom: 90, // Above Add to Cart
      left: 24,
      right: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  priceContainer: {
  },
  price: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#181C2E'
  },
  quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#181C2E',
      borderRadius: 30,
      paddingHorizontal: 8,
      paddingVertical: 8
  },
  quantityButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#2A2F44', // slightly lighter than container
      alignItems: 'center',
      justifyContent: 'center'
  },
  quantityText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 16
  },
  addToCartContainer: {
      position: 'absolute',
      bottom: 20,
      left: 24,
      right: 24
  },
  addToCartButton: {
      backgroundColor: '#FF7622',
      height: 62,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
  },
  addToCartText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase'
  }
});
