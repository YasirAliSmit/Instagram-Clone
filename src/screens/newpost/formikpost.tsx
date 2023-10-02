import {Image, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {createPostStyle} from '../../components/index';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
const Formikpost = () => {
  const placeHolderImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXf39+goKDe3t6dnZ3i4uKmpqabm5vS0tLV1dW3t7fLy8vDw8O6urqqqqqioqLKysqwsLA0gLe7AAAE+ElEQVR4nO2di3KDIBBFCaB5iv7/15aLihCNtcmAKd470+Yh4npcloVIIuQGiS2FNlQjwoeP69lcfL6/iLaIvkoR6JeDokRfbDwlX6WQi7sP1YfWPB9PPGmxgtj2uGxcj1yvaConZzXFZoSPT7VP+84rGV9GcKPK3XMd2Y+Xz3ik/++vQ3y1liyeTjM66dDy6XSDFyI2cH5VIk9Z3B7sGNJaLrlUzeuSwzUe/ma7y/jc1ixcrloIsbV8ySKDVXc9jMiADCDGAzKANnemBYsIGBMh+gEF0Q3IAGI8YH4AEYFgQBBEALEtCDqCIAKIDBgPICIAA314DIcHIMgAIgMygMiA+QFEBGQAsS1wPhEigv6uwb1t2FtkQAYQGZABRAZkADE/wHiBEMiADCASEIQgiABi30g/gNgvkAFEBmQAkQEZQGTgGOi9bdhb9AIygDhe4GeuUHIG+nOlNTB9W9CPj3W9pDUxeUzUplZOtZUKFb6uVbzNv+3+nxPbmJxBdYLM6X2pIhgsXeONKoWB6q5vKwuD1DHRMqhv7/cJphAG6vb27jITg6QUdKUsg7e6eGdaUQwuf5cojIG+23Sg/otUlZFBUg0MpL6rv+YFTUkMahsTLYMhTzLB32pq1GD/LAwS17/AwNicyRJQv1BwDPL0C4nr7xnYmOgZ2JO6nqW83Kv11pGPQWrNGChlzhrrCbW81t/BIFdbCPzgrIcv3NTNqicUFw8mP7hOi0ovtVmJCQUzuExJo26+wg9SQxgYSN8vGP9NrvbNh/oGP8jBQIV9YxV8Ae564lRUjhQxOIUMrpEfmP0YZBgvBAyQOPuNZjpvVVV7tYWsDIy/vP22tja+MajrTc0ZlDN/0AYx8aQeuj+kvoQnbROpp8SxLD+IGJi6k26arI1PWcItwqBQMgObLnf3+8PUYQxUnXZlg/dKZmCGyfbQCRTGFE+eUdR4QcXjhQUZpdy1CLsGla9vTFz/NgauKUg4gjksAzQFKfwnc55BtniQVFv9oDcjTJ5z+kFaCPNcOQ4ECJF2Qzckj0gZxnIZx867MnAUbMpwG60JRtPHYWDP8VTXozVhYzgOA1XXXTuZcdmBQWqNcyjzmGhcxqi61t0kOvy8jhCNzxXLnUsLPcABiD+P1Xc/2VxU3/iCwegB/e8ujXZMjSEjg/TxYImBqpwHLBzdT7gXxUBFc6ruQTWvDjs1hqLaAsaNkR8YVb06rJwaQ1lzqtHYGQiatQUDTXYGieuftYWhIbz0AynaukQ/iO7BMK9jwbCLm1w1hcWDWzgi/A2Bm0ZQp7zzykk1tYXxvuVfELjP4FoUrkRJDFo7Mj7fB20ZoegbSuJZKQzceMEvZIiO/no/3adQp0L6BTAIftZ3o/qyuHupCD9oewcIbjwY3GFpkUroLFpn8YMc8eBxe1ulMPhs/YIpIh58KDIogUFnqk/13+OB7QyWlyz68P8F6xtTH2D2s/Phr6wvbX9+L7mBXPMt/sWa7+QW/gMGycXvEiUDiAzIACIDMoDIgPkBRAT0A4jfj0QGELsFMoDIgH0jRAZkALFvdDHx8BDYL0R3Ch9WbAtsCxAZkAFEBpxHgjivTAYQGTAeQBw30g8gMiADiAw4eQCRAdsCRARkAJEB4wHEcSMZQGTAeADRDcgAIgPmSE6EQASCDCAyYI4EEQH9AMqzuv67RQRsCxARkIHVD9yhN0e3gqRsAAAAAElFTkSuQmCC`;
  const [thumnailUrl, setThumnailUrl] = useState<any>(placeHolderImage);
  const [currentUserLoggedInUser, setCurrentUserLoggedIn] = useState<any>(null);
  const [caption, setCapion] = useState<string>('');
  const navigation = useNavigation();
  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const unsubcribe = firestore()
      .collection('Users')
      .where('email', '==', user?.email)
      .limit(1)
      .onSnapshot(snapShot =>
        snapShot.docs.map(doc => {
          setCurrentUserLoggedIn({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture,
          });
        }),
      );
   
    return unsubcribe;

  };
  useEffect(() => {
    getUserName();
  }, []);
  const handleGetImage = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0,
    });
    const data: any = new FormData();

    let newFile = {
      uri: result.assets[0].uri,
      type: 'test/png',
      name: `test/${result.assets[0].uri?.split('.')[1]}`,
    };

    data.append('file', newFile);
    data.append('upload_preset', 'yasirImage');
    data.append('cloudname', 'yasir123');
    fetch('https://api.cloudinary.com/v1_1/yasir123/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data =>
        console.log('this is function', setThumnailUrl(data.secure_url)),
      )
      .catch(error => console.log('this is errro', error));
  };

  const uploadPostFirebase = (caption: string) => {
    
  
    // Check if these variables are defined before using them
    if (!thumnailUrl || !currentUserLoggedInUser || !firebase.auth().currentUser) {
      console.error('Some required variables are undefined.');
      return; // Return early or handle the error appropriately
    }
  
   

    
    const unsubribe = firestore()
      .collection('Users')
      .doc(auth().currentUser?.email||undefined)
      .collection('Posts')
      .add({
        imageUrl: thumnailUrl,
        user: currentUserLoggedInUser?.username,
        profile_picture: currentUserLoggedInUser?.profilePicture,
        owner_uid: firebase.auth().currentUser?.uid,
        ower_email:firebase.auth().currentUser?.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        comments: [],
      })
      .then(() => {
        navigation.goBack();
        setCapion('')
        setThumnailUrl('')
      });
  
    return unsubribe;
  };

  const uploadPostSchema = Yup.object().shape({
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
  });

  return (
    <View className="flex-1">


      <View style={createPostStyle.container} className="flex-row border-b-[1px] border-slate-100" >
        <TouchableOpacity onPress={() => handleGetImage()}>
          <Image
            source={{uri: thumnailUrl ? thumnailUrl : placeHolderImage}}
            //style={{width: 100, height: 100}}
            style={createPostStyle.placeHolderImage}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Write a captions"
          placeholderTextColor={'gray'}
          className="self-start text-white text-[15px]	mx-2 mt-4"
          multiline={true}
          value={caption}
          onChangeText={setCapion}
        />
      </View>
      <Button
        title="Submit"
        onPress={() => {
          uploadPostFirebase(caption);
        }}
        color={'white'}
 
/>
    </View>
  );
};

export default Formikpost;

const styles = StyleSheet.create({});
