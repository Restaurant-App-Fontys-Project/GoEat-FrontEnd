// TableLayout.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Modal, Button } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import dummytableLayoutData from '../../dummytableLayoutData.json'; // Import the JSON file, remove later
import TableItem from '../../component/TableItem'; // Import the TableItem component
import axios from 'axios';
import { updateOverviewData } from '../../apiCalls/overviewData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTableLayout = ({ navigation, route }) => {
    const { selectedDate, selectedTimeSlot, reservationDuration, restaurantId, noOfGuests, restaurantData, tableId } = route.params;
    const [tableLayout, setTableLayout] = useState([]); // Initialize as an empty array
    const [selectedTable, setSelectedTable] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const restaurantIdToShow = 1; // Change this to the desired restaurant_id

    const getTableDate = async () => {
        try {
            const response = await axios.get('https://goeat-api.onrender.com/' + `tables/${tableId}`);
            data = response.data;
            console.log('Table data:', data);
            setSelectedTable(data)
            return data;
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    }
    let user;
    useEffect(() => {
        // Filter tables based on restaurant ID
        const filteredTables = dummytableLayoutData.filter(table => table.restaurant_id === restaurantIdToShow);
        // Categorize tables based on the number of seats
        getUserDataFromStorage()
        const categorizedTables = {};
        filteredTables.forEach(table => {
            const category = `${table.seats} Seat Tables`;
            if (!categorizedTables[category]) {
                categorizedTables[category] = [];
            }
            categorizedTables[category].push(table);
        });

        // Sort categories based on the number of seats
        const sortedCategories = Object.keys(categorizedTables).sort((a, b) => parseInt(a) - parseInt(b));

        // Update state with sorted categories and tables
        const sortedTableLayout = sortedCategories.reduce((acc, category) => {
            acc[category] = categorizedTables[category];
            return acc;
        }, {});
        setTableLayout(sortedTableLayout);
        getTableDate()
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleTableSelection = (table) => {
        setSelectedTable(table);
        setModalVisible(true); // Show modal when table is selected
        console.log('Selected table:', table);
        console.log('Selected table from server:', selectedTable);
    };

    const getUserDataFromStorage = async () => {
        user = await AsyncStorage.getItem('userId');
        // return user.id;
        console.log("The user",user)
    }

    const sendDataToApi = async () => {
        console.log("Sending data")
        dataToSend = {
            "id": restaurantData.id,
            "restaurantId": restaurantId,
            "userId": await getUserDataFromStorage(),
            "date": selectedDate,
            "note": restaurantData.note,
            "numberOfPeople": noOfGuests,
            "tableId": tableId,
            "reservationStart": restaurantData.reservationStart,
            "reservationEnd": restaurantData.reservationEnd,
            "maxDuration": {
                "ticks": 0
            },
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "phoneNumber": user.phoneNumber,
            "title": "string"
        }
        updateOverviewData(restaurantData.id, dataToSend)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    }
    

    return (
        <View style={{ padding: 16, width: '100%', height: '100%' }}>
            <KeyboardAvoidingView style={{ flex: 3, alignItems: 'center', marginTop: 16, marginBottom: 20 }} behavior="padding">
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                        {Object.entries(tableLayout).map(([category, tables]) => (
                            <View key={category} style={{ borderWidth: 1, borderColor: '#F8D3B9', padding: 10, borderRadius: 5, marginBottom: 10 }}>
                                <Text style={styles.categoryTitle}>{category}</Text>
                                <View style={styles.tablesRow}>
                                    {tables.map((table, index) => (
                                        <TableItem
                                            key={index}
                                            table={table}
                                            onPress={() => handleTableSelection(table)}
                                            isSelected={selectedTable && selectedTable.id === table.id}
                                        />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalTextContainer} >
                        <Text style={{ fontWeight: 'bold', marginBottom: 5, }}>Table Information</Text>
                        <Text>Table Number: {selectedTable && selectedTable.number}</Text>
                        <Text>Number of Seats: {selectedTable && selectedTable.seats}</Text>
                        <Text>Description: {selectedTable && selectedTable.description}</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={[commonStyles.button, !selectedTable && styles.disabledButton]}
                onPress={sendDataToApi}
                // onPress={() => {
                //     console.log("Clicked")
                //     sendDataToApi
                    // if (selectedTable) {
                    //     navigation.navigate('Reservation 3/3', {
                    //         tableId: selectedTable.id,
                    //         selectedDate,
                    //         selectedTimeSlot,
                    //         reservationDuration,
                    //         noOfGuests,
                    //         restaurantData
                    //     });
                    // }
                // }}
            // disabled={!selectedTable}
            >
                <Text style={commonStyles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    tablesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        

    },
    modalTextContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    okButton: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#C54F5B',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    okButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
});

export default EditTableLayout;