import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function Overview() {
  return (
      <View style={styles.details}>
        <Text style={styles.restaurantName}>Restaurant 1</Text>
        <Text style={styles.detailText}>Date: 12/04/2024 </Text>
        <Text style={styles.detailText}>Time: 10:00 AM</Text>
        <Text style={styles.detailText}>Duration: 1 Hours</Text>
        <Text style={styles.detailText}>Number of Guests: 3</Text>
        <Text style={styles.detailText}>Note: Anything</Text>
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