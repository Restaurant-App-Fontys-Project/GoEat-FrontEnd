import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import axios from 'axios';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later

const ReservationDetails = ({ navigation, route }) => {
    const { restaurantId } = route.params;
    // const [reservationData, setReservationData] = useState(null); // Uncomment this line when fetching data from the backend

    useEffect(() => {
        // Fetch reservation data from the backend based on the restaurantId
        const fetchReservationData = async () => {
            try {
                const response = await axios.get(`http://your-backend-api/reservations?restaurantId=${restaurantId}`);
                setReservationData(response.data);
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            }
        };

        fetchReservationData();
    }, [restaurantId]);

    return (
        <View style={{ padding: 16, width: '100%', height: '100%' }}>
            <KeyboardAvoidingView style={{ flex: 3, alignItems: 'center', marginTop: 16, marginBottom: 20 }} behavior="padding">
                <ScrollView style={{ width: '100%' }}>
                    <View>
                        <Text style={commonStyles.subHeaderText}>Reservation Details</Text>
                        {reservationData && (
                            <Text style={commonStyles.bodyText}>
                                We have a 15 minute grace period. Please call us if you are running later than 5 minutes after your booked time.
                                We may contact you about this booking, so please ensure your email and phone number are up-to-date.
                                Your table will be booked for {reservationData.reservationDuration_in_hours} hours 15 minutes.
                            </Text>
                        )}
                    </View>
                    <View>
                        <Text style={commonStyles.subHeaderText}>A message from {reservationData && reservationData.name}</Text>
                        {reservationData && (
                            <Text style={commonStyles.bodyText}>{reservationData.message}</Text>
                        )}
                    </View>
                    {/* navigate to next view */}
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={() => navigation.navigate('DateTimePicker', { restaurantId })}
                    >
                       <Text style={commonStyles.buttonText}>Agree with terms and conditions</Text>
                    </TouchableOpacity> 
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ReservationDetails;
