import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextInputField from '../../component/TextInputField';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../../styles/commonStyles'; // Import common styles
//import sendReservationData from '../apiCalls/sendReservationData';


const CustomerInfo = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // handle confirm reservation
  const handleConfirmReservation = () => {
    // Validate the all the fields
    if (
        !selectedDate ||
        !selectedTimeSlot ||
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber
        ) {
      alert('Please fill out all required fields.');
      return;
    }
    const data = {
      numberOfGuests,
      firstName,
      lastName,
      email,
      phoneNumber,
      specialNotes,
      selectedDate,
      selectedTimeSlot
    };
    sendReservationData(data, navigation);
  };
  return (
    <View style={{ padding: 16,  width: '100%',height: '100%' }}>
      <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:16, marginBottom:20 }} behavior="padding">
        <ScrollView style={{ width: '100%' }}>
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="wpforms" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
              <Text style={commonStyles.subHeaderText}>Customer information</Text>
            </View>
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
          <TouchableOpacity
            style={commonStyles.button}
            onPress={handleConfirmReservation}
          >
            <Text style={commonStyles.buttonText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>

  );
};

const confirmReservation = () => {
  // Send reservation data to the backend
  console.log('Reservation confirmed');
  // Navigate to reservation confirmation screen
};

export default CustomerInfo;
