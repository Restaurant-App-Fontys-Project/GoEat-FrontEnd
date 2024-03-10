import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function ReservationOverview() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </View>
      <Text style={styles.title}>Your Reservations!</Text>
      <View style={styles.details}>
        <Text style={styles.restaurantName}>Restaurant 1</Text>
        <Text style={styles.detailText}>Date:</Text>
        <Text style={styles.detailText}>Time:</Text>
        <Text style={styles.detailText}>Duration:</Text>
        <Text style={styles.detailText}>Number of Guests:</Text>
        <Text style={styles.detailText}>Note:</Text>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 5,
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#D9D9D9',
  },
  logo: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 50,
    padding: 5,
  },
  logoText: {
    fontSize: 20,
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
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
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});