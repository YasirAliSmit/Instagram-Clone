import React from 'react';
import { Text, } from 'react-native';
import {Sigin,Bottomtabnavigation, Login} from './src/components/index'
import{ StackNavigator }from './src/components/index';
import AuthNavigation from './src/navigation/authNavigation/authNavigation';
const App = () => {
  return(  <>
 <AuthNavigation/>
  </>
)
};

export default App;

