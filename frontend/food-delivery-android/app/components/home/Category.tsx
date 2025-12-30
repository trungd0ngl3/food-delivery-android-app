import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CategoryItem from './CategoryItem'

function Category({categories}) {
  return (
    <View>
      <View style={styles.categoryHeader}>
        <Text style={{fontSize: 20}}>All Categories</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>See All</Text><ChevronRight size={24} color={'#727272ff'}/>
        </View>
      </View>
      <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <CategoryItem
                imgUrl={item.image}
                name={item.name}
              />
            )}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  categoryList:{
    marginTop: 24,
    paddingLeft: 24,
  }
})



export default Category