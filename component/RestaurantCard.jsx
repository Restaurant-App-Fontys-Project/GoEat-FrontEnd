import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default RestaurantCard = ({ item }) => (
    <View style={styles.item}>
        <Image source={require('../assets/food1.jpg')} style={styles.image} />
        <View style={{ padding: 5 }}>
            <Text style={styles.foodTitle}>{item.name}</Text>
            <View style={styles.address}>
                <Ionicons name="location" size={18} color="#531412" />
                <Text style={styles.addressText}>{item.location}</Text>
            </View>
            <View style={styles.categories}>
                {item.categories.map((category, index) => (
                    <View style={styles.chip}>
                        <Text key={index} style={styles.chipText}>{category}</Text>
                    </View>
                ))}
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flex: 1,
        width: '48%',
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
        fontSize: 28,
        fontWeight: 'bold',
        paddingVertical: 10,
        marginVertical: 10
    },
    foodTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#531412',
    },
    address: {
        flexDirection: 'row',
    },
    addressText: {
        marginLeft: 1,
        fontSize: 18,
        color: '#531412',
    },
    chip: {
        backgroundColor: '#D69F3B',
        padding: 5,
        margin: 2,
        borderRadius: 5,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    chip: {
        backgroundColor: '#F8D3B9',
        padding: 5,
        margin: 3,
        borderRadius: 30,
    },
    chipText: {
        fontSize: 14,
        color: '#531412',
    },
});