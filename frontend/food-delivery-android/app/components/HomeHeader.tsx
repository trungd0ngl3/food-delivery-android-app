import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const HomeHeader = ({ user }: any) =>{

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <Pressable onPress={() => {console.log('Menu')}}>
                        <View style={styles.icon}>
                            <Image style={styles.image} 
                                source={require('../../assets/icons/menu.png')} />
                        </View>
                    </Pressable>
                    
                    <View style={{marginHorizontal: 18}}>
                        <Text style={styles.addressTitle}>DELIVER TO</Text>
                        <Text style={styles.address}>
                            {user.address}.
                            <Image style={styles.dropdownButton} source={require('../../assets/icons/dropdown.png')}/>
                        </Text>
                    </View>
                </View>
                <View style={[styles.icon, styles.cart]}>
                    <Image style={styles.image} source={require('../../assets/icons/cart.png')} />
                </View>
            </View>

            <View style={styles.greeting}>
                <Text>Hey {user.name}, <Text style={{fontWeight: 'bold'}}>Good Afternoon</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 24,
        marginTop: 16
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    image:{
        width: 20,
        height: 20
    },

    icon:{
        width: 45,
        height: 45,
        backgroundColor: '#ECF0F4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 45/2
    },

    addressTitle:{
        color: '#FC6E2A',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 8
    },

    address:{
        fontSize: 14,
        color: '#676767'
    },

    dropdownButton:{
        width: 16,
        height: 16
    },

    cart:{
        backgroundColor: '#181C2E',
    },

    greeting:{
        marginTop: 24,
        fontSize: 16
    }


});

export default HomeHeader;