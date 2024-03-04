import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Menu from '../component/Menu';
import Reviews from '../component/Reviews';
import Details from '../component/Details';
import Info from '../component/Info';

export default function Restaurant({navigation}) {

    const [selectedOption, setSelectedOption] = useState('Menu');

    const renderOption = () => {
      if (selectedOption === 'Menu') {
          return <Menu />;
      } else if (selectedOption === 'Reviews') {
          return <Reviews />;
      } else if (selectedOption === 'Details') {
          return <Details />;
      }
  };

  return (
    <ScrollView style={styles.container}>

        {/* Cover image */}
        <View style={styles.imageCover}>
            <Image source={require('../assets/food1.jpg')} style={styles.image} />
        </View>

        {/* Restaurant info */}
        <View style={styles.infoMain}>
            <Info />
        </View>

        {/* Menu, Reviews, Details */}
      <View style={styles.menuReviewDetail}>
          <TouchableOpacity onPress={() => setSelectedOption('Menu')}>
              <Text style={selectedOption === 'Menu' ? styles.selectedOption : styles.option}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('Reviews')}>
              <Text style={selectedOption === 'Reviews' ? styles.selectedOption : styles.option}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('Details')}>
              <Text style={selectedOption === 'Details' ? styles.selectedOption : styles.option}>Details</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      {/* Render content based on selected option */}
      <View style={styles.content}>{renderOption()}</View>

      {/*Button for reservation*/}
      <TouchableOpacity 
        style={styles.reserveButton}
        onPress={() => navigation.navigate('Reservation')}>
        <Text style={styles.buttonText}>Make a reservation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageCover: {
      /* flex: 2, */
      flexDirection: 'row',
    },
    image: {
      width: '100%',
      height: windowWidth * 0.6, 
    },
    infoMain: {
      /* flex: 1, */
    },
    menuReviewDetail: {
      /* flex: 2, */
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10, 
      paddingHorizontal: 5, 
      backgroundColor: 'lightblue',
    },
    option: {
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 10,
    },
    selectedOption: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'blue',
      marginHorizontal: 10, 
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        /* marginHorizontal: 20, */ // Added margin to align with menu items
        width: windowWidth * 1, // Adjusted to make it responsive
    },
    content: {
      marginBottom: 10, // Added marginBottom to ensure space between content and button
      backgroundColor: 'lightgrey',
    },
    reserveButton : {
      backgroundColor: '#EE8E11',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
      marginHorizontal: 20, // Adjusted margin to align with separator
      marginTop: 20, // Adjusted marginTop to create space between separator and button
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
    },
  });