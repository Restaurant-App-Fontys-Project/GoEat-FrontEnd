
import React, {useEffect, useState} from 'react';
import { View, ImageBackground, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions  } from "react-native";
import commonStyles from '../styles/commonStyles';
import { fetchRestaurantData } from '../apiCalls/restaurantApi';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Home = ({ navigation, route }) => {
  const { restaurants } = route.params;
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetchRestaurantData(restaurantId, setRestaurantData); 
    } catch (error) {
      console.error(error);
    }
  };

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
        <View style={styles.restaurantRow}>
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.restaurantItem}
              onPress={() => handleRestaurantClick(restaurant.id)} // Pass restaurant ID on click
            >
              <Image source={{ uri: restaurantData.cover }} style={styles.image} />
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantAddress}>${restaurant.price}</Text>
              </View>
              <View style={styles.row}>
                <Feather name="map-pin" size={18} color="#541412" />
                <Text style={styles.restaurantAddress}>{restaurant.address}, {restaurant.city}</Text>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="price-change" size={18} color="#541412" />
                <Text style={styles.restaurantAddress}>Tags:</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
  restaurantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  restaurantItem: {
    width: '47%', // Adjusted width for two cards in a row
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
    height: 100, // Adjusted height for the image
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Home;