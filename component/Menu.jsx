import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

export default function Menu({ restaurantData }) {

    const [displayItems, setDisplayItems] = useState(2);
    

    const toggleDisplay = () => {
        setDisplayItems(displayItems === 2 ? restaurantData?.menu?.length : 2);
    };

    return (
        <View style={styles.menu}>
            <Text style={styles.menuTitle}>Menu</Text>
            {restaurantData?.menu?.slice(0, displayItems).map((item, index) => (
                <MenuItem key={index} index={index} item={item} isLast={index === displayItems - 1}/>    
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
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 10,
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
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
    lastMenuItem: {
        marginRight: 10,
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuItemDescription: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'justify',
    },
    menuItemPrice: {
        fontSize: 16,
        marginTop: 5,
    },
    toggleButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    toggleButtonText: {
        color: '#C34F5A',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});