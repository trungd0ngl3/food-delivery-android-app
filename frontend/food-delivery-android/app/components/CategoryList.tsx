import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";

const categories = ["All", "Hot Dog", "Burger", "Pizza", "Drinks"];

const CategoryList = () => {
  const [selected, setSelected] = useState("All");

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>All Categories</Text>
            <Pressable style={styles.seeAll}>
                <Text >See All ▶</Text>
            </Pressable>
        </View>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: 10 }}>

            {categories.map((item) => (
                <CategoryItem
                    key={item}
                    label={item}
                    selected={selected === item}
                    onPress={() => setSelected(item)}
                />
            ))}

        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 16 
    },

    header: {
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 10,
    },
    
    title: {
        fontSize: 20
    },

    seeAll: {
        fontSize: 16,
        color: "#333",
    },
});

export default CategoryList;
