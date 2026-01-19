import { Colors } from '@/src/constants/Color'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CategoryItem from './CategoryItem'

interface CategoryProps {
  categories: any[];
  selectedCategory: number | null;
  onSelectCategory: (id: number) => void;
}

function Category({ categories, selectedCategory, onSelectCategory }: CategoryProps) {
  return (
    <View>
      <View style={styles.categoryHeader}>
        <Text style={{fontSize: 20}}>All Categories</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>See All</Text><ChevronRight size={24} color={Colors.darkgray}/>
        </View>
      </View>
      <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => (
              <CategoryItem
                props={item}
                isSelected={selectedCategory === item.id}
                onPress={() => onSelectCategory(item.id)}
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