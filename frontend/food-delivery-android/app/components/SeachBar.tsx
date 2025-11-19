import { Image, StyleSheet, TextInput, View } from "react-native";


const SearchBar = ({ value, onChangeText, placeholder = "Search..." }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/icons/search.png")}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#676767"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 24,

  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    opacity: 0.6,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
});

export default SearchBar;
