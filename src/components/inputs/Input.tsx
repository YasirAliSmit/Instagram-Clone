import {StyleSheet, Text,View, TextInput,TouchableOpacity} from 'react-native';
import React from 'react';
import {TextInputProps} from '../../types/headertype';
import inputStyle from './style';
const Input: React.FC<TextInputProps> = ({
  placeHolder,
  value,
  onChangeText,
  keyboardType,
  textContentType,
  secureTextEntry
}) => {

  return (
    <View >
      <TextInput
        style={inputStyle.TextInputs}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize='none'
        keyboardType={keyboardType}
        textContentType={textContentType}
        autoFocus={true}
        secureTextEntry={secureTextEntry}
      />
     
    </View>
  );
};

export default Input;
