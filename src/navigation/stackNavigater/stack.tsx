import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Sigin, Postplus, Bottomtabnavigation,Chat,MessagesScreen} from '../../components';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
export const SignOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sigin" component={Sigin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const SignInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bottom" component={Bottomtabnavigation} />
        <Stack.Screen name="Postplus" component={Postplus} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
