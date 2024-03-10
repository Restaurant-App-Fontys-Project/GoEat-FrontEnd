import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Menu({ restaurantData }) {
    const { id, name, address, phoneNumber } = restaurantData;

    const [displayItems, setDisplayItems] = useState(2);
    const menuItems = [
        {
            id: 1,
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon grilled to perfection, served ...',
            price: 18.99,
            image: require('../assets/food1.jpg'),
        },
        {
            id: 2,
            name: 'Chicken Alfredo',
            description: 'Creamy fettuccine Alfredo with grilled chicken breast, ...',
            price: 15.99,
            image: require('../assets/food1.jpg'), // Example: Update image path
        },
        {
            id: 3,
            name: 'Beef Burger',
            description: 'Juicy beef patty with lettuce, tomato, onion, pickles, ...',
            price: 12.99,
            image: require('../assets/food1.jpg'), // Example: Update image path
        },
        {
            id: 4,
            name: 'Vegetable Stir-fry',
            description: 'Fresh mixed vegetables stir-fried in a savory sauce,...',
            price: 10.99,
            image: require('../assets/food1.jpg'), // Example: Update image path
        },
    ];

    const toggleDisplay = () => {
        setDisplayItems(displayItems === 2 ? menuItems.length : 2);
    };

    /*
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products');
            if (Array.isArray(response.data)) {
                setMenuItems(response.data);
            } else {
                console.error('Received data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    */

    return (
        <View style={styles.menu}>
            <Text style={styles.menuTitle}>Menu</Text>
            {menuItems.slice(0, displayItems).map((item, index) => (
                <View key={index} style={styles.menuItemContainer}>
                    <Image source={item.image} style={styles.imageItem} />
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                    <Text style={styles.menuItemPrice}>${item.price}</Text>
                </View>
            ))}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleDisplay}>
                <Text style={styles.toggleButtonText}>{displayItems === 2 ? 'Show full menu' : 'Show less'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const { width } = Dimensions.get('window');
const imageWidth = width * 0.2;
const containerWidth = width * 0.9;

const styles = StyleSheet.create({
    menu: {
        width: containerWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 10,
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
        marginRight: 10,
    },
    imageItem: {
        width: imageWidth,
        height: imageWidth,
        marginRight: 10,
        borderRadius: 5,
    },
    menuItem: {
        flex: 1,
        marginRight: 20,
    },
    menuItemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    menuItemDescription: {
        fontSize: 14,
        marginTop: 5,
        textAlign: 'justify',
    },
    menuItemPrice: {
        fontSize: 14,
        marginTop: 5,
    },
    toggleButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    toggleButtonText: {
        color: '#C34F5A',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
