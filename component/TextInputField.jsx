import React from 'react';
import { View, Text, TextInput } from 'react-native';

const TextInputField = ({ label, placeholder, keyboardType, multiline, onChangeText,value}) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text>{label}</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = {
  inputContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
  },
};
export default TextInputField;
