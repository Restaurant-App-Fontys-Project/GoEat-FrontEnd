// TableLayout.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Modal, Button } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import dummytableLayoutData from '../../dummytableLayoutData.json'; // Import the JSON file, remove later
import TableItem from '../../component/TableItem'; // Import the TableItem component

const EditTableLayout = ({ navigation, route }) => {
    const { selectedDate, selectedTimeSlot, reservationDuration, restaurantId , noOfGuests, restaurantData } = route.params;
    const [tableLayout, setTableLayout] = useState([]); // Initialize as an empty array
    const [selectedTable, setSelectedTable] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    const restaurantIdToShow = 1; // Change this to the desired restaurant_id

    useEffect(() => {
        // Filter tables based on restaurant ID
        const filteredTables = dummytableLayoutData.filter(table => table.restaurant_id === restaurantIdToShow);
        // Categorize tables based on the number of seats
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
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleTableSelection = (table) => {
        setSelectedTable(table);
        setModalVisible(true); // Show modal when table is selected
    };


    return (
        <View style={{ padding: 16, width: '100%', height: '100%' }}>
            <KeyboardAvoidingView style={{ flex: 3, alignItems: 'center', marginTop: 16, marginBottom: 20 }} behavior="padding">
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.container}>
                    {Object.entries(tableLayout).map(([category, tables]) => (
                        <View key={category} style={{borderWidth:1, borderColor: '#F8D3B9', padding: 10, borderRadius: 5, marginBottom: 10}}>
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
                    <Text style={{fontWeight: 'bold', marginBottom: 5,}}>Table Information</Text>
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
                onPress={() => {
                    if (selectedTable) {
                        navigation.navigate('Reservation 3/3', {
                            tableId: selectedTable.id,
                            selectedDate,
                            selectedTimeSlot,
                            reservationDuration,
                            noOfGuests,
                            restaurantData
                        });
                    }
                }}
                disabled={!selectedTable}
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
