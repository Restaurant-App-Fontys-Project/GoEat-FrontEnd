import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, Modal, Button } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import TableItem from '../../component/TableItem'; // Import the TableItem component
import { getTableData } from '../../apiCalls/ReservationData';
import {getReservationsByDate} from '../../apiCalls/ReservationData';

const TableLayout = ({ navigation, route }) => {
    const { selectedDate, selectedTimeSlot, reservationDuration, restaurantId, noOfGuests, restaurantData } = route.params;
    const [tableLayout, setTableLayout] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [tableData, setTableData] = useState({});
    
    // change format of selected date and time
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const formattedTime = `${hours}:${minutes}:00`;
        return formattedTime;
    };
    
    // Usage:
    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedTimeSlot);
    
    console.log('Formatted date:', formattedDate);
    console.log('Formatted time:', formattedTime);
    


    const fetchAvailableTables = async () => {
        try {
            // Fetch reservations for the selected date
            const reservations = await getReservationsByDate(restaurantId, formattedDate);
    
            // Fetch all table data
            const tables = await getTableData(restaurantId);
    
            // Filter out reservations that overlap with the selected time slot
            const overlappingReservations = reservations.filter(reservation => {
                const reservationStartTime = new Date(formattedDate + ' ' + reservation.reservationStart);
                const reservationEndTime = new Date(formattedDate + ' ' + reservation.reservationEnd);
                const selectedStartTime = new Date(formattedDate + ' ' + selectedTimeSlot);
                const selectedEndTime = new Date(selectedStartTime.getTime() + reservationDuration * 60 * 1000); 
                return reservationEndTime > selectedStartTime && reservationStartTime < selectedEndTime;
            });
    
            // Get table IDs of reserved tables
            const reservedTableIds = overlappingReservations.map(reservation => reservation.tableId);
    
            // Filter out available tables
            const availableTables = tables.filter(table => !reservedTableIds.includes(table.id));
            console.log('Available tables:', availableTables);
            const categorizedTables = {};
            availableTables.forEach(table => {
                const category = `${table.capacity} Seat Tables`;
                if (!categorizedTables[category]) {
                    categorizedTables[category] = [];
                }
                categorizedTables[category].push(table);
            });
            const sortedCategories = Object.keys(categorizedTables).sort((a, b) => parseInt(a) - parseInt(b));
            const sortedTableLayout = sortedCategories.reduce((acc, category) => {
                acc[category] = categorizedTables[category];
                return acc;
            }, {});
            setTableLayout(sortedTableLayout);
        } catch (error) {
            console.error('Error fetching available tables:', error);
        }
    };

    useEffect(() => {
       
        fetchAvailableTables();
    }, [selectedDate, selectedTimeSlot, reservationDuration, restaurantId]);

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
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Table Information</Text>
                            <Text>Table Number: {selectedTable && selectedTable.tableNumber}</Text>
                            <Text>Number of Seats: {selectedTable && selectedTable.capacity}</Text>
                            <Text>Table Description: {selectedTable && selectedTable.description}</Text>
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
                            tableNumber: selectedTable.tableNumber,
                            selectedDate,
                            selectedTimeSlot,
                            reservationDuration,
                            noOfGuests,
                            restaurantData,
                            restaurantId,
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

export default TableLayout;
