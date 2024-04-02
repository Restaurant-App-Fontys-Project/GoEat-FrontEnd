import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextInputField from '../../component/TextInputField';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../../styles/commonStyles'; // Import common styles
//import sendReservationData from '../apiCalls/sendReservationData';


const CustomerInfo = ({ navigation, route }) => {
  // const { fetchedReservationData,tableId,selectedDate, selectedTimeSlot, reservationDuration } = route.params;
  const { tableId,selectedDate, selectedTimeSlot, reservationDuration } = route.params;
    // console.log('Reservation data:', reservationData);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  // const [title, setTitle] = useState('Mr.');
  

  // const handleNextPress = () => {
  //   // Collect all the form data
  //   const formData = {
  //     tableId,
  //     selectedDate,
  //     selectedTimeSlot,
  //     reservationDuration,
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     specialNotes,
  //     title,
  //     numberOfGuests
  //   };
  //   navigation.navigate('Confirmation', formData);
  //   console.log('Form data:', formData);
  // };


  return (
    <View style={{ padding: 16,  width: '100%',height: '100%' }}>
      <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:16, marginBottom:20 }} behavior="padding">
        <ScrollView style={{ width: '100%' }}>
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="wpforms" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
              <Text style={commonStyles.subHeaderText}>Customer information</Text>
            </View>
            {/* title */}
          {/* <View>
                <Text>Title* </Text>
              </View>
            <Picker
              selectedValue={title}
              onValueChange={(itemValue, itemIndex) =>
              setTitle(itemValue)
            }>
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Mrs." value="Mrs." />
              <Picker.Item label="Miss." value="Miss." />
              <Picker.Item label="Not specified" value="Not specified" />
            </Picker> */}
            {/* fname, lname,email,phone */}
            <TextInputField 
              label="First Name*" 
              placeholder="First Name" 
              keyboardType="default"
              onChangeText={text => setFirstName(text)}
            />
            <TextInputField 
              label="Last Name*" 
              placeholder="Last Name" 
              keyboardType="default" 
              onChangeText={text => setLastName(text)}
            />
            <TextInputField 
              label="Email*" 
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
             />
            <TextInputField 
              label="Phone Number*"
              placeholder="Phone Number" 
              keyboardType="phone-pad"
              onChangeText={text => setPhoneNumber(text)}
              />

            <TextInputField 
            label="Special Notes (optional)"
              placeholder="Special Requests, Allergies, etc."
              keyboardType="default" 
              multiline
              onChangeText={text => setSpecialNotes(text)}
              />
          </View>
      
        </ScrollView>
        <TouchableOpacity
            style={commonStyles.button}
            // onPress={handleNextPress}
             onPress={() => navigation.navigate('Confirmation',{ 
              tableId,
              selectedDate,
              selectedTimeSlot,
              reservationDuration,
              firstName,
              lastName,
              email,
              phoneNumber,
              specialNotes,
              // title,
              numberOfGuests
            })}

          >
            <Text style={commonStyles.buttonText}>Next</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>

  );
};

// const confirmReservation = () => {
//   // Send reservation data to the backend
//   console.log('Reservation confirmed');
//   // Navigate to reservation confirmation screen
// };

export default CustomerInfo;
