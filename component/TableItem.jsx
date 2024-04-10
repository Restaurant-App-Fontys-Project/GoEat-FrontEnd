import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const TableItem = ({ table, onPress, isSelected }) => {
    const getImageSource = (capacity) => {
        switch (capacity) {
            case 1:
                return require('../assets/tables/1-table.png');
            case 2:
                return require('../assets/tables/2-table.png');
            case 3:
                return require('../assets/tables/3-table.png');
            case 4:
                return require('../assets/tables/4-table.png');
            case 5:
                return require('../assets/tables/5-table.png');
            case 6:
                return require('../assets/tables/6-table.png');
            case 7:
                return require('../assets/tables/7-table.png');
            case 8:
                return require('../assets/tables/8-table.png');
        }
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.tableContainer, isSelected && styles.selectedTable]}
        >
            <Image
                source={getImageSource(table.capacity)}
                style={styles.tableImage}
            />
            <Text style={styles.tableNumber}>Table {table.tableNumber}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    tableContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    tableImage: {
        width: 60,
        height: 40,
    },
    tableNumber: {
        fontSize: 16,
    },
    selectedTable: {
        backgroundColor: '#F8D3B9',
    }
});

export default TableItem;
