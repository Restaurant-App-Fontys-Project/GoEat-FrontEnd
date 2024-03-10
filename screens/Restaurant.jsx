import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Menu from '../component/Menu';
import Reviews from '../component/Reviews';
import Details from '../component/Details';
import Info from '../component/Info';

const backendUrl = 'http://localhost:5107';

export default function Restaurant({navigation}) {

    const [selectedOption, setSelectedOption] = useState('Menu');
    const [restaurantData, setRestaurantData] = useState({}); 


    useEffect(() => {
        fetchData();
    } , []);

    const fetchData = async () => {
        try {
          //const response = await axios.get('http://localhost:5107/restaurant/GetRestaurantById?id=c75df5e1-0901-46e3-ab52-2f69d44c338a');
          //const response = await axios.get(`${backendUrl}/restaurant/GetRestaurantById?id=c75df5e1-0901-46e3-ab52-2f69d44c338a`);
          const response = await axios.get('https://dummyjson.com/products/1');
          setRestaurantData(response.data);
          console.log('Fetched data:', response.data); 
        } catch (error) {
          console.error(error);
        }
    };
    
    const renderOption = () => {
      if (selectedOption === 'Menu') {
          return <Menu restaurantData = {restaurantData}/>;
      } else if (selectedOption === 'Reviews') {
          return <Reviews />;
      } else if (selectedOption === 'Details') {
          return <Details restaurantData = {restaurantData} />;
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
            <Info restaurantData = {restaurantData} />
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
      backgroundColor: '#C34F5A',
    },
    option: {
      fontSize: 16,
      color: 'white',
      marginHorizontal: 10,
    },
    selectedOption: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white', 
      marginHorizontal: 10, 
    },
    separator: {
        height: 1,
        backgroundColor: '#F8D4BA',
        /* marginHorizontal: 20, */ // Added margin to align with menu items
        width: windowWidth * 1, // Adjusted to make it responsive
    },
    content: {
      marginBottom: 10, // Added marginBottom to ensure space between content and button
      /* backgroundColor: 'lightgrey', */
    },
    reserveButton : {
      backgroundColor: '#C34F5A',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
      marginHorizontal: 20, // Adjusted margin to align with separator
      marginTop: 20, // Adjusted marginTop to create space between separator and button
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });