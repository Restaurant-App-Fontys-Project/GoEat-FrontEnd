import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getRestaurantName, deleteReservation } from '../apiCalls/overviewData';

export default function Overview({ restaurant, onCancelReservation }) {
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    getRestaurantName(restaurant.restaurantId).then((data) => {
      setRestaurantName(data);
    }
    );
  }, [restaurantName]);
  
  const cancelReservation = () => {
    console.log("Cancel reservation");
    return 
    deleteReservation(restaurant.id);
    onCancelReservation(restaurant.id);
  };



  return (
    <View style={styles.details}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <Text style={styles.detailText}>Date: {restaurant.date} </Text>
      <Text style={styles.detailText}>Start: { restaurant.reservationStart }</Text>
      <Text style={styles.detailText}>End: { restaurant.reservationEnd }</Text>
      <Text style={styles.detailText}>Number of Guests: {restaurant.numberOfPeople }</Text>
      <Text style={styles.detailText}>Note: { restaurant.note }</Text>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={cancelReservation} >
          <Text style={styles.buttonText}>Cancel</Text>
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
    marginTop: 10,
    backgroundColor: '#C34F5A',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});