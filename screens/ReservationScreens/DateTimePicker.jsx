import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import commonStyles from '../../styles/commonStyles';
import { FontAwesome } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import { Picker } from '@react-native-picker/picker';
import TimeSlotItem from "../../component/TimeslotItem";
import { fetchRestaurantData } from '../../apiCalls/restaurantApi';
import reservationData from '../../reservationData.json';

const DateTimePicker = ({ navigation, route }) => {
  const { restaurantId } = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [maxDuration, setMaxDuration] = useState(0);
  const [reservationDuration, setReservationDuration] = useState('1 hour');
  const [restaurantData, setRestaurantData] = useState({}); 
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    fetchData();
    fetchMaxDuration();
  }, []);
  
  const fetchData = async () => {
    try {
      await fetchRestaurantData(restaurantId, setRestaurantData);
      
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMaxDuration = () => {
    const { reservation_max_duration_in_hours } = reservationData;
    setMaxDuration(reservation_max_duration_in_hours);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset selected time slot
    setTimeSlotsForDate(date);
  };

  const setTimeSlotsForDate = (date) => {
    try {
      const { openingHours } = restaurantData;
      if (!openingHours || openingHours.length === 0) {
        console.error('Opening hours data is empty or undefined.');
        return;
      }
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
      const dayOpeningHours = openingHours.find(day => day.day === dayOfWeek);
      if (!dayOpeningHours) {
        console.error('Opening hours data for the selected day is not available.');
        return;
      }
      const { openingTime, closingTime } = dayOpeningHours;
      const timeSlots = generateTimeSlots(openingTime, closingTime);
      setAvailableTimeSlots(timeSlots);
    } catch (error) {
      console.error('Error setting time slots for date:', error);
    }
  };

  const generateTimeSlots = (openingTime, closingTime) => {
    const timeSlots = [];
    const openHour = parseInt(openingTime.split(":")[0]);
    const closeHour = parseInt(closingTime.split(":")[0]);

    for (let i = openHour; i < closeHour; i++) {
      timeSlots.push(`${i}:00`);
      timeSlots.push(`${i}:15`);
      timeSlots.push(`${i}:30`);
      timeSlots.push(`${i}:45`);
    }

    return timeSlots;
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const dateString = selectedDate ? selectedDate.toISOString() : null;

  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        <View style={commonStyles.itemContainer}>
          <View style={commonStyles.itemHeader}>
            <FontAwesome name="calendar" size={22} color="black" style={commonStyles.icon} />
            <Text style={commonStyles.subHeaderText}>Select the Date:</Text>
          </View>
          <CalendarPicker
            onDateChange={handleDateSelect}
            selectedDayColor="#00adf5"
            minDate={new Date()}
            selectedStartDate={selectedDate}
          />
        </View>

        {/* Drop down menu to select reservation duration */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="clock-o" size={22} color="black" style={{ marginRight: 10 }} />
            <Text style={styles.durationHeader}>Select Reservation Duration:</Text>
          </View>
          <Picker
            selectedValue={reservationDuration}
            style={styles.durationPicker}
            onValueChange={(itemValue) => setReservationDuration(itemValue)}
          >
            <Picker.Item label="1 hour" value="1 hour" />
            <Picker.Item label="2 hours" value="2 hours" />
            {/* Add more duration options as needed */}
          </Picker>
        </View>

        {/* Available time slots */}
        {selectedDate && (
          <View style={styles.timeSlotsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="clock-o" size={22} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.timeSlotsHeader}>Available Time Slots for {selectedDate.toDateString()}:</Text>
            </View>
            <FlatList
              data={availableTimeSlots}
              renderItem={({ item }) => (
                <TimeSlotItem
                  timeSlot={item}
                  isSelected={item === selectedTimeSlot}
                  onPress={() => handleTimeSlotSelect(item)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Button for proceeding to table layout */}
        <TouchableOpacity
          style={commonStyles.button}
          onPress={() =>
            navigation.navigate('TableLayout', {
              selectedDate: dateString,
              selectedTimeSlot,
              reservationDuration,
              restaurantId
            })
          }>
          <Text style={commonStyles.buttonText}>Proceed to Table Layout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  durationContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  durationHeader: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  durationPicker: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  timeSlotsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  timeSlotsHeader: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default DateTimePicker;
