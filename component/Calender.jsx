import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesome } from '@expo/vector-icons';
import TimeSlotItem from "./TimeslotItem";
import reservationData from '../reservationData.json';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedTimeSlot: null,
      timeSlots: []
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

    // Call a function to fetch and set the time slots based on the selected date
    this.setTimeSlotsForDate(date);
  }

  setTimeSlotsForDate(date) {
    const { weekday_openTime, weekday_closeTime, weekend_openTime, weekend_closeTime } = reservationData;

    const selectedDay = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const isOpenWeekend = selectedDay === 0 || selectedDay === 6; // Check if it's a weekend

    const openTime = isOpenWeekend ? weekend_openTime : weekday_openTime;
    const closeTime = isOpenWeekend ? weekend_closeTime : weekday_closeTime;

    const timeSlots = [];
    for (let i = openTime; i <= closeTime; i++) {
        const hour = i % 12 === 0 ? 12 : i % 12; // Convert 24-hour format to 12-hour format
        const period = i < 12 ? 'AM' : 'PM';
        timeSlots.push(`${hour}:00 ${period}`);
    }

    this.setState({ timeSlots });
}


  handleTimeSlotSelect(timeSlot) {
    this.setState({ selectedTimeSlot: timeSlot });
  }
  

  renderTimeSlot({ item }) {
    const { selectedTimeSlot } = this.state;
    const isSelected = selectedTimeSlot === item;
  
    return (
      <TimeSlotItem 
        timeSlot={item} 
        isSelected={isSelected} 
        onPress={() => this.handleTimeSlotSelect(item)} // Pass the selected time slot to the handler
      />
    );
  }
  
  render() {
    const { selectedStartDate, timeSlots } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toDateString() : "";

    return (
      <View style={styles.container}>
        <CalendarPicker 
          onDateChange={this.onDateChange}
          selectedDayColor="#00adf5"
          minDate={new Date()}
          selectedStartDate={this.props.selectedDate}
        />

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
  timeSlotsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  timeSlotsHeader: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});
