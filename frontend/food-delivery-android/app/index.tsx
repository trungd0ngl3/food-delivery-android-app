import { useState } from "react";
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Category from "./components/home/Category";
import Header from "./components/home/Header";
import RestaurantItem from "./components/home/RestaurantItem";

const user = {
    name: 'trungdongle',
    address: 'HCM City'
};

const categories = [
  { id: "1", name: "Pizza", image: "https://img.icons8.com/color/96/pizza.png" },
  { id: "2", name: "Hamburger", image: "https://img.icons8.com/color/96/hamburger.png" },
  { id: "3", name: "Trà sữa", image: "https://img.icons8.com/color/96/milk-tea.png" },
  { id: "4", name: "Cơm", image: "https://img.icons8.com/color/96/rice-bowl.png" },
  { id: "5", name: "Noodles", image: "https://img.icons8.com/color/96/noodles.png" },
];

const initialRestaurants = [
  {
    id: "1",
    name: "Lotteria - Fried Chicken & Burger",
    time: "20-25 min",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    tags: ["Burger", "Chicken", "Fast Food"],
  },
  {
    id: "2",
    name: "Pizza 4P’s - Artisan Pizza",
    time: "25-30 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    tags: ["Pizza", "Italian", "Pasta"],
  },
  {
    id: "3",
    name: "Highlands Coffee",
    time: "10-15 min",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    tags: ["Coffee", "Tea", "Cake"],
  },
  {
    id: "4",
    name: "McDonald's - I'm Lovin' It",
    time: "15-20 min",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1552526881-721ce8509ea2",
    tags: ["Burger", "Fast Food", "Fries"],
  },
   {
    id: "5",
    name: "KFC - Finger Lickin' Good",
    time: "20-25 min",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    tags: ["Chicken", "Fast Food"],
  },
    {
    id: "6",
    name: "Phúc Long - Coffee & Tea",
    time: "15-20 min",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1549488352-ee4b2075c24e",
    tags: ["Coffee", "Tea", "Bakery"],
  },
];


export default function Index() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [loading, setLoading] = useState(false);

  const loadMoreRestaurants = () => {
    if (loading) return;
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newRestaurants = initialRestaurants.map((item) => ({
        ...item,
        id: (parseInt(item.id) + restaurants.length).toString(),
      }));
      setRestaurants([...restaurants, ...newRestaurants]);
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
           <View style={{paddingHorizontal: 24}}>
              <RestaurantItem
                name={item.name}
                image={item.image}
                rating={item.rating}
                time={item.time}
                tags={item.tags}
              />
           </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Header />
            <Category categories={categories} />
            <Text style={styles.sectionTitle}>Open Restaurants</Text>
          </View>
        )}
        ListFooterComponent={() => (
           loading ? (
             <View style={{ padding: 20 }}>
               <ActivityIndicator size="large" color="#FF7622" />
             </View>
           ) : null
        )}
        onEndReached={loadMoreRestaurants}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#181C2E',
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 24,
  }
});
