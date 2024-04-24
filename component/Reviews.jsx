import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const Reviews = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.reviewTitle}>Reviews</Text>
            <View style={styles.reviews}>
                <Text style={styles.reviewText}>There are no reviews for this restaurant!</Text>
            </View>
        </View>
    );
};

export default Reviews;

const { width } = Dimensions.get('window');
const containerWidth = width * 0.9; 

const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,  
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    reviews: {
        marginTop: 10,
    },
    reviewText: {
        fontSize: 16,
        color: '#333',
    },
});