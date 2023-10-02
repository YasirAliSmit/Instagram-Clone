import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../index';
import {headerProps} from '../../types/headertype';
const Header: React.FC<headerProps> = ({
  right,
  left,
  post,
  search,
  middle,
  messageHeader,
}) => {
  const emptyFuntion = () => {
    return <></>;
  };
  return (
    <View style={styles.headerIconContainer}>
      {left ? left() : emptyFuntion()}
      {right ? right() : emptyFuntion()}
      {post ? post() : emptyFuntion()}
      {search ? search() : emptyFuntion()}
      {middle ? middle() : emptyFuntion()}
      {messageHeader ? messageHeader() : emptyFuntion()}
    </View>
  );
};

export default Header;
