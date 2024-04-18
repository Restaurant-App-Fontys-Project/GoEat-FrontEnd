import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import commonStyles from '../styles/commonStyles';
import CustomNavBar from '../component/CustomNavBar';
import SearchBar from '../component/SearchBar';
import List from '../component/List';
import RestaurantCard from '../component/RestaurantCard';
import { fetchMeals } from '../apiCalls/restaurantApi';

const Home = ({ navigation, route }) => {
  const { restaurants, city } = route.params;
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchType, setSearchType] = useState('restaurant'); // Default to searching for restaurants
  const [clicked, setClicked] = useState(false);
  const [meals, setMeals] = useState([]);
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    fetchMealsForRestaurants(restaurants);
  }, [restaurants]);

  const fetchMealsForRestaurants = async (restaurants) => {
    const meals = [];

    for (const restaurant of restaurants) {
      try {
        const restaurantMeals = await fetchMeals(restaurant.id);
        meals.push(...restaurantMeals);
      } catch (error) {
        console.error('Error fetching meals for restaurant:', error);
      }
    }
    setMeals(meals);
  };

  const searchRestaurants = (phrase) => {
    setSearchPhrase(phrase);
    setSearchType('restaurant');
    setOnSearch(true);
    console.log('searching for restaurants', phrase);
  };

  const searchMeals = (phrase) => {
    setSearchPhrase(phrase);
    setSearchType('meal');
    setOnSearch(true);
    console.log('searching for meals', phrase);
  };

  const clearSearchResult = () => {
    setSearchPhrase('');
    setSearchType(null);
    setOnSearch(false);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[commonStyles.scrollContainer, { marginTop: 0 }]}>
        <ImageBackground source={require('../assets/home-images/home-bg.png')} style={styles.backgroundImage}>
          <Image source={require('../assets/home-images/text.png')} style={styles.smallImage} />
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              onRestaurantSearch={searchRestaurants}
              onMealSearch={searchMeals}
              clicked={clicked}
              setClicked={setClicked}
              onEndEditing={() => setOnSearch(true)}
            />
            {onSearch && (
              <List
                searchPhrase={searchPhrase}
                data={searchType === 'restaurant' ? restaurants : meals}
                setClicked={setClicked}
                onPress={(id, restaurantId) => {
                  navigation.navigate('Restaurant', { 
                    restaurantId: searchType === 'meal' ? restaurantId : id, 
                    mealId: searchType === 'meal' ? id : undefined});
                  clearSearchResult();
              }}
              />
            )}
          </View>
        </ImageBackground>

        <Text style={styles.header}>Categories</Text>
        <View style={styles.category}>
          {/* Categories content */}
          <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/cuisine.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Cuisine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/dietary.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Dietary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={require('../assets/home-images/meal.png')} style={styles.image} />
              <Text style={styles.restaurantName}>Meal</Text>
            </TouchableOpacity>

        </View>

        <Text style={styles.header}>All restaurants in {city} </Text>
        <View style={styles.restaurantRow}>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
      <CustomNavBar navigation={navigation} />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1 / 3,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 200,
  },
  smallImage: {
    position: 'absolute',
    top: 25,
    left: 140,
    width: '50%',
    height: 50,
  },
  searchBar: {
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 110,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  categoryItem: {
    width: windowWidth / 3 - 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  restaurantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Home;
