import { Clock, Star } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";



function RestaurantItem({name,image,rating,time,tags}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        
        {tags && tags.length > 0 && (
          <Text style={styles.tags} numberOfLines={1}>
             {tags.join(" • ")}
          </Text>
        )}

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Star size={16} color="#FF7622" fill="#FF7622" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <View style={styles.infoItem}>
             <Clock size={16} color="#FF7622" />
             <Text style={styles.time}>{time}</Text>
          </View>
           <View style={styles.infoItem}>
             <Text style={styles.delivery}>Free Delivery</Text>
           </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 12,
  },
  content: {
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#181C2E",
    marginBottom: 6,
  },
  tags: {
    fontSize: 14,
    color: "#A0A5BA",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  rating: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#181C2E",
  },
  time: {
    marginLeft: 6,
    fontSize: 14,
     color: "#181C2E",
  },
  delivery: {
     fontSize: 14,
     color: "#A0A5BA",
  }
});

export default RestaurantItem;