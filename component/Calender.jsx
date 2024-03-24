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
      timeSlots: [],
      disabledDates: [],
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.handleTimeSlotSelect = this.handleTimeSlotSelect.bind(this);
  }
  componentDidMount() {
    // Call a function to set disabled dates
    this.setDisabledDates();
  }

  setDisabledDates() {
    // Extract closed dates from reservationData or any other source
    const { closedDates } = reservationData;

    // Create an array of Date objects for disabled dates
    const disabledDates = closedDates.map(dateString => new Date(dateString));

    // Update the state with disabled dates
    this.setState({ disabledDates });
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
    // const dateStringFromBackend = "2024-12-25T00:00:00Z";
    // const dateObject = new Date(dateStringFromBackend);
    // const month = dateObject.getMonth(); // Returns 11 (December is 11th month)
    // const date = dateObject.getDate(); // Returns 25



  setTimeSlotsForDate(date) {
    const { 
      monday_openTime,
      monday_closeTime,
      tuesday_openTime,
      tuesday_closeTime,
      wednesday_openTime,
      wednesday_closeTime,
      thursday_openTime,
      thursday_closeTime,
      friday_openTime,
      friday_closeTime,
      saturday_openTime,
      saturday_closeTime,
      sunday_openTime,
      sunday_closeTime,
      christmas_openTime,
      christmas_closeTime,
      } = reservationData;


      // Check if it's Christmas day
      if (date.getMonth() === 11 && date.getDate() === 25) {
        const timeSlots = this.generateTimeSlots(christmas_openTime, christmas_closeTime);
        this.setState({ timeSlots });
        return;
      }

    const day = date.getDay(); // Get the day of the week (0-6)
    let timeSlots = [];

    switch (day) {
      case 0: // Sunday
        timeSlots = this.generateTimeSlots(sunday_openTime, sunday_closeTime);
        break;
      case 1: // Monday
        timeSlots = this.generateTimeSlots(monday_openTime, monday_closeTime);
        break;
      case 2: // Tuesday
        timeSlots = this.generateTimeSlots(tuesday_openTime, tuesday_closeTime);
        break;
      case 3: // Wednesday
        timeSlots = this.generateTimeSlots(wednesday_openTime, wednesday_closeTime);
        break;
      case 4: // Thursday
        timeSlots = this.generateTimeSlots(thursday_openTime, thursday_closeTime);
        break;
      case 5: // Friday
        timeSlots = this.generateTimeSlots(friday_openTime, friday_closeTime);
        break;
      case 6: // Saturday
        timeSlots = this.generateTimeSlots(saturday_openTime, saturday_closeTime);
        break;
      default:  // Default to Monday
        timeSlots = this.generateTimeSlots(monday_openTime, monday_closeTime);
        break;
    }
    this.setState({ timeSlots });
}

  generateTimeSlots(openTime, closeTime) {
    const timeSlots = [];
    const openHour = parseInt(openTime.split(":")[0]);
    const closeHour = parseInt(closeTime.split(":")[0]);

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
    // console.log("Time slot selected in calender:", timeSlot);
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
          disabledDates={this.state.disabledDates}
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
