import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getRestaurantName, deleteOverviewData, getRestaurantData } from '../apiCalls/overviewData';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';


export default function Overview({ restaurant, reservationId, onCancelReservation }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantData, setRestaurantData] = useState({});
  const isLoggedIn = true;
  const navigation = useNavigation();


  useEffect(() => {
    getRestaurantName(restaurant.restaurantId).then((data) => {
      setRestaurantName(data);
    }
    );
    getRestaurantData(restaurant.restaurantId).then((data) => {
      setRestaurantData(data);
    });
  }, [restaurantName]);

  const handleEdit = () => {

    console.log("reservation id " + reservationId)
    console.log("restaurant id " + restaurant.restaurantId)
    console.log("restaurant data" + restaurant)
    console.log("restaurant opening hours" + restaurantData.openingHours)

    navigation.navigate('Edit Reservation 1/3', {
      reservationId: reservationId,
      restaurantId: restaurant.restaurantId,
      restaurantData: restaurant,
      openingHours: restaurantData.openingHours,
      tableId: restaurant.tableId
    })


    // Navigate to login/registration if not logged in
    // if (!isLoggedIn) {
    // navigation.navigate('LoginOptions');
    // }
  }


const cancelReservation = () => {
    Alert.alert(
        'Cancel Reservation',
        'Are you sure you want to cancel this reservation?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: async () => {
                    await deleteOverviewData(restaurant.id);
                    onCancelReservation(restaurant.id);
                }
            },
        ],
        { cancelable: false },
    );
};


  return (
    <View style={styles.details}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <Text style={styles.detailText}>Date: {restaurant.date} </Text>
      <Text style={styles.detailText}>Start: {restaurant.reservationStart}</Text>
      <Text style={styles.detailText}>End: {restaurant.reservationEnd}</Text>
      <Text style={styles.detailText}>Number of Guests: {restaurant.numberOfPeople}</Text>
      <Text style={styles.detailText}>Note: {restaurant.note}</Text>
      <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <FontAwesome6 name="edit" size={22} color="#541412" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={cancelReservation} >
              <FontAwesome6 name="trash-can" size={22} color="#541412" />
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  details: {
    backgroundColor: '#F4F2F2',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonSection: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});