import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomNavBar = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate('Home');
  };

  const goToSearch = () => {
    navigation.navigate('Search');
  };

  const goToProfile = () => {
    navigation.navigate('LoginOptions');
  };

  const goToOverview = () => {
    navigation.navigate('ReservationOverview');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goToHome}>
        <FontAwesome name="home" size={27} color="#D69F3B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToSearch}>
        <FontAwesome name="search" size={26} color="#D69F3B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToProfile}>
        <FontAwesome name="user" size={26} color="#D69F3B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToOverview}>
        <FontAwesome name="calendar" size={26} color="#D69F3B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
  },
});

export default CustomNavBar;