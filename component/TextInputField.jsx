import React from 'react';
import { View, Text, TextInput } from 'react-native';

const TextInputField = ({ label, placeholder, keyboardType, multiline }) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text>{label}</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 5, minWidth: 150, minHeight: 40 }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
};

export default TextInputField;
