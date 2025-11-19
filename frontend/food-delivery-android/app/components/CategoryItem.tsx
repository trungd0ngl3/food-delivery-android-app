import { Image, Pressable, StyleSheet, Text } from "react-native";



const CategoryItem = ({label, selected = false, onPress}) =>{
    return (
        <Pressable 
            onPress={onPress}
            style={[styles.container,
                selected ? styles.selectedContainer : styles.unselectedContainer,
            ]}>
            <Image style={styles.icon} source={require('../../assets/images/icon.png')}/>
            <Text>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        marginHorizontal: 8,
        padding: 8,
        paddingRight: 20
    },

    icon:{
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 8
    },
    selectedContainer:{
        backgroundColor: '#FFD27C'
    },
    unselectedContainer:{
        borderWidth: 1,
        borderColor: "#eee"
    }
});

export default CategoryItem;