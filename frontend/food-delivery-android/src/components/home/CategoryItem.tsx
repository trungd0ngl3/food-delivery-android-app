import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function CategoryItem({ props }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginRight: 16,
  },

  card: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  image: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },

  text: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});

export default CategoryItem;
