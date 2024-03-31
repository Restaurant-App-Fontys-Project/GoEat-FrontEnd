import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesome } from '@expo/vector-icons';
import TimeSlotItem from "./TimeslotItem";
import { Picker } from '@react-native-picker/picker';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedTimeSlot: null,
      timeSlots: [],
      // disabledDates: [],
      reservationDuration: '1 hour', // Default reservation duration
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.handleTimeSlotSelect = this.handleTimeSlotSelect.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      selectedTimeSlot: null, // Reset selected time slot when date changes
    });

    if (this.props.onDateSelect) {
      this.props.onDateSelect(date);
    }

    this.setTimeSlotsForDate(date);
  };
  componentDidMount() {
    console.log('Received restaurantData in Calendar:', this.props.restaurantData);
  }
  
  

  setTimeSlotsForDate = (date) => {
    try {
      const { openingHours } = this.props.restaurantData;
      if (!openingHours || openingHours.length === 0) {
        console.error('Opening hours data is empty or undefined.');
        // You can set a default behavior or return here
        return;
      }
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
      const dayOpeningHours = openingHours.find(day => day.day === dayOfWeek);
      if (!dayOpeningHours) {
        console.error('Opening hours data for the selected day is not available.');
        // You can set a default behavior or return here
        return;
      }
      const { openingTime, closingTime } = dayOpeningHours;
      const timeSlots = this.generateTimeSlots(openingTime, closingTime);
      this.setState({ timeSlots });
    } catch (error) {
      console.error('Error setting time slots for date:', error);
    }
  };
  
  
  
  generateTimeSlots(openingTime, closingTime) {
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
  }

  handleTimeSlotSelect(timeSlot) {
    this.setState({ selectedTimeSlot: timeSlot });
    this.props.onTimeSlotSelect(timeSlot);
  }

  renderTimeSlot({ item }) {
    const { selectedTimeSlot } = this.state;
    const isSelected = selectedTimeSlot === item;

    return (
      <TimeSlotItem 
        timeSlot={item} 
        isSelected={isSelected} 
        onPress={() => this.handleTimeSlotSelect(item)}
      />
    );
  }

  render() {
    const { selectedStartDate, timeSlots, reservationDuration } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toDateString() : "";

    return (
      <View style={styles.container}>
        <CalendarPicker 
          onDateChange={this.onDateChange}
          selectedDayColor="#00adf5"
          minDate={new Date()}
          selectedStartDate={this.props.selectedDate}
          disabledDates={this.state.disabledDates}
        />

        {/* Drop down menu to select reservation duration */}
        <View style={styles.durationContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="clock-o" size={22} color="black" style={{ marginRight: 10 }} />
            <Text style={styles.durationHeader}>Select Reservation Duration:</Text>
          </View>
          <Picker
            selectedValue={reservationDuration}
            style={styles.durationPicker}
            onValueChange={(itemValue) => this.setState({ reservationDuration: itemValue })}
          >
            <Picker.Item label="1 hour" value="1 hour" />
            <Picker.Item label="2 hours" value="2 hours" />
            {/* Add more duration options as needed */}
          </Picker>
        </View>

        {/* Available time slots */}
        {selectedStartDate && (
          <View style={styles.timeSlotsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="clock-o" size={22} color="black" style={{ marginRight: 10 }}   />
                <Text style={styles.timeSlotsHeader}>Available Time Slots for {startDate}:</Text>
            </View>
            <FlatList
              data={timeSlots}
              renderItem={this.renderTimeSlot.bind(this)}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} 
              scrollEnabled={false} 
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
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
