import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Menu from '../component/Menu';
import Reviews from '../component/Reviews';
import Details from '../component/Details';
import Info from '../component/Info';
import commonStyles from '../styles/commonStyles';
import { fetchRestaurantData, fetchRestaurantTags } from '../apiCalls/restaurantApi';
import GradientButton from '../styles/GradientButton';
import { ActivityIndicator } from 'react-native';


export default function Restaurant({navigation,route}) {
    const { restaurantId } = route.params;
    const [selectedOption, setSelectedOption] = useState('Menu');
    const [restaurantData, setRestaurantData] = useState({}); 
    const [updateCount, setUpdateCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      fetchTags();
    }, [restaurantData]);
  
  
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchRestaurantData(restaurantId, setRestaurantData); 
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    function onlyUnique(value, index, array) {
      return array.findIndex(a => a.id === value.id) === index;
    }

    const fetchTags = async () => {      
      if(restaurantData?.menu?.length > 0){
        const restaurantTags = await fetchRestaurantTags(restaurantId);

        for (const meal of restaurantData.menu) {
          try {
            meal.mealTags = restaurantTags.filter(tag => (meal?.mealTagIds || []).includes(tag.id));
            meal.mealTags = meal.mealTags.filter(onlyUnique);
          } catch (error) {
            console.error('Error setting tags for meal:', error);
          }
        }
        setUpdateCount(updateCount + 1);
      }
    };

    const renderOption = () => {
      if (selectedOption === 'Menu') {
          return <Menu restaurantData = {restaurantData} updateCount={updateCount} />;
      } else if (selectedOption === 'Reviews') {
          return <Reviews />;
      } else if (selectedOption === 'Details') {
          return <Details restaurantData = {restaurantData} />;
      }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Loading modal */}
      {isLoading && (
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="#C34F5A" />
        </View>
      )}
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
      <GradientButton
          text="Make a reservation"
          onPress={() => {
            navigation.navigate('Reservation 1/3', {
              restaurantId: restaurantId,
            });
          }}
      />

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
    loadingModal: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    
  });