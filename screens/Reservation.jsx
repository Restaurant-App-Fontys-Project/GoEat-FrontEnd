import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Calendar from '../component/Calender';
import TextInputField from '../component/TextInputField';
import reservationData from '../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../styles/commonStyles';
import sendReservationData from '../apiCalls/sendReservationData';
import RestaurantTableLayout from '../component/RestaurantTableLayout';

export default function Reservation({navigation}) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // handele increase and decrease guests
  const increaseGuests = () => {
    setNumberOfGuests(prevGuests => prevGuests + 1);
  };
  const decreaseGuests = () => {
    if (numberOfGuests > 1) {
      setNumberOfGuests(prevGuests => prevGuests - 1);
    }
  };
  // handle date select
  const handleDateSelect = (date) => {
    console.log("Date selected:", date); // Log the selected date
    setSelectedDate(date);
  };
  // handle time slot select
  const handleTimeSlotSelect = (timeSlot) => {
    console.log("Time slot selected:", timeSlot); // Log the selected time slot
    setSelectedTimeSlot(timeSlot);
  }

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
          <View>
            <Text style={commonStyles.subHeaderText}>Reservation Details</Text>
            <Text style={commonStyles.bodyText}>We have a 15 minute grace period. Please call us if you are running later than 5 minutes after your booked time. We may contact you about this booking, so please ensure your email and phone number are up-to-date. Your table will be booked for {reservationData.reservationDuration_in_hours} hours 15 minutes.</Text>
          </View>
          <View>
            <Text style={commonStyles.subHeaderText}>A message from {reservationData.name}</Text>
            <Text style={commonStyles.bodyText}>{reservationData.message}</Text>
          </View>
          {/* no. of guests */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="users" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]}
 />
            <Text style={commonStyles.subHeaderText}>Number of Guests: </Text>
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
          {/* table map */}
          <RestaurantTableLayout restaurantId={reservationData.restaurantId} />
          {/* date and time */}
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="calendar" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
              <Text style={commonStyles.subHeaderText}>Select the Date: </Text>
            </View>
          </View>
          <Calendar
            selectedDate={selectedDate}
            //   onDateSelect={handleDateSelect}
          />
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
          // onPress={handleConfirmReservation}
          onPress={() => navigation.navigate('ReservationOverview')}
          >
            <Text style={commonStyles.buttonText}>Confirm Reservation</Text>

          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = {
 
  
}
