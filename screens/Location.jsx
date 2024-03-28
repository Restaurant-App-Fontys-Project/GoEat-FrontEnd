import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Location = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Location</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Please enable location services to find the nearest restaurants</Text>
            </View>

        </View>
    );
};
export default Location;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    body: {
        alignItems: 'center'
    },
    bodyText: {
        fontSize: 16
    }
});

