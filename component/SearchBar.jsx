// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = (props) => {
    const { clicked, searchPhrase, setSearchPhrase, setClicked } = props;
   return (
      <View style={styles.container}>
            <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
                <Feather name="search" size={20} color="#541412" style={{ marginLeft: 1 }} />
                <TextInput
                style={styles.input}
                placeholder="Restaurant name"
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true);
                }}
                />

                {searchPhrase !== '' && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => {
                        setSearchPhrase("");
                        }}
                    >
                    <Feather name="x" size={20} color="#541412" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
   container: {
      margin: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      width: "90%",
   },
   searchBar__unclicked: {
      padding: 10,
      flexDirection: "row",
      width: "95%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "center",
   },
   searchBar__clicked: {
      padding: 10,
      flexDirection: "row",
      width: "80%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
   },
   input: {
      fontSize: 16,
      marginLeft: 10,
      width: "90%",
   },
   clearButton: {
    position: 'absolute',
    right: 10,
  },
});
