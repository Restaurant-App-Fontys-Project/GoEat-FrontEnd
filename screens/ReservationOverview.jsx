import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'

export default function ReservationOverview(){
  return (
    <View style={styles.container}>
      {/* <Image 
        style={styles.logo}
        source={{uri: ''}}
      /> */}

      <Text style={styles.title}>Your Reservation</Text>
      <Text style={styles.restaurantName}>Restaurant 1</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Date:</Text>
        <Text style={styles.detailText}>Time:</Text>
        <Text style={styles.detailText}>Duration:</Text>
        <Text style={styles.detailText}>Number of Guests:</Text>
        <Text style={styles.detailText}>Note</Text>

        <Button title="Edit" onPress={() => {}} style={styles.button} />
        <Button title="Cancel" onPress={()=>{}} style={styles.button} />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', 
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50, 
    height: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  details: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});