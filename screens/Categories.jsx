import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import RestaurantCard from '../component/RestaurantCard';
import commonStyles from '../styles/commonStyles';


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
                backgroundColor: '#D69F3B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: "Categories"
        });

    }, [navigation]);

    const renderItem = ({ item }) => <RestaurantCard item={item} navigation={navigation} />; // Pass navigation prop to RestaurantCard

    return (
        <ScrollView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>American Restaurants</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
            {/* <View style={styles.categories}>
                {data.map((item, index) => (
                    <RestaurantCard key={index} item={item} />
                ))}
            </View> */}

            {/* remove this button after implement */}
      

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
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
});