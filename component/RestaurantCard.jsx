import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchRestaurantData } from '../apiCalls/restaurantApi';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default RestaurantCard = ({ restaurant, navigation }) => {
    const [restaurantData, setRestaurantData] = useState({}); 

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        await fetchRestaurantData(restaurant.id, setRestaurantData); 
      } catch (error) {
        console.error(error);
      }
    };

    // collect the restaurant id of the clicked restaurant and navigate to the restaurant screen
  const handleRestaurantClick = (restaurantId) => {
    navigation.navigate('Restaurant', { restaurantId });
  };

    return (
        <TouchableOpacity 
            style={styles.restaurantItem}
            onPress={() => handleRestaurantClick(restaurant.id)} // Pass restaurant ID on click
        >
            <Image source={{ uri: restaurantData.cover }} style={styles.image} />
            <View style={[styles.row, {justifyContent: 'space-between'}, {marginBottom:5}]}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantAddress}>{restaurant.price}€</Text>
            </View>
            <View style={styles.row}>
                <Feather name="map-pin" size={18} color="#541412" />
                <Text style={styles.restaurantAddress}>{restaurant.address}, {restaurant.city}</Text>
            </View>
            {/* <View style={styles.row}>
              <MaterialIcons name="price-change" size={18} color="#541412" />
              <Text style={styles.restaurantAddress}>Tags:</Text>
            </View> */}
        </TouchableOpacity>
    )
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
      },
      restaurantItem: {
        width: '47%', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 5,
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