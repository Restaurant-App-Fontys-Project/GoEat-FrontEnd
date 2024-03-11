import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const Reviews = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.reviewTitle}>Reviews</Text>
            <View style={styles.reviews}>
                <Text>Great food and excellent service!</Text>
                <Text>Will definitely come back again.</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    reviews: {
        marginTop: 10,
    },
});