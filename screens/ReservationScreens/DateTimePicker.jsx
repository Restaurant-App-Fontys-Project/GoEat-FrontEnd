import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import commonStyles from '../../styles/commonStyles'; // Import common styles
import axios from 'axios';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import Calendar from '../../component/Calender';
import { FontAwesome } from '@expo/vector-icons';

const DateTimePicker = ({ navigation, route }) => {
  const { restaurantId } = route.params;
  // fetch data from the backend again???

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); 

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

  return (
    <View style={{ padding: 16, width: '100%', height: '100%' }}>
    <KeyboardAvoidingView style={{ flex: 3, alignItems: 'center', marginTop: 16, marginBottom: 20 }} behavior="padding">
        <ScrollView style={{ width: '100%' }}>
    <View>
       <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="calendar" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
              <Text style={commonStyles.subHeaderText}>Select the Date: </Text>
            </View>
            <Calendar
            selectedDate={selectedDate}
            //   onDateSelect={handleDateSelect}
          />
          </View>
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('TableLayout')}>
        <Text style={commonStyles.buttonText}>Proceed to Table Layout</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
};

export default DateTimePicker;
