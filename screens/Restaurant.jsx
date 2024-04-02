import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Menu from '../component/Menu';
import Reviews from '../component/Reviews';
import Details from '../component/Details';
import Info from '../component/Info';
import commonStyles from '../styles/commonStyles';
import { fetchRestaurantData } from '../apiCalls/restaurantApi';


export default function Restaurant({navigation,route}) {
   const { restaurantId } = route.params;
    const [selectedOption, setSelectedOption] = useState('Menu');
    const [restaurantData, setRestaurantData] = useState({}); 

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        await fetchRestaurantData(restaurantId, setRestaurantData); 
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
        {restaurantData && restaurantData.cover && (
        <View style={styles.imageCover}>
          <Image source={{ uri: restaurantData.cover }} style={styles.image} />
        </View>
      )}

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
        onPress={() => {
          navigation.navigate('DateTimePicker', {
            restaurantId: restaurantId,
            restaurantData: {
              name: restaurantData.details.name,
              address: restaurantData.details.address,
              openingHours: restaurantData.details.openingHours
            }
          });
          
        }}>
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
      backgroundColor: '#F8D3B9',
    },
    option: {
      fontSize: 18,
      color: 'black',
      marginHorizontal: 10,
      fontWeight: 'bold',
    },
    selectedOption: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#C34F5A', 
      marginHorizontal: 10,
    },
    content: {
      marginBottom: 10, 
    },
  });