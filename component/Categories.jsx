import { set } from 'date-fns';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Categories = ({ navigation, tags, setSelectedTag }) => {
  const categories = ['Cuisine', 'Dietary', 'Meal'];
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Render subcategories based on the selected category
  const renderSubcategories = () => {
    return ([{id: 0, tagCategoryId: selectedCategory, name: 'All'}].concat(tags || [])).filter(tag => tag.tagCategoryId === selectedCategory).map((tag, index) => {
      return (
        <TouchableOpacity 
          key={index} 
          style={styles.subcategoryItem} 
          onPress={() => handleTagClick(tag)}>
          <Text style={styles.subcategoryText}>{tag.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  // handle clicking on a category
  const handleCategoryClick = (category) => {
    console.log('Selected category:', category, categories.indexOf(category)+1);
    setSelectedCategory(categories.indexOf(category)+1);
  };
  // handle clicking on a tag
  const handleTagClick = (tag) => {
    console.log('Selected tag:', tag);
    setSelectedTag(tag);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {/* Main categories */}
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryItem, selectedCategory === index + 1 ? styles.selectedCategoryItem : null]}
            onPress={() => handleCategoryClick(category)}>
            <Image source={require('../assets/home-images/cuisine.png')} style={styles.image} />
            <Text style={[styles.restaurantName, selectedCategory === index + 1 ? styles.selectedCategoryText : null]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Render subcategories */}
      <View style={styles.subcategory}>
        {renderSubcategories()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  categoryItem: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },
  selectedCategoryItem: {
    backgroundColor: '#F0F0F0', // Add background color for selected category
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  selectedCategoryText: {
    color: '#D69F3B', // Add color for selected category text
    textDecorationLine: 'underline', // Add underline for selected category text
  },
  subcategory: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap subcategories if they exceed the container width
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  subcategoryItem: {
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  },
  subcategoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Categories;