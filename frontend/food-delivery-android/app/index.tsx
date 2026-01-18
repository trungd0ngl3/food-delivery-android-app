import { useState } from "react";
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Category from "@/src/components/home/Category";
import Header from "@/src/components/home/Header";
import RestaurantItem from "@/src/components/home/RestaurantItem";

import { restaurants as initialRestaurants } from "@/src/data/restaurants";
import { useRouter } from "expo-router";

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

export default function Index() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [loading, setLoading] = useState(false);

  const loadMoreRestaurants = () => {
    if (loading) return;
    setLoading(true);
    
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
                onPress={() => router.push(`/restaurant/${item.id}`)}
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
