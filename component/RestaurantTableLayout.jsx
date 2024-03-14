import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import dummytableLayoutData from '../dummytableLayoutData.json'; // Import the JSON file, remove later



const RestaurantTableLayout = ({ restaurantId }) => {
    // const [tableLayout, setTableLayout] = useState([]);
    const [tableLayout, setTableLayout] = useState(dummytableLayoutData); // Remove this line when fetching data from the backend

    useEffect(() => {
        // Fetch table layout data for the selected restaurant
        // const fetchTableLayout = async () => {
        //     try {
        //         const response = await axios.get(`http://localhost:your-backend-port/restaurant/${restaurantId}/table-layout`);
        //         setTableLayout(response.data);
        //     } catch (error) {
        //         console.error('Error fetching table layout:', error);
        //     }
        // };

        // fetchTableLayout();
       // setTableLayout(dummytableLayoutData); // Remove this line when fetching data from the backend
    }, [restaurantId]);

    handleTableSelection = (tableId) => {
        console.log('Selected table:', tableId);
        // Add your logic to handle table selection
    }

    return (
        <View style={styles.container}>
            {tableLayout.map((table, index) => (
                <TouchableOpacity 
                // key={index} style={[styles.table, { top: table.y, left: table.x}]}
                //  onPress={() => handleTableSelection(table.id)}
                key={index} style={[styles.table, { top: table.y, left: table.x}]}
                 onPress={() => handleTableSelection(table.id)}
                 >
                    {/* <Image source = {{uri: tablesvgPath}}style = {{width:table.width,height:table.height}}/> */}
                    <Image source = {{uri: table.identifier}}style = {{width:table.width,height:dummytableLayoutData.height}}/>
                </TouchableOpacity>
            ))}
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

export default RestaurantTableLayout;
