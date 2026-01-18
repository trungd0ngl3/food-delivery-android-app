import { Colors } from '@/src/constants/Color';
import { Link } from 'expo-router';
import { ChevronDown, Menu, Search, ShoppingBag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

function Header() {
  const [username, setUsername] = useState('user');
  const [time, setTime] = useState('Afternoon');
  const [cartCount, setCartCount] = useState(2)


  return (
    <View style={{paddingHorizontal: 24, paddingTop: 12}}>
      <View style={styles.container}>
        {/* Menu */}
        <View style={styles.container} >
          <Pressable style={[styles.button, styles.menu]}><Menu /></Pressable>
          <View style={styles.info}>
            <Text style={[styles.deliverTo, styles.bold]}>DELIVER TO</Text>
            <Text style={styles.address}>Halal Lab Office <ChevronDown height={16} strokeWidth={3}/></Text>
          </View>
        </View>

        {/* Cart */}
        <View>
          <Pressable style={[styles.button, styles.cart]}>
            <ShoppingBag color={'#fff'}/>

            { cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
              </View>
            )
            }

            </Pressable>
        </View>
      </View>

      <Text style={styles.greeting}>Hey {username}, <Text style={styles.bold}>Good {time}!</Text> </Text>
      
      {/* Search Bar */}
      <Link href="/search" asChild>
        <Pressable style={styles.searchBar}>
          <Search style={styles.searchIcon} color={Colors.darkgray} />
          <TextInput 
            style={styles.searchInput} 
            placeholder='Search..' 
            editable={false} 
            pointerEvents="none" 
          />
        </Pressable>
      </Link>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  info:{
    paddingVertical: 6,
    marginLeft: 12
  },

  deliverTo:{
    fontSize: 12,
    color: Colors.primary,
  },

  address:{
    fontSize: 14,
    color: Colors.darkgray,
  },

  greeting:{
    fontSize: 16,
    marginTop: 24,
    marginBottom: 16,
  },

  bold:{
    fontWeight: 'bold'
  },

  button:{
    width: 48,
    height: 48,
    borderRadius:24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  menu:{
    backgroundColor: Colors.gray
  },
  cart:{
    backgroundColor: Colors.black,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },

  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  searchBar:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray,
    height: 64,
    borderRadius: 10
  },

  searchIcon:{
    marginLeft: 16,
    marginRight: 10
  },

  searchInput:{
    flex: 1,
    fontSize: 14
  }
})

export default Header