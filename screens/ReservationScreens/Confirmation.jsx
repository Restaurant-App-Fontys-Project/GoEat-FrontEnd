import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Modal, Alert, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../../styles/commonStyles'; 
import {sendReservationData} from '../../apiCalls/ReservationData';


const Confirmation = ({ navigation, route }) => {
    const {     restaurantId,
                tableId,
                tableNumber,
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
    
    const [isChecked, setIsChecked] = useState(false);

    //  calculate the reservation end time
    const startTime = selectedTimeSlot.split(':');
    const startHour = parseInt(startTime[0]);
    const startMinute = parseInt(startTime[1]);
    const durationInHours = parseInt(reservationDuration);
    const endHour = (startHour + durationInHours) % 24; // Ensure end hour doesn't exceed 24 hours
    const endMinute = startMinute;

    const endTime = `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;
    const endTimeString = endTime+":0";
    // convert selecteddate in to string 
    const dateObject = new Date(selectedDate);
    const dateString = dateObject.toISOString().substring(0, 10);
    const startTimeString = selectedTimeSlot+":0";

    // remove this later
    const userId = "d19b78e7-e6c8-43f6-b897-d9dba662b2fe";

    const handleConfirmReservation = async () => {
        // Check if the checkbox is checked
        if (!isChecked) {
            Alert.alert('Please confirm your reservation by toggling the switch.');
            return;
        }
        try {
            // Make API request to send reservation data to the backend
            const data = {
                restaurantId: restaurantId,
                userId: userId,
                date: dateString,
                note: specialNotes,
                numberOfPeople: noOfGuests,
                tableId: tableId,
                reservationStart: startTimeString,
                reservationEnd: endTimeString,
                // firstName,
                // lastName,
                // email,
                // phoneNumber,
            };
    
            // Call sendReservationData function
            const response = await sendReservationData(data, 5000); // 5000 milliseconds timeout
    
            console.log('Reservation data:', data);
    
            if (response.status === 200) {
                console.log('Reservation confirmed');
                // show a modal with success message
                Alert.alert('Reservation confirmed');
            } else {
                // unsuccessful API request
                console.error('Failed to confirm reservation:', response && response.statusText ? response.statusText : 'Unknown error');
                // Display error message to the user
                Alert.alert('Failed to confirm reservation:',  response && response.statusText ? response.statusText : 'Unknown error');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error confirming reservation:', error.message);
            // Display error message to the user
            Alert.alert('Error confirming reservation:', error.message);
        }
        navigation.navigate('ReservationOverview');
    };
    
    
    return(
        <View style={{ padding: 16,  width: '100%',height: '100%' }}>
            <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:16, marginBottom:20 }} behavior="padding">
            <ScrollView style={{ width: '100%' }}>
            <View style={{ marginTop: 20 }}>
                <Text style={commonStyles.subHeaderText}>Your Reservation</Text>
                <Text style={styles.boldText}>Reserved By</Text>
                {/* title, fname, lname */}
                <Text>{title} {firstName} {lastName}</Text>
                {/* email */}
                <Text>{email}</Text>
                {/* telephone */}
                <Text>{phoneNumber}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.boldText}>Date and Time</Text>
                {/* selected date and time */}
                <Text>{dateString}</Text>
                <Text>{selectedTimeSlot} - {endTime}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.boldText}>Place</Text>
                {/* table number and restaurant name */}
                <Text>Table-{tableNumber} (for {noOfGuests} Guests) at {restaurantData.name}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.boldText}>Special Request</Text>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Switch
                            value={isChecked}
                            onValueChange={setIsChecked}
                            trackColor={{ false: '#767577', true: '#767577' }}
                            thumbColor={isChecked ? '#D69F3B' : '#f4f3f4'}
                        />
                        <Text style={{ marginLeft: 10 }}>I agree with all terms and conditions.</Text>
                    </View>
          
            </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity 
                 style={[commonStyles.button, !isChecked && styles.disabledButton]} 
                 onPress={handleConfirmReservation}
                 disabled={!isChecked}
            >
                <Text style={commonStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = {
    boldText: {
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
}
export default Confirmation;