
import React, {useEffect, useState} from 'react';
import { View, ImageBackground, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions  } from "react-native";
import commonStyles from '../styles/commonStyles';
import CustomNavBar  from '../component/CustomNavBar';

const Home = ({ navigation, route }) => {
  const { restaurants } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
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
              placeholder="Restaurant name, cuisine, meal..."
              placeholderTextColor="#fff"
            />
          </View>
        </ImageBackground>

        {/* Categories*/}
        <Text style={styles.header}>Categories</Text>
        <View style={styles.category}>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/cuisine.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Cuisine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/dietary.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Dietary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/meal.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Meal</Text>
            </TouchableOpacity>
          </View>

        {/* Display fetched restaurants */}
        <Text style={styles.header}>All restaurants in + city</Text>
        <View style={styles.restaurantRow}>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} navigation={navigation} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom navigation bar */}
      <CustomNavBar navigation={navigation} />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1/3,
    width: '100%',
    resizeMode: 'cover', 
    justifyContent: 'center', 
    height: 200, 
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
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
   /*  borderWidth: 1, */
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  categoryItem: {
    width: windowWidth / 3 - 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  restaurantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  restaurantItem: {
    width: '47%', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 14,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100, 
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Home;