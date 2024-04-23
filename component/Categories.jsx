import { set } from 'date-fns';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const Categories = ({ navigation, tags, setSelectedTag }) => {
  const categories = ['Cuisine', 'Dietary', 'Meal'];
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [localSelectedTag, setLocalSelectedTag] = useState(null);
  const [noResults, setNoResults] = useState(false);

  // Set localSelectedTag when the selectedTag prop changes
  useEffect(() => {
    console.log('localSelectedTag before update:', localSelectedTag);
    setSelectedTag(localSelectedTag); 
  }, [localSelectedTag]);

  // Render subcategories based on the selected category
  const renderSubcategories = () => {

    return ([{id: 0, tagCategoryId: selectedCategory, name: 'All'}]
      .concat(tags || []))
      .filter(tag => tag.tagCategoryId === selectedCategory)
      .map((tag, index) => {
        console.log('Local Selected Tag:', localSelectedTag);
        console.log('Tag ID:', tag.id);
        return (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.subcategoryItem,
              localSelectedTag && localSelectedTag.id === tag.id ? styles.selectedSubcategoryItem : null
            ]}
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
    setLocalSelectedTag(tag);
 // Check if there are no restaurants for the selected tag
  if (tags && tags.length > 0) {
    const tagIds = tags.map(tagItem => tagItem.id);
    if (!tagIds.includes(tag.id)) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  } else {
    setNoResults(true);
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {/* Main categories */}
        {categories.map((category, index) => {
          const image = category === 'Dietary' ?
          require('../assets/home-images/dietary.png') :
          category === 'Meal' ?
          require('../assets/home-images/meal.png') :
          require('../assets/home-images/cuisine.png');

          return <TouchableOpacity
            key={index}
            style={[styles.categoryItem, selectedCategory === index + 1 ? styles.selectedCategoryItem : null]}
            onPress={() => handleCategoryClick(category)}>
            <Image source={image} style={styles.image} />
            <Text style={[styles.restaurantName, selectedCategory === index + 1 ? styles.selectedCategoryText : null]}>{category}</Text>
          </TouchableOpacity>
          })}
      </View>

      {/* Render subcategories */}
      <View style={styles.subcategory}>
        {renderSubcategories()}
      </View>
       {/* Display "not found" message if no results */}
    {noResults && <Text style={styles.notFoundText}>No restaurants found for selected tag, please try again!</Text>}
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
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  selectedCategoryText: {
    color: '#D69F3B', 
    textDecorationLine: 'underline', 
  },
  subcategory: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap subcategories if they exceed the container width
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10, 
    marginLeft: 10, 
    marginRight: 10, 
    borderColor: '#D69F3B',
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
  selectedSubcategoryItem: {
    backgroundColor: '#D69F3B', 
  },
  notFoundText: {
    color: '#D69F3B',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default Categories;