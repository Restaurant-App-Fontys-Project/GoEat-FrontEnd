import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import commonStyles from '../styles/commonStyles';

const Info = ({ restaurantData }) => {
    const [showMap, setShowMap] = useState(false);
    const[showTime, setShowTime] = useState(false); 

    // Check if restaurantData and restaurantData.details exist
    if (!restaurantData || !restaurantData.details) {
        return <Text>Loading...</Text>; 
    }

    const { name, address, phoneNumber, emailAddress, coverPictureId } = restaurantData.details;
    const initialRegion = {
        latitude: 64.0,
        longitude: 26.0,
        latitudeDelta: 10, // Zoom level
        longitudeDelta: 10, // Zoom level
    };

    return (
        <View style={styles.info}>
            <Text style={commonStyles.subHeaderText}>Name: {name}</Text>
            <View style={styles.tagContainer}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Chinese</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Vegetarian</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Breakfast</Text>
                </View>
                {/* Add more hardcoded tags as needed */}
            </View>
            <View style={styles.infoContent}>
                <View style={styles.row}>
                    <Feather name="map-pin" size={22} color="#541412" />
                    <Text style={styles.infoText}>Address: {address}</Text>
                    <TouchableOpacity onPress={() => setShowMap(!showMap)}>
                        <Text style={[styles.showMapText,styles.infoText]}>{showMap ? 'Hide map' : 'Show map'}</Text>
                    </TouchableOpacity>
                </View>
                {showMap && (
                    <MapView 
                        style={styles.map}
                        initialRegion={initialRegion}
                    />
                )}
                <View style={styles.row}>
                    <View style={styles.timeWrapper}>
                        <MaterialIcons name="access-time" size={22} color="#541412" />
                        <Text style={styles.infoText}>Monday: </Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowTime(!showTime)}>
                        <Text style={[styles.showMapText,styles.infoText]}>{showTime ? 'Hide time' : 'Show time'}</Text>
                    </TouchableOpacity>
                </View>
                {showTime && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.infoText}>Tuesday: </Text>
                        <Text style={styles.infoText}>Wednesday: </Text>
                        <Text style={styles.infoText}>Thursday: </Text>
                        <Text style={styles.infoText}>Friday: </Text>
                        <Text style={styles.infoText}>Saturday: </Text>
                        <Text style={styles.infoText}>Sunday: </Text>
                    </View>
                )}
                <View style={styles.row}>
                    <MaterialIcons name="contact-phone" size={22} color="#541412" />
                    <Text style={styles.infoText}>Phone: {phoneNumber}</Text>
                </View>
                <Text style={[styles.infoText, styles.email]}>Email: {emailAddress}</Text>
                <Text style={styles.caption}>Celebrate local ingredients and global influences in every dish!</Text>
            </View>
        </View>
    );
};

export default Info;

const { width } = Dimensions.get('window');
const infoContentWidth = width * 0.9; 

const styles = StyleSheet.create({
    info: {
        padding: 5,
    },
    infoContent: {
        width: infoContentWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    caption: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: 200,
    },
    showMapText: {
        marginLeft: 10,
        color: '#C34F5A',
        textDecorationLine: 'underline',
    },
    timeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeContainer: {
        marginLeft: 22, 
        marginBottom: 10,
    },
    email: {
        marginBottom: 20,
        marginLeft: 35,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#F8D3B9',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
    },
    tagText: {
        color: 'black',
        fontSize: 14,
    },
});