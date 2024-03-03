import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const Menu = () => {
    return (
        <View style={styles.menu}>
            <Text style={styles.menuTitle}>Menu</Text>
            <View style={styles.menuItemContainer}>
                <Image source={require('../assets/food1.jpg')} style={styles.imageItem} />
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemName}>Grilled Salmon</Text>
                    <Text style={styles.menuItemDescription}>Fresh Atlantic salmon grilled to perfection, served with seasonal...</Text>
                </View>
                <Text style={styles.menuItemPrice}>$18.99</Text>
            </View>
            <View style={styles.menuItemContainer}>
                <Image source={require('../assets/food1.jpg')} style={styles.imageItem} />
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemName}>Grilled Salmon</Text>
                    <Text style={styles.menuItemDescription}>Fresh Atlantic salmon grilled to perfection, served with seasonal ...</Text>
                </View>
                <Text style={styles.menuItemPrice}>$18.99</Text>
            </View>
            <View style={styles.menuItemContainer}>
                <Image source={require('../assets/food1.jpg')} style={styles.imageItem} />
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemName}>Grilled Salmon</Text>
                    <Text style={styles.menuItemDescription}>Fresh Atlantic salmon grilled to perfection, served with seasonal...</Text>
                </View>
                <Text style={styles.menuItemPrice}>$18.99</Text>
            </View>
            <View style={styles.menuItemContainer}>
                <Image source={require('../assets/food1.jpg')} style={styles.imageItem} />
                <View style={styles.menuItem}>
                    <Text style={styles.menuItemName}>Grilled Salmon</Text>
                    <Text style={styles.menuItemDescription}>Fresh Atlantic salmon grilled to perfection, served with seasonal...</Text>
                </View>
                <Text style={styles.menuItemPrice}>$18.99</Text>
            </View>
        </View>
    );
};

export default Menu;

const { width } = Dimensions.get('window');
const imageWidth = width * 0.20; 
const containerWidth = width * 0.9;

const styles = StyleSheet.create({
    menu: {
        /* backgroundColor: 'lightblue', */
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
        height: imageWidth, // Maintains aspect ratio
        marginRight: 10,
        borderRadius: 5,
    },
    menuItem: {
        flex: 1, // Take remaining space
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
        color: 'blue',
        marginTop: 5,
    },
});
