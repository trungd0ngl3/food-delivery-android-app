import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import RestaurantItem from "./RestaurantItem";

const restaurants = ["1 Restaurant", "2 Restaurant", "3 Restaurant"]


const RestaurantList = () =>{
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Open Restaurant</Text>
                    <Pressable style={styles.seeAll}>
                        <Text >See All ▶</Text>
                    </Pressable>
                </View>
                <ScrollView>

                    {restaurants.map((item) => (
                        <RestaurantItem
                            key={item}
                            name={item}
                        />
                    ))}

                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 16
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

export default RestaurantList;