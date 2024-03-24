import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import axios from 'axios';
import dummytableLayoutData from '../../dummytableLayoutData.json'; // Import the JSON file, remove later
import { FontAwesome } from '@expo/vector-icons';

const TableLayout = ({ navigation, route }) => {
        const { selectedDate, selectedTimeSlot, reservationDuration } = route.params;
    // const { fetchedReservationData, selectedDate, selectedTimeSlot, reservationDuration } = route.params;
       // console.log('Reservation data:', reservationData);
        // console.log('Selected date:', selectedDate);
        // console.log('Selected time slot:', selectedTimeSlot);
        // console.log('Reservation duration:', reservationDuration);
    // const [tableLayout, setTableLayout] = useState([]);
    const [tableLayout, setTableLayout] = useState(dummytableLayoutData); // Remove this line when fetching data from the backend
    const [selectedTableId, setSelectedTableId] = useState(null);

    const handleTableSelection = (table) => {
        // Implement your logic for handling table selection here
        // console.log('Selected table id:', table.id);
        setSelectedTableId(table.id);

    };

    // Function to generate the image source based on the number of seats
    const getImageSource = (identifier) => {
        switch (identifier) {
            case "2seatTable":
                return require('../../assets/2seatTable.svg');
            case "4seatTable":
                return require('../../assets/4seatTable.svg');
        }
    }

    return (
        <View style={{ padding: 16, width: '100%', height: '100%' }}>
            <KeyboardAvoidingView style={{ flex: 3, alignItems: 'center', marginTop: 16, marginBottom: 20 }} behavior="padding">
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        {tableLayout.map((table, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.table, { top: table.y, left: table.x }]}
                                onPress={() => handleTableSelection(table)}
                            >
                                {/* <Image source={{ uri: tablesvgPath }} style={{ width: table.width, height: table.height }} /> */}
                                <Image source={getImageSource(table.seats)} style={{ width: table.width, height: table.height }} />
                                <Text style={styles.tableNumber}>{table.number}</Text>
                            </TouchableOpacity>  
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity 
                style={commonStyles.button} onPress={() => navigation.navigate('CustomerInfo',{tableId: selectedTableId,selectedDate, selectedTimeSlot, reservationDuration})}>
                {/* <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('CustomerInfo',{ fetchedReservationData })}></TouchableOpacity> */}
        <Text style={commonStyles.buttonText}>Next</Text>
      </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f0f0f0',
    },
    table: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableNumber: {
        fontSize: 16,
    },
});

export default TableLayout;
