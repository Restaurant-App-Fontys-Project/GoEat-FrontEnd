import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Modal, Dimensions, TouchableOpacity, Alert } from "react-native";

const List = ({ searchPhrase, data, onPress }) => {
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchPhrase.toLowerCase().trim())
    );

    // Use useEffect to trigger an alert when filteredData is empty
    useEffect(() => {
        if (searchPhrase !== "" && filteredData.length === 0) {
            Alert.alert("No Results Found", "Sorry, currently we do not have this result! Please try again with other options.");
        }
    }, [searchPhrase, filteredData]);

    return (
        <Modal
            visible={searchPhrase !== "" && filteredData.length > 0}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                {filteredData.length > 0 ? (
                    <View style={styles.listContainer}>
                        <FlatList 
                            data={filteredData}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => onPress(item.id, item.restaurantId)}>
                                    <View style={styles.item}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.address}>{item.address ?? (item.price+'€')} </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                ) : null }
            </View>
        </Modal>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
const imageWidth = width * 0.2;
const containerWidth = width * 0.9;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    listContainer: {
        backgroundColor: "white",
        width: windowWidth - 40, 
        borderRadius: 10,
    },
    item: {
        padding: 10, 
        flexDirection: "row",
        justifyContent: "space-between",
        width: containerWidth, 
        flexWrap: 'wrap', 
    },
    title: {
        fontSize: 18,
        marginRight: 20,
    },
    address: {
        fontSize: 18,
        color: "#666",
    },
});

export default List;
