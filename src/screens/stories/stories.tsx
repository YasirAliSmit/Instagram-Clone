import {StyleSheet, View, Image, Text, FlatList} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useEffect, useState} from 'react';
import {storySty} from '../../components';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {StoriesItem, userData} from '../../components';
const Stories: React.FC = () => {
  const usersCollection = firestore().collection('Users');
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      await firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          const userDataArray = querySnapshot.docs.map(doc => doc.data());
          setStatus(userDataArray as any);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };
    getUser();
  }, []);

  return (
    <View className="mt-2">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={status}
        renderItem={({item}) => (
          <StoriesItem
            id={(item as any).uid}
            image={(item as any).profilePicture}
            title={(item as any).username}
          />
        )}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({});
