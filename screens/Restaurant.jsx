import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Menu from '../component/Menu';
import Reviews from '../component/Reviews';
import Details from '../component/Details';
import Info from '../component/Info';
import commonStyles from '../styles/commonStyles';
import { fetchRestaurantData } from '../apiCalls/restaurantApi';

export default function Restaurant({navigation}) {
  const restaurantId = 'c75df5e1-0901-46e3-ab52-2f69d44c338a'; // Replace with the selected restaurant ID

    const [selectedOption, setSelectedOption] = useState('Menu');
    const [restaurantData, setRestaurantData] = useState({}); 

    useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          await fetchRestaurantData(setRestaurantData); // Call the fetch function and pass setRestaurantData
          console.log('Fetched data:', restaurantData);
      } catch (error) {
          console.error(error);
      }
  };
    // uncomment the following code when the backend is ready

    // const fetchData = async (restaurantId) => {
    //     try {
    //       const response = await axios.get(`https://goeat-api.onrender.com/api/Restaurant/${restaurantId}`);
    //       setRestaurantData(response.data);
    //       console.log('Fetched data:', response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // to send restaurant id to the next screen (call this function in the button onPress event)
    // const handleReservation = () => {
    //     navigation.navigate('DateTimePicker', {restaurantId});
    // };
    
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
      {/* Render content based on selected option */}
      <View style={styles.content}>{renderOption()}</View>

      {/*Button for reservation*/}
      <TouchableOpacity 
        style={commonStyles.button}
        onPress={() => navigation.navigate('DateTimePicker',{restaurantId})}>
        <Text style={commonStyles.buttonText}>Make a reservation</Text>
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
      fontSize: 18,
      color: 'white',
      marginHorizontal: 10,
    },
    selectedOption: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white', 
      marginHorizontal: 10, 
    },
    content: {
      marginBottom: 10, 
    },
  });