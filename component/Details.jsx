import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const Details = ({restaurantData}) => {

    const { id, name, address, phoneNumber, emailAddress, description } = restaurantData;

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
                <View style={styles.row}>
                    <Feather name="map-pin" size={22} color="#541412" />
                    <Text style={styles.infoText}>{address}</Text>
                </View>
                <MapView 
                    style={styles.map}
                    initialRegion={initialRegion}
                />
                <View style={styles.row}>
                    <Feather name="phone" size={22} color="#541412" />
                    <Text style={styles.infoText}>{phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                <Fontisto name="email" size={22} color="#541412" />
                    <Text style={styles.infoText}>{emailAddress}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialIcons name="access-time" size={22} color="#541412" />
                    <View>
                        <Text style={styles.infoText}>Mon - Fri: 10:00 - 22:00</Text>
                        <Text style={styles.infoText}>Sat - Sun: 12:00 - 22:00</Text>
                        <Text style={styles.infoText}>Public holidays: 10:00 - 18:00</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="food-fork-drink" size={22} color="#541412" />
                    <Text style={styles.infoText}>Cuisine:</Text>
                </View>
                <View style={styles.row}>
                    <Feather name="file-text" size={22} color="#541412" />
                    <Text style={styles.infoText}>{description}</Text>
                </View>
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
