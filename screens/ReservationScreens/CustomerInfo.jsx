import React, { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, KeyboardAvoidingView, Modal, Alert} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextInputField from '../../component/TextInputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reservationData from '../../reservationData.json';
import commonStyles from '../../styles/commonStyles'; 
import {fetchUserData} from '../../apiCalls/userData';


const CustomerInfo = ({ navigation, route }) => {
  
  const { 
    restaurantId,
    tableId,
    tableNumber,
    selectedDate,
    selectedTimeSlot,
    reservationDuration,
    noOfGuests,
    restaurantData
    } = route.params;
    console.log('Reservation data here:', selectedDate);


    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [specialNotes, setSpecialNotes] = useState('');
    const [title, setTitle] = useState('Mr.');
    const [isTitlePickerVisible, setIsTitlePickerVisible] = useState(false);
    const [userId, setUserId] = useState(null);
    

    useEffect(() => {
      getUserData();
  }, []);
  
  const getUserData = async () => {
      try {
          const userId = await AsyncStorage.getItem('userId');
          console.log('User ID:', userId);
          if (userId) {
              const userDataJSON = await AsyncStorage.getItem('userData');
              if (userDataJSON) {
                  const userData = JSON.parse(userDataJSON);
                  console.log('User data:', userData);
                  // Assuming userData contains firstName, lastName, email, and phoneNumber
                  setFirstName(userData.firstName || ''); 
                  setLastName(userData.lastName || '');
                  setEmail(userData.email || ''); 
                  setPhoneNumber(userData.phoneNumber || ''); 
              }
          }
      } catch (error) {
          console.error('Error retrieving user data:', error);
      }
  };
  

  const toggleTitlePicker = () => {
    setIsTitlePickerVisible(!isTitlePickerVisible);
  };
  
  const handleNextPress = () => {
    if (!firstName || !lastName || !email || !phoneNumber) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number format
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      Alert.alert('Please enter a valid phone number.');
      return;
    }
    // Proceed to the next screen
    navigation.navigate('Confirmation', { 
      restaurantId,
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
    });
  };

  return (
    <View style={{ padding: 16,  width: '100%',height: '100%' }}>
      <KeyboardAvoidingView  style={{ flex: 3, alignItems: 'center', marginTop:16, marginBottom:20 }} behavior="padding">
        <ScrollView style={{ width: '100%' }}>
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="wpforms" size={22} color="black" style={[{marginRight: 10}, commonStyles.icon]} />
              <Text style={commonStyles.subHeaderText}>Customer information</Text>
            </View>
            {/* title */}
              <View>
                <Text>Title*</Text>
              </View>
              <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.inputContainer} onPress={toggleTitlePicker}>
              <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          </View>
            <Modal 
            visible={isTitlePickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleTitlePicker}
            >
              <View style={styles.pickerContent}>
                <Picker
                  selectedValue={title}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => {
                    setTitle(itemValue);
                    setIsTitlePickerVisible(false);
                  }}
                >
                  <Picker.Item label="Mr." value="Mr." />
                  <Picker.Item label="Mrs." value="Mrs." />
                  <Picker.Item label="Ms." value="Ms." />
                  <Picker.Item label="Not Specified" value="Not Specified" />
                </Picker>
              </View>
            </Modal>
            {/* fname, lname,email,phone */}
            <TextInputField 
              label="First Name*" 
              placeholder="First Name" 
              keyboardType="default"
              onChangeText={text => setFirstName(text)}
              value={firstName}
            />
            <TextInputField 
              label="Last Name*" 
              placeholder="Last Name" 
              keyboardType="default" 
              onChangeText={text => setLastName(text)}
              value={lastName}
            />
            <TextInputField 
              label="Email*" 
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              value={email ? String(email) : ''}
             />
            <TextInputField 
              label="Phone Number*"
              placeholder="Phone Number" 
              keyboardType="phone-pad"
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber ? String(phoneNumber) : ''}
              />

            <TextInputField 
            label="Special Notes (optional)"
              placeholder="Special Requests, Allergies, etc."
              keyboardType="default" 
              multiline
              onChangeText={text => setSpecialNotes(text)}
              />
          </View>
      
        </ScrollView>

      </KeyboardAvoidingView>
      <TouchableOpacity
            style={commonStyles.button}
            // onPress={handleNextPress}
            onPress={handleNextPress}

          >
            <Text style={commonStyles.buttonText}>Next</Text>
          </TouchableOpacity>
    </View>

  );
};

const styles = {
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  pickerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: '80%',
    backgroundColor: 'white',
  },
};

export default CustomerInfo;
