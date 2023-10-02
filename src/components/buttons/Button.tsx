import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {buttonTypes} from '../../types/headertype';
import style from './style';
const Button: React.FC<buttonTypes> = ({title, event}) => {
  return (
    <View>
      <TouchableOpacity style={style.buttonContainer} onPress={() => event()}>
        <Text className="text-white text-center text-1xl font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
