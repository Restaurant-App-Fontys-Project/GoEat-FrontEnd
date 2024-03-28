import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, ImageBackground, TextInput } from "react-native";

export default function Home({ navigation }) {
  const handleSearch = () => {
    // Navigate to Restaurant screen
    navigation.navigate('Categories');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/home-images/home-bg.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.text}>Find the Finest</Text>
        <Text style={styles.text}>Restaurants</Text> 

        {/* Search bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#fff"
          />
        </View>

        {/* Search button */}
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1/3, 
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  searchBar: {
    position: 'absolute',
    bottom: 10, 
    left: 10, 
    right: 110, 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40, 
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  searchButton: {
    position: 'absolute',
    bottom: 10, 
    right: 20, 
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 40, 
  },
  buttonText: {
    color: '#333', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
