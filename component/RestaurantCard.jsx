import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default RestaurantCard = ({ item }) => (
    <View style={styles.item}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: width / 2, 
        padding: 5,
        backgroundColor: '#fff',
        elevation: 5,
        margin: 5,
    },
    image: {
        width: '100%',
        height: 100,
    },
    title: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});