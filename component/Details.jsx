import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const Details = ({restaurantData}) => {

    const {description } = restaurantData.details;

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
                <MaterialIcons name="description" size={22} color="#541412" />
                    <Text style={styles.infoText}>{description}</Text>
            </View>
            <View style={styles.info}>
                    <AntDesign name="exclamationcircleo" size={22} color="#541412" />
                    <Text style={styles.infoText}>Additional information</Text>
            </View>
            <View >
                <Text style={styles.infoText}>- Please contact us directly for details of opening - closing hours during public holidays.</Text>
                <Text style={styles.infoText}>- Payment options: Visa, Mastercard.</Text>
                <Text style={styles.infoText}>- Accessibility and inclusion: Wheelchair access, high chairs available, baby changing facilities.</Text>
                <Text style={styles.infoText}>- Parking: Public lot.</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    info: {
        flexDirection: 'row',
        marginTop: 10,
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
