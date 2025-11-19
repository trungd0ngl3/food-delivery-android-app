import { ScrollView, StyleSheet } from "react-native";
import CategoryList from "./components/CategoryList";
import HomeHeader from "./components/HomeHeader";
import RestaurantList from "./components/RestaurantList";
import SearchBar from "./components/SeachBar";


export default function Index() {
  const user = {
    name: 'trungdongle',
    address: 'HCM City'
  }

  return (
    <ScrollView style={styles.container}>
      <HomeHeader user={user}/>
      <SearchBar/>
      <CategoryList/>
      <RestaurantList/>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 24,
    backgroundColor: '#fff'
  }
});
