import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList, Button, Modal, Alert } from 'react-native';
import commonStyles from '../../styles/commonStyles';
import { FontAwesome } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import { Picker } from '@react-native-picker/picker';
import TimeSlotItem from "../../component/TimeslotItem";
import reservationData from '../../reservationData.json'; //remove later
import specialDates from '../../specialDates.json';
import { getRestaurantData } from '../../apiCalls/ReservationData';

const DateTimePicker = ({ navigation, route }) => {
  const { restaurantId} = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [maxDuration, setMaxDuration] = useState(0);
  const [reservationDuration, setReservationDuration] = useState(1); 
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isDurationPickerVisible, setIsDurationPickerVisible] = useState(false);
  const [isGuestsPickerVisible, setIsGuestsPickerVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeSlotsVisible, setIsTimeSlotsVisible] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});

  const toggleDurationPicker = () => {
    setIsDurationPickerVisible(!isDurationPickerVisible);
  };

  const toggleGuestsPicker = () => {
    setIsGuestsPickerVisible(!isGuestsPickerVisible);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };
  const toggleTimeSlots = () => {
    setIsTimeSlotsVisible(!isTimeSlotsVisible);
  };
 
  // edit this later
  const fetchMaxDuration = () => {
    const { reservation_max_duration_in_hours } = reservationData;
    setMaxDuration(reservation_max_duration_in_hours);
  };

  useEffect(() => {
    fetchMaxDuration();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRestaurantData(restaurantId); 
      setRestaurantData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const { name, openingHours } = restaurantData;
 
  
  // check if the selected date is a special holiday
  const isSpecialHoliday = (date, specialDates) => {
    return specialDates.some(day => {
      return date.getDate() === day.date && date.getMonth() === day.month;
    });
  };
  
  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
    console.log('Type of selected date:', typeof date);
    if (!date) {
      console.error('Selected date is null.');
      return;
    }

    const handleDate = (selectedDate) => {
      if (selectedDate instanceof Date) {
        const selectedDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];
        const selectedDayOpeningHours = openingHours.find(day => day.day === selectedDayOfWeek);
  
        if (!selectedDayOpeningHours || (selectedDayOpeningHours.openingTime === "0:00" && selectedDayOpeningHours.closingTime === "0:00")) {
          Alert.alert("This day is closed for reservations.");
          return;
        }
  
        if (isSpecialHoliday(selectedDate, specialDates)) {
          Alert.alert("Special holiday! Opening hours may vary.");
        }
  
        setSelectedDate(selectedDate);
        setSelectedTimeSlot(null); 
        setTimeSlotsForDate(selectedDate);
        setIsCalendarVisible(false);
      } else {
        console.error('Invalid date object:', selectedDate);
      }
    };
  
    // Example of calling handleDate with the date object passed to handleDateSelect
    handleDate(date);
  };
  
  

  const setTimeSlotsForDate = () => {
    try {
      if (!openingHours || openingHours.length === 0) {
        console.error('Opening hours data is empty or undefined.');
        return;
      }
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];
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
    toggleTimeSlots();
  };

  const dateString = selectedDate ? selectedDate.toISOString() : null;

  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
      <View style={[{ marginTop: 20, alignItems: 'center' }]}>
          <Text style={commonStyles.headerText}>{name}</Text>
        </View>
        {/* Drop down menu to select reservation duration */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="clock-o" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
            <Text>Select Reservation Duration:</Text>
          </View>
          <TouchableOpacity style={styles.inputContainer} onPress={toggleDurationPicker}>
            <Text style={styles.durationHeader}> {reservationDuration} hour(s)</Text>
          </TouchableOpacity>
        </View>
        <Modal 
            visible={isDurationPickerVisible}
            animationType="slide"
            transparent={true}
           >
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={reservationDuration}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setReservationDuration(itemValue);
                toggleDurationPicker();
              }}
            >
              <Picker.Item label="1 hour" value={1} />
              <Picker.Item label="2 hours" value={2} />
              {/* change later */}
            </Picker>
          </View>
        </Modal>
        {/* no. of guests */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="users" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]}/>
            <Text>Select Number of Guests</Text>
          </View>
          <TouchableOpacity style={styles.inputContainer} onPress={toggleGuestsPicker}>
            <Text style={styles.durationHeader}>{noOfGuests} Guest(s)</Text>
          </TouchableOpacity>
        </View>
        <Modal 
          visible={isGuestsPickerVisible} 
          animationType="slide"
          transparent={true}
          >
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={noOfGuests}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setNoOfGuests(itemValue);
                toggleGuestsPicker();
              }}
            >
              <Picker.Item label="1 Guest" value={1} />
              <Picker.Item label="2 Guests" value={2} />
              {/* change later */}
            </Picker>
          </View>
        </Modal>
        {/* calander */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="calendar" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
            <Text>Select the Date:</Text>
          </View>
          <TouchableOpacity onPress={toggleCalendar} style={styles.inputContainer} >
            <Text style={styles.durationHeader}>{selectedDate ? selectedDate.toDateString() : "Select Date"}</Text>
          </TouchableOpacity>
          {/* calendar */}
          {isCalendarVisible && (
            <View style={[commonStyles.itemContainer,{marginTop: 10}]}>
              <CalendarPicker
                onDateChange={handleDateSelect}
                selectedDayColor="#F8D3B9"
                minDate={new Date()}
                selectedStartDate={selectedDate}
              />
            </View>
          )}
        </View>
        {/* Available time slots */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FontAwesome name="clock-o" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]}/>
            <Text>Select the Time:</Text>
          </View>
          <TouchableOpacity style={styles.inputContainer} onPress={toggleTimeSlots}>
            <Text style={styles.durationHeader}>{selectedTimeSlot ? selectedTimeSlot : "Select Time"}</Text>
          </TouchableOpacity>
        </View>

        <Modal 
        visible={isTimeSlotsVisible} 
        animationType="slide"
        transparent={true}
        >
          <View style={[styles.modalContainer]}>
            <View  style={[{paddingTop: 70}]}>
              <Text style={styles.timeSlotsHeader}>Available Time Slots for {selectedDate ? selectedDate.toDateString() : ''}:</Text>
            </View>
            {/* Container for time slots with scroll */}
            <ScrollView style={[{ backgroundColor: 'white', padding: 5, borderRadius: 10, width: '90%', flex: 0, maxHeight: '70%' }]}>
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
            </ScrollView>
          </View>
        </Modal>
        {/* Button for proceeding to table layout */}
        <TouchableOpacity
          style={[commonStyles.button, (!selectedDate || !selectedTimeSlot) && styles.disabledButton]} // Change here
          onPress={() =>
            (selectedDate && selectedTimeSlot) ?
              navigation.navigate('Reservation 2/3', {
                selectedDate: dateString,
                // selectedDate,
                selectedTimeSlot,
                reservationDuration,
                restaurantId,
                noOfGuests,
                restaurantData
              }) : null
          }
          disabled={!selectedDate || !selectedTimeSlot} 
        >
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  timeSlotsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  timeSlotsHeader: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: '#ccc',
},
});

export default DateTimePicker;
