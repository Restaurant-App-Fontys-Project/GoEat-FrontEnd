import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextInputField from '../../component/TextInputField';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../../styles/commonStyles'; // Import common styles
//import sendReservationData from '../apiCalls/sendReservationData';


const Confirmation = ({ navigation, route }) => {
    // incoming data from the previous screens
    const {
                tableId,
                selectedDate,
                selectedTimeSlot,
                reservationDuration,
                firstName,
                lastName,
                email,
                phoneNumber,
                specialNotes,
                title,
                noOfGuests,
                restaurantData,

        } = route.params;
    

//  calculate the reservation end time
const startTime = selectedTimeSlot.split(':');
const startHour = parseInt(startTime[0]);
const startMinute = parseInt(startTime[1]);
const durationInHours = parseInt(reservationDuration);
const endHour = (startHour + durationInHours) % 24; // Ensure end hour doesn't exceed 24 hours
const endMinute = startMinute;

const endTime = `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;

    const handleConfirmReservation = async () => {
        try {
            // Make API request to send reservation data to the backend
            const response = await fetch('https://goeat-api.onrender.com/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tableId,
                    selectedDate,
                    selectedTimeSlot,
                    endTime,
                    reservationDuration,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    specialNotes,
                    noOfGuests,
                }),
            });
    
            if (response.ok) {
                console.log('Reservation confirmed');
                // Navigate to success screen or perform any other action
            } else {
                // unsuccessful API request
                console.error('Failed to confirm reservation:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error confirming reservation:', error.message);
            // Display error message to the user
        }
        navigation.navigate('ReservationOverview');
    };
    
    return(
        <View style={{ padding: 16,  width: '100%',height: '100%' }}>
            <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:16, marginBottom:20 }} behavior="padding">
            <ScrollView style={{ width: '100%' }}>
            <View style={{ marginTop: 20 }}>
                <Text style={commonStyles.subHeaderText}>Your Reservation</Text>
                <Text>Reserved By</Text>
                {/* title, fname, lname */}
                <Text>{title} {firstName} {lastName}</Text>
                {/* email */}
                <Text>{email}</Text>
                {/* telephone */}
                <Text>{phoneNumber}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text>Date and Time</Text>
                {/* selected date and time */}
                <Text>{selectedDate}, {selectedTimeSlot} - {endTime}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text>Place</Text>
                {/* table number and restaurant name */}
                <Text>Table-{tableId} (for {noOfGuests} Guests) at {restaurantData.name}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text>Special Request</Text>
                {/* note */}
                <Text>{specialNotes}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                        <Text style={commonStyles.subHeaderText}>Reservation Details</Text>
                        {reservationData && (
                            <Text style={commonStyles.bodyText}>
                                We have a 15 minute grace period. Please call us if you are running later than 5 minutes after your booked time.
                                We may contact you about this booking, so please ensure your email and phone number are up-to-date.
                                Your table will be booked for {reservationData.reservationDuration_in_hours} hours.
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={commonStyles.subHeaderText}>A message from {reservationData && restaurantData.name}</Text>
                        {reservationData && (
                            <Text style={commonStyles.bodyText}>{reservationData.message}</Text>
                        )}
                    </View>

          
            </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                 style={commonStyles.button} 
                 onPress={handleConfirmReservation}
            >
                <Text style={commonStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>

    );
}
export default Confirmation;