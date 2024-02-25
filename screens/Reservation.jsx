import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Calendar from '../component/Calender';
import TextInputField from '../component/TextInputField';
import reservationData from '../reservationData.json'; // Import the JSON file

export default function Restaurant() {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  const increaseGuests = () => {
    setNumberOfGuests(prevGuests => prevGuests + 1);
  };

  const decreaseGuests = () => {
    if (numberOfGuests > 1) {
      setNumberOfGuests(prevGuests => prevGuests - 1);
    }
  };
  
  const handleDateSelect = (date) => {
    console.log("Date selected:", date); // Log the selected date
    setSelectedDate(date);
  };

  return (
    <View style={{ padding: 16,  width: '100%',height: '100%' }}>
      <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:70, marginBottom:20 }} behavior="padding">
        <ScrollView style={{ width: '100%' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Reservation</Text>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20 }}>Reservation Details</Text>
            <Text style={{ marginBottom: 10 }}>We have a 15 minute grace period. Please call us if you are running later than 5 minutes after your booked time. We may contact you about this booking, so please ensure your email and phone number are up-to-date. Your table will be booked for {reservationData.reservationDuration_in_hours} hours 15 minutes.</Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 20 }}>A message from {reservationData.name}</Text>
            <Text style={{ marginBottom: 10 }}>{reservationData.message}</Text>
          </View>
          {/* no. of guests */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="users" size={22} color="black" style={{ marginRight: 10 }} />
            <Text style={{ marginRight: 10, fontWeight: "bold" }}>Number of Guests: </Text>
            <Button title="-" onPress={decreaseGuests} />
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', padding: 6, minWidth: 70, textAlign: 'center'}}
              value={numberOfGuests.toString()}
              onChangeText={text => {
                if (!isNaN(text)) {
                  setNumberOfGuests(parseInt(text));
                }
              }}
              editable={false}
            />
            <Button title="+" onPress={increaseGuests} />
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="calendar" size={22} color="black" style={{ marginRight: 10 }} />
              <Text style={{fontWeight: "bold"}}>Select the Date: </Text>
            </View>
          </View>
          <Calendar
            selectedDate={selectedDate}
            //   onDateSelect={handleDateSelect}
          />
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="wpforms" size={22} color="black" style={{ marginRight: 10 }} />
              <Text style={{fontWeight: "bold"}}>Customer information</Text>
            </View>
            {/* fname, lname,email,phone */}
            <TextInputField label="First Name*" placeholder="First Name" keyboardType="default" />
            <TextInputField label="Last Name*" placeholder="Last Name" keyboardType="default" />
            <TextInputField label="Email*" placeholder="Email" keyboardType="email-address" />
            <TextInputField label="Phone Number*" placeholder="Phone Number" keyboardType="phone-pad" />
            <TextInputField label="Special Notes (optional)" placeholder="Special Requests, Allergies, etc." keyboardType="default" multiline />
          </View>
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginTop: 20, borderRadius:50 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Confirm Reservation</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
