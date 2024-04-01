
import React, {useEffect, useState} from 'react';
import { View, ImageBackground, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import commonStyles from '../styles/commonStyles';
import { fetchRestaurantData } from '../apiCalls/restaurantApi';

const Home = ({ navigation, route }) => {
  const { restaurants } = route.params;
  // const [restaurantData, setRestaurantData] = useState({});

// collect the restaurant id of the clicked restaurant and navigate to the restaurant screen
  const handleRestaurantClick = (restaurantId) => {
    navigation.navigate('Restaurant', { restaurantId });
  };
  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
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
        </ImageBackground>

        {/* Display fetched restaurants */}
        {restaurants.map((restaurant, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.restaurantItem}
            onPress={() => handleRestaurantClick(restaurant.id)} // Pass restaurant ID on click
          >
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantAddress}>address:{restaurant.address},{restaurant.city}</Text>
            <Text style={styles.restaurantAddress}>price:{restaurant.price}</Text>
            <Text style={styles.restaurantAddress}>tags:</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

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
  restaurantItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantAddress: {
    fontSize: 16,
  },
});

export default Home;
