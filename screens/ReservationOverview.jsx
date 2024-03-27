import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Overview from '../component/Overview';
import {getOverviewList} from '../apiCalls/overviewData.jsx'

export default function ReservationOverview({navigation}) {
  const [overviewList, setOverviewList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#D69F3B',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: "Reservation Overview"
    });
    getOverviewList().then((data) => {
      setOverviewList(data);
    });
  }, [navigation]);

  const handleCancelReservation = (id) => {
    setOverviewList(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {overviewList.map((restaurant, index) => (
        <Overview key={index} restaurant={restaurant} onCancelReservation={handleCancelReservation} />
      ))}
      {/* <Overview />
      <Overview /> */}
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