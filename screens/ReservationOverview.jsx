import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import Overview from '../component/Overview';
import { getOverviewList } from '../apiCalls/overviewData.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomNavBar from '../component/CustomNavBar.jsx';
import commonStyles from '../styles/commonStyles.js';



export default function ReservationOverview({ navigation }) {
  const [overviewList, setOverviewList] = useState([]);


  const getUserDataFromStorage = async () => {
    userId = await AsyncStorage.getItem('userId');
    //console.log("User id at UE", userId)
    getOverviewList(userId).then((data) => {
      setOverviewList(data);
    });
  }

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
    getUserDataFromStorage();
    
  }, [navigation]);

  const handleCancelReservation = (id) => {
    setOverviewList(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={[commonStyles.scrollContainer, { marginTop: 0 }]}>
      {overviewList.map((restaurant, index) => (
        <Overview key={index} restaurant={restaurant} onCancelReservation={handleCancelReservation} />
      ))}
      {/* <Overview />
      <Overview /> */}
    </ScrollView>
      <CustomNavBar navigation={navigation} />
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