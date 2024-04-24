import React, { useEffect, useState } from 'react';
import { View, ImageBackground, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import commonStyles from '../styles/commonStyles';
import CustomNavBar from '../component/CustomNavBar';
import SearchBar from '../component/SearchBar';
import List from '../component/List';
import RestaurantCard from '../component/RestaurantCard';
import { fetchMeals, fetchTags, fetchRestaurantTags } from '../apiCalls/restaurantApi';
import Categories from '../component/Categories';

const Home = ({ navigation, route }) => {
  const { restaurants, city } = route.params;
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchType, setSearchType] = useState('restaurant'); 
  const [clicked, setClicked] = useState(false);
  const [meals, setMeals] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    fetchMealsForRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    fetchAllTags();
  }, []);

  const fetchAllTags = async () => {
    try {
      const tags = await fetchTags();
      setTags(tags);
    }
    catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchMealsForRestaurants = async (restaurants) => {
    const meals = [];

    for (const restaurant of restaurants) {
      try {
        let restaurantMeals = await fetchMeals(restaurant.id);
        const restaurantTags = await fetchRestaurantTags(restaurant.id);
        restaurantMeals = restaurantMeals.map(meal => 
          ({ ...meal, mealTags: 
            tags.filter(tag => (meal?.mealTagIds || []).includes(tag.id))})
        ); 
        restaurant.meals = restaurantMeals;
        restaurant.tags = restaurantTags;
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

const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  console.log('Selected category:', category);
}

const renderRestaurants = () => {
  const restaurantList  = restaurants
          .filter(r =>  !selectedTag  || selectedTag.name === 'All' || r.tags?.find((restaurantTag) => restaurantTag.id === selectedTag.id));
  if (restaurantList.length === 0) {
    return <Text style={styles.notFoundText}>
      Sorry, currently we do not have any matching results, please try again!</Text>;
  }
  return restaurantList.map((restaurant, index) => (
    <RestaurantCard key={index} restaurant={restaurant} navigation={navigation} />
  ));

}

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
        <View >

            <Categories navigation={navigation} tags={tags} setSelectedTag={setSelectedTag} />
        </View>

        <Text style={styles.header}>{selectedTag?.name || "All"} restaurants in {city} </Text>
        <View style={styles.restaurantRow}>
          {renderRestaurants()}
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
  notFoundText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#D69F3B',
    fontWeight: 'bold',
  },
});

export default Home;
