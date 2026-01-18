import { Link } from "expo-router";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { LoginResponse } from "@/src/services/auth.service";

interface HeaderProps {
  user: LoginResponse | null;
}

function Header({ user }: HeaderProps) {
  const [cartCount, setCartCount] = useState(2);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Night";
  };

  const greeting = getGreeting();
  const username = user?.name || "Guest";

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 12 }}>
      <View style={styles.container}>
        {/* Menu */}
        <View style={styles.container}>
          <Pressable style={[styles.button, styles.menu]}>
            <Menu />
          </Pressable>
          <View style={styles.info}>
            <Text style={[styles.deliverTo, styles.bold]}>DELIVER TO</Text>
            <Text style={styles.address}>
              Halal Lab Office <ChevronDown height={16} strokeWidth={3} />
            </Text>
          </View>
        </View>

        {/* Cart */}
        <View>
          <Pressable style={[styles.button, styles.cart]}>
            <ShoppingBag color={"#fff"} />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <Text style={styles.greeting}>
        Hey {username}, <Text style={styles.bold}>{greeting}!</Text>{" "}
      </Text>

      {/* Search Bar */}
      <Link href="/search" asChild>
        <Pressable style={styles.searchBar}>
          <Search style={styles.searchIcon} color={"#A0A5BA"} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search.."
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    paddingVertical: 6,
    marginLeft: 12,
  },

  deliverTo: {
    fontSize: 12,
    color: "#FC6E2A",
  },

  address: {
    fontSize: 14,
    color: "#676767",
  },

  greeting: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 16,
  },

  bold: {
    fontWeight: "bold",
  },

  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  menu: {
    backgroundColor: "#ECF0F4",
  },
  cart: {
    backgroundColor: "#181C2E",
  },

  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF7622",
    borderRadius: 12,
    minWidth: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    height: 64,
    borderRadius: 10,
  },

  searchIcon: {
    marginLeft: 16,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
  },
});

export default Header;
