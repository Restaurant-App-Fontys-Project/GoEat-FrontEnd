import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Overview() {
  return (
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