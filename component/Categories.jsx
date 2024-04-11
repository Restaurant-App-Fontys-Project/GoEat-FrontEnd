import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const Categories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping object to associate category names with images
  const categoryImages = {
    'Cuisine': require('../assets/home-images/cuisine.png'),
    'Dietary': require('../assets/home-images/dietary.png'),
    'Meal': require('../assets/home-images/meal.png'),
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.yelp.com/v3/categories');
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => {
              // Navigate to a screen related to the selected category
              navigation.navigate('CategoryScreen', { category: category });
            }}
          >
            <Image source={categoryImages[category.title]} style={styles.image} />
            <Text style={styles.categoryName}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoryName: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Categories;
