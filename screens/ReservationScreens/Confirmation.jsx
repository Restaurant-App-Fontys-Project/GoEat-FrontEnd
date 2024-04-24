import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Modal, Alert, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import commonStyles from '../../styles/commonStyles'; 
import {sendReservationData} from '../../apiCalls/ReservationData';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from '../../styles/GradientButton';



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
    const [userId, setUserId] = useState(null);

    // make phone number a string
    const phoneNumberString = phoneNumber.toString();
    
    // get user id from async storage
    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            console.log('User ID:', userId);
            if (userId) {
                setUserId(userId);
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    };
    useEffect(() => {
        getUserId();
    }, []);
    console.log("userid",userId);

    //  calculate the reservation end time
        const startTime = selectedTimeSlot.split(':');
        const startHour = parseInt(startTime[0]);
        const startMinute = parseInt(startTime[1]);
        const durationInMinutes = parseInt(reservationDuration);
        const totalStartMinutes = startHour * 60 + startMinute;
        const totalEndMinutes = totalStartMinutes + durationInMinutes;
        const endHour = Math.floor(totalEndMinutes / 60) % 24; // Ensure end hour doesn't exceed 24 hours
        const endMinute = totalEndMinutes % 60;

        const endTime = `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;
        const endTimeString = endTime + ":00";

    // convert selecteddate in to string 
    const dateObject = new Date(selectedDate);
    const dateString = dateObject.toISOString().substring(0, 10);
    const startTimeString = selectedTimeSlot+":00";

    // Extract hour and minute from the time string
    const [hour, minute] = selectedTimeSlot.split(':').map(val => parseInt(val));

     // check console for the data
     console.log("restaurantId",restaurantId);
     console.log("userId",userId);
     console.log("date",dateString);
     console.log("note",specialNotes);
     console.log("no of guests",noOfGuests);
     console.log("tableId",tableId);
     console.log("start time",startTimeString);
     console.log("end time",endTimeString);
     console.log("fname",firstName);
     console.log("lname",lastName);
     console.log("email",email);
     console.log("phone",phoneNumberString);
     console.log("title",title);


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
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber:phoneNumberString,
                title:title,
            };
            const response = await sendReservationData(data, 5000); 
            console.log('Reservation data:', data);
            if (response.status === 201) {
                Alert.alert('Thank you, your reservation has been successfully confirmed!');
            } else {
                Alert.alert('Failed to confirm reservation:',  response && response.statusText ? response.statusText : 'Unknown error');
            }
                } catch (error) {
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
                <Text>Table-{tableNumber} </Text>
                <Text>{restaurantData.name}, {restaurantData.address}, {restaurantData.city} </Text>
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
                        <Text style={commonStyles.subHeaderText}>A message from {restaurantData.name}</Text>
                        <Text style={commonStyles.bodyText}>{restaurantData.reservationmessage}</Text>
                        
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
            {/* <TouchableOpacity 
                 style={[commonStyles.button, !isChecked && styles.disabledButton]} 
                 onPress={handleConfirmReservation}
                 disabled={!isChecked}
            >
                <Text style={commonStyles.buttonText}>Confirm</Text>
            </TouchableOpacity> */}
            <GradientButton text="Confirm" onPress={handleConfirmReservation} icon={null} style={{ marginTop: 20 }} />
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
