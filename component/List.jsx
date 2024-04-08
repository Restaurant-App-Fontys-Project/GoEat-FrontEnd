// List.js
import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Modal, Dimensions } from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, address }) => (
   <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>{address}</Text>
   </View>
);

//The filter
const List = ({ searchPhrase, setClicked, data, onPress }) => {
   const renderItem = ({ item }) => {
      //When there is no input, show all
      if (searchPhrase === "") {
        return <TouchableOpacity onPress={() => onPress(item.id)}><Item name={item.name} address={item.address} /></TouchableOpacity>;
        }
      // filter of the name
      if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <TouchableOpacity onPress={() => onPress(item.id)}><Item name={item.name} address={item.address} /></TouchableOpacity>;
        }
      // filter of the description
      if (
         (item.address).toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
      ) {
         return <TouchableOpacity onPress={() => onPress(item.id)}><Item name={item.name} price={item.address} /></TouchableOpacity>;
      }
   };

   return (
    <Modal
       visible={searchPhrase !== ""}
       transparent={true}
       animationType="slide"
       onRequestClose={() => setClicked(false)}
    >
       <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setClicked(false)}
          activeOpacity={1} // This ensures that onPress is not triggered when clicking on the modal
       >
          <View style={styles.list__container}>
             <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
          </View>
       </TouchableOpacity>
    </Modal>
 );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
 modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
 },
 list__container: {
    backgroundColor: "white",
    width: windowWidth - 40, // Adjust width as needed
    borderRadius: 10,
 },
    item: {
        padding: 20,
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
    },
    price: {
        fontSize: 18,
        marginLeft: "auto",
    },

});

export default List;