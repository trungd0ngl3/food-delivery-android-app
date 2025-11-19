import { Image, Pressable, StyleSheet, Text, View } from "react-native";


const RestaurantItem = ({name}) =>{
    return (
        <Pressable style={styles.container}>

            <Image style={styles.restaurantImg} source={require('../../assets/images/icon.png')}/>

            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.restaurantMenu}>Burger - Chicken - Riche - Wings</Text>

            <View style={{flexDirection: 'row'}}>
                <View style={styles.info}>
                    <Image style={styles.icon} source={require('../../assets//icons/start.png')}/>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>4.7</Text>
                </View>
                <View style={styles.info}>
                    <Image style={styles.icon} source={require('../../assets//icons/car.png')}/>
                    <Text>Free</Text>
                </View>
                <View style={styles.info}>
                    <Image style={styles.icon} source={require('../../assets//icons/clock.png')}/>
                    <Text>20 min</Text>
                </View>
            </View>
        </Pressable>    
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 28
    },

    restaurantImg:{
        width: 'auto',
        height: '300',
        borderRadius: 15
    },
    
    restaurantName:{
        fontSize:20,
        marginVertical: 5
    },

    restaurantMenu:{
        fontSize: 14,
        color: '#A0A5BA',
        marginBottom: 14
    },

    info:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24
    },

    icon:{
        width: 20,
        height: 20,
        tintColor: '#FF7622'
    }

});
export default RestaurantItem;