import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Overview from '../component/Overview';
import getOverviewData from '../apiCalls/getOverviewData';

export default function ReservationOverview({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#D69F3B', // Change the background color
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: "Reservation Overview"
    });
  }, [navigation]);

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Your Reservations!</Text>
      </View>
      <Overview />
      <Overview />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 5,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }

});