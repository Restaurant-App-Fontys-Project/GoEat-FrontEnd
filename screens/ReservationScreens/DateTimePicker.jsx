import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import commonStyles from '../../styles/commonStyles'; // Import common styles
import axios from 'axios';
import reservationData from '../../reservationData.json'; // Import the JSON file, remove later
import Calendar from '../../component/Calender';
import { FontAwesome } from '@expo/vector-icons';

const DateTimePicker = ({ navigation, route }) => {
  // const { restaurantId } = route.params;
  // const [fetchedReservationData, setFetchedReservationData] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [maxDuration, setMaxDuration] = useState(0); 
  const [reservationDuration, setReservationDuration] = useState('1 hour');

  // uncomment the following code when the backend is ready

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`https://goeat-api.onrender.com/reservations/${restaurantId}`);
  //     setFetchedReservationData(response.data);
  //     console.log('Fetched reservation data:', response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // use this reservationData.json file until backend is ready
  useEffect(() => {
    // Get the maximum reservation duration from the JSON data
    const fetchMaxDuration = () => {
      // Assuming reservationData contains the JSON data
      const { reservation_max_duration_in_hours } = reservationData;
      setMaxDuration(reservation_max_duration_in_hours);
    };

    fetchMaxDuration();
  }, []);

   // Generate options for the Picker based on the maximum duration
   const pickerItems = [];
   for (let i = 1; i <= maxDuration; i++) {
     pickerItems.push(<Picker.Item key={i} label={`${i} hour${i !== 1 ? 's' : ''}`} value={i} />);
   }

  // handle date select
  const handleDateSelect = (date) => {
    // console.log("Date selected 1:", date); 
    setSelectedDate(date);
  };

  // handle time slot select
  const handleTimeSlotSelect = (timeSlot) => {
    // console.log("Time slot selected 1:", selectedTimeSlot); 
    setSelectedTimeSlot(timeSlot);
  }

  // Convert the Date object to a string
  const dateString = selectedDate ? selectedDate.toISOString() : null;

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
                onDateSelect={handleDateSelect}
                onTimeSlotSelect={handleTimeSlotSelect}
              />
            </View>
          </View>
              {/* drop down menu to select reservation duration with 2 options 1 hr and 2 hrs */}
              <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="clock-o" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
                <Text style={commonStyles.subHeaderText}>Select Reservation Duration: </Text>
              </View>
              <View>
              <Picker
                 selectedValue={reservationDuration}
                 style={{ width: '100%', marginBottom: 10, marginTop: 10 }}
                 onValueChange={(itemValue, itemIndex) =>
                   setReservationDuration(itemValue)
                }
              >
                {pickerItems}
              </Picker>
              </View>
              </View>
        </ScrollView>
        <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('TableLayout',{
          //fetchedReservationData,{/* uncomment this after backend is ready */}
          selectedDate: dateString,
          selectedTimeSlot,
          reservationDuration
        })}>
          
          <Text style={commonStyles.buttonText}>Proceed to Table Layout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DateTimePicker;
