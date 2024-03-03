import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Details = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.detailTitle}>Details</Text>
            <View style={styles.info}>
                <View style={styles.row}>
                    <Feather name="map-pin" size={20} color="black" />
                    <Text style={styles.infoText}>Ylio 1, Oulu, Finland</Text>
                </View>
                <View style={styles.row}>
                    <Feather name="phone" size={20} color="black" />
                    <Text style={styles.infoText}>+358 123 456 789</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="access-time" size={20} color="black" />
                    <View>
                        <Text style={styles.infoText}>Mon - Fri: 10:00 - 22:00</Text>
                        <Text style={styles.infoText}>Sat - Sun: 12:00 - 22:00</Text>
                        <Text style={styles.infoText}>Public holidays: 10:00 - 18:00</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="food-bank" size={24} color="black" />
                    <Text style={styles.infoText}>Cuisine:</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="description" size={24} color="black" />
                    <Text style={styles.infoText}>Description:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi efficitur a dui sit amet consectetur. Integer laoreet erat eu nisi consectetur aliquet.</Text>
                </View>
            </View>
        </View>
    );
};

export default Details;

const { width } = Dimensions.get('window');
const containerWidth = width * 0.9; // Adjust as needed for container width

const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        /* backgroundColor: 'lightblue',  */
         padding: 5,  // Reduced padding for the container
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    info: {
        padding: 5, // Reduced padding for inner content
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5, // Reduced margin between rows
    },
    infoText: {
        marginLeft: 10,
        textAlign: 'justify',
        marginRight: 5, // Reduced margin for text
    },
});
