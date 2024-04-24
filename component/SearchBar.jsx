import React, { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, TextInput, View, Keyboard, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ onRestaurantSearch, onMealSearch }) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [searchType, setSearchType] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        // Reset search state when component comes into focus
        if (isFocused) {
            setSearchPhrase('');
            setSearchType(null);
        }
    }, [isFocused]);

    const handleRestaurantSearch = () => {
        setSearchType('restaurant');
        onRestaurantSearch(searchPhrase);
    };

    const handleMealSearch = () => {
        setSearchType('meal');
        onMealSearch(searchPhrase);
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.searchBar}>
                <Feather name="search" size={20} color="#541412" style={{ marginLeft: 1 }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => { setSearchType(null); }}
                    onEndEditing={() => { Keyboard.dismiss(); }}
                />
            </View>

            <View style={styles.searchOptions}>
                <TouchableOpacity onPress={handleRestaurantSearch}>
                    <Text style={[styles.searchOption, searchType === 'restaurant' && styles.activeOption]}>
                        Search Restaurants
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMealSearch}>
                    <Text style={[styles.searchOption, searchType === 'meal' && styles.activeOption]}>
                        Search Meals
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    searchOptions: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    searchOption: {
        marginRight: 20,
        fontSize: 16,
        color: "#531412",
        textDecorationLine: "underline",
    },
    activeOption: {
        fontWeight: "bold",
        color: "#531412",
    },
    searchBar: {
        padding: 5,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderRadius: 15,
        alignItems: "center",
    },
    input: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
});

export default SearchBar;
