import {Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  Search,
  Newpost,
  Video,
  User,
  StackNavigator,
} from '../../components';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
AntDesign.loadFont();
Foundation.loadFont();
Feather.loadFont();
const Bottomtabnavigation: React.FC = ({route}: any) => {
  const navigation: any = useNavigation();
  const Tab = createBottomTabNavigator();
  let visibleBottomTab = true;
  const [currentUserImage,setCurrentUserImage] = useState('')
  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    Alert.alert('You are Signout');
  };
  console.log(
    firestore()
      .collection('Users')
      .where('email', '==', auth().currentUser?.email)
      .onSnapshot(image =>
        image.docs.map(doc => setCurrentUserImage( doc.data().profilePicture)),
      ),
  );
  return (
    <Tab.Navigator
      screenOptions={route => ({
        tabBarStyle: {backgroundColor: 'black'},
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#808080',
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="home" color={color} size={25} />
          ),
        }}
        component={HomeScreen}
        initialParams={{showIcon: false, visibleBottomTab}}
      />
      <Tab.Screen
        name="search"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" color={color} size={25} />
          ),
        }}
        component={Search}
        initialParams={{showIcon: false, visibleBottomTab}}
      />
      <Tab.Screen
        name="Newpost"
        options={{
          tabBarStyle: {display: 'flex', backgroundColor: 'black'},
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="plussquareo" color={color} size={25} />
          ),
        }}
        //here is new Post screen
        component={Newpost}
        initialParams={{showIcon: false, visibleBottomTab}}
      />
      <Tab.Screen
        name="video"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Foundation name="play-video" color={color} size={25} />
          ),
        }}
        component={Video}
        initialParams={{showIcon: false, visibleBottomTab}}
      />
      <Tab.Screen
        name="user"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <TouchableOpacity onPress={() => handleLogOut()}>
              <Image
                className="w-8 h-8 rounded-3xl"
                source={{
                  uri:currentUserImage
                }}
              />
            </TouchableOpacity>
          ),
        }}
        component={User}
        initialParams={{showIcon: false, showBottomTab: true}}
      />
    </Tab.Navigator>
  );
};

export default Bottomtabnavigation;

const styles = StyleSheet.create({});
