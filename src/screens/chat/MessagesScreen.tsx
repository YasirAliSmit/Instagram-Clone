import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Stories} from '../../components';
import {headerProps} from '../../types/headertype';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FlatList, TextInput} from 'react-native-gesture-handler';
const MessagesScreen: React.FC<headerProps> = () => {
  const navigation: any = useNavigation();
  EvilIcons.loadFont();
  Feather.loadFont();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          const userDataArray = querySnapshot.docs.map(doc => doc.data());
          setUser(userDataArray as any);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };
    getUser();
  }, []);

  const renderRight = () => {
    const [user, setUser] = useState('');
   
   
    useEffect(() => {
      const getUser = async () => {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.email || undefined)
          .get()
          .then(doc => {
            if (doc.exists) {
              const userData: any = doc.data();
              //console.log('current User login data',userData);
            //setCurrentUserUid(userData.user_uid);
              const username = userData.username;
              setUser(username);
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.error('Error getting user document:', error);
          });
      };
      getUser();
    }, []);
    return (
      <View className="flex-1">
        <View className="mt-6 flex-row justify-between items-center">
          <View className="flex-row items-center mt-3">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name={'left'} size={30} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.text} className="text-white font-bold">
              {user}
            </Text>
          </View>

          <View className="mr-3">
          
              <Ionicons
                name={'chatbubbles-outline'}
                size={30}
                color={'white'}
              />
        
          </View>
        </View>
      </View>
    );
  };
  const renderSearch = () => (
    <View className="bg-[#2a2a2d] w-11/12 h-10 mt-4 mb-4 rounded-2xl flex-row mx-auto">
      <View className="my-auto">
        <EvilIcons name="search" size={30} color={'grey'} />
      </View>
      <TextInput
        placeholderTextColor="grey"
        className="text-grey my-auto"
        value={search}
        onChangeText={setSearch}
        placeholder="Search for friends"
      />
    </View>
  );
  const renderMiddle = () => (
    <View className="flex-row justify-between w-full">
      <TouchableOpacity>
        <Text className="font-bold text-white text-lg">Messeges</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="font-bold text-white text-sm text-blue-700">
          Recent
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View className="flex-1 bg-black">
      <Header right={renderRight} />
      <Header search={renderSearch} />
      <Stories />
      <Header middle={renderMiddle} />
      <FlatList
        data={user}
        renderItem={({item}) => (
          <View className="w-full w-[100%] flex-row justify-between">
            <View className=" flex-row items-center mx-2 my-2">
              <TouchableOpacity onPress={()=>navigation.navigate('Chat',{"data":item})}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: (item as {profilePicture: string}).profilePicture,
                  }}
                />
              </TouchableOpacity>
              <View className="flex-col">
                <Text className="text-white mx-2 text-[15px] font-bold">
                  {(item as {username: string}).username}
                </Text>
                <Text className="text-white mt-3 mx-2 text-[12px] ">
                  Active Today
                </Text>
              </View>
            </View>
            <View className="mt-6 mr-2">
              <Feather name="camera" color={'white'} size={25} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  text: {
    marginLeft: wp('5%'),
  },
  profileImage: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: hp('7%'),
  },
});
