import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Overview from '../component/Overview';

export default function ReservationOverview() {
  return (
    <ScrollView style={styles.container}>
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
  }
});