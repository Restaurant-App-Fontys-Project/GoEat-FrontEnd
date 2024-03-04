import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const Info = () => {
    return (
        <View style={styles.info}>
            <Text style={styles.restaurantName}>Restaurant Name</Text>
            <View style={styles.infoContent}>
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
                <Text style={styles.caption}>Celebrate local ingredients and global influences in every dish!</Text>
            </View>
        </View>
    );
};

export default Info;

const { width } = Dimensions.get('window');
const infoContentWidth = width * 0.9; // Adjust as needed for info content width

const styles = StyleSheet.create({
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
        paddingBottom: 5,
        textAlign: 'center',
    },
    info: {
        padding: 5,
        backgroundColor: 'lightgrey',
    },
    infoContent: {
        width: infoContentWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
    },
    caption: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify',
        fontStyle: 'italic',
    },
});