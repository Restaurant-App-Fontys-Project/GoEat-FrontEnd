import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const Details = ({restaurantData}) => {

    const { name, address, phoneNumber, emailAddress, description } = restaurantData.details;

    const initialRegion = {
        latitude: 64.0, 
        longitude: 26.0, 
        latitudeDelta: 10, // Zoom level
        longitudeDelta: 10, // Zoom level
    };

    return (
        <View style={styles.container}>
            <Text style={styles.detailTitle}>Details</Text>
            <View style={styles.info}>
                    <Text style={styles.infoText}>{description}</Text>
            </View>
        </View>
    );
};

export default Details;

const { width } = Dimensions.get('window');
const containerWidth = width * 0.9; 

const styles = StyleSheet.create({
    container: {
        width: containerWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
         padding: 5,  
    },
    map : {
        width: containerWidth,
        height: 200,
        marginBottom: 5, 
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    info: {
        padding: 5, 
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5, 
    },
    infoText: {
        marginLeft: 10,
        textAlign: 'justify',
        marginRight: 5, 
        fontSize: 16,
    },
});
