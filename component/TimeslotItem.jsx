import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TimeSlotItem({ timeSlot, isSelected, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]} 
      onPress={onPress}
    >
      <Text style={styles.timeSlotText}>{timeSlot}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeSlot: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#00adf5',
  },
  timeSlotText: {
    fontSize: 16,
  },
});
