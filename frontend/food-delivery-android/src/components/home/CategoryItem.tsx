import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '@/src/constants/Color';

interface CategoryItemProps {
  props: {
    id: number;
    name: string;
    image: string;
  };
  isSelected?: boolean;
  onPress?: () => void;
}

function CategoryItem({ props, isSelected, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.wrapper}>
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <Text style={[styles.text, isSelected && styles.selectedText]}>{props.name}</Text>
    </TouchableOpacity>
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
  selectedCard: {
    backgroundColor: Colors.primary,
  },
  selectedText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
