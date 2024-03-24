import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, FlatList, Image } from 'react-native'
import RestaurantCard from '../component/RestaurantCard';


const data = [
    {
        'id': '1',
        'name': 'Any name',
        'location': 'Torkatu Oulu',
        'image': '../assets/food1.jpg',
        'categories': ['American', 'Fast Food']
    },
    {
        'id': '2',
        'name': 'Any name',
        'location': 'Torkatu Oulu',
        'image': '../assets/food1.jpg',
        'categories': ['American', 'Fast Food']
    },
    {
        'id': '3',
        'name': 'Any name',
        'location': 'Torkatu Oulu',
        'image': '../assets/food1.jpg',
        'categories': ['American', 'Fast Food']
    },
    {
        'id': '4',
        'name': 'Any name',
        'location': 'Torkatu Oulu',
        'image': '../assets/food1.jpg',
        'categories': ['American', 'Fast Food']
    },
];

export default function Categories({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#D69F3B', // Change the background color
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: "Categories"
        });

    }, [navigation]);

    const renderItem = ({ item }) => <RestaurantCard item={item} />;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>American Students in Oulu</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        padding: 5,
        backgroundColor: '#fff',
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

