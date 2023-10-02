import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Bubble, InputToolbar, GiftedChat} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect, useCallback} from 'react';
import {Messages} from '../../types/headertype';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
Entypo.loadFont();
const Chat: React.FC = () => {
  const {data}: any = useRoute().params || undefined;
  const uid: any = auth().currentUser?.uid;
  console.log('this is other uid ', data.user_uid);
  const naviagtion: any = useNavigation();
  const [messages, setMessages] = useState<Messages[]>();
  // const docid =
  //   data.user_uid > uid ? uid + '-' + data.user_uid : data.user_uid + '-' + uid;
  const uniqueUid =
    uid! > data.user_uid
      ? data.user_uid + '-' + uid
      : uid + '-' + data.user_uid;
  const getmessages = () => {
    firestore()
      .collection('chatrooms')
      .doc(uniqueUid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allmsg = snapshot?.docs?.map(doc => {
          const data = doc.data();
          if (data.createdAt) {
            return {
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate(),
            };
          } else {
            return {
              ...doc.data(),
              createdAt: new Date(),
            };
          }
        });
       // console.log('hello>>>>>', allmsg);
         setMessages(allmsg as Messages[]);
      });
  };
  useEffect(() => {
    getmessages();
    console.log('this is user',data.user_uid);
    console.log('this my uid ',uid);
  }, []);
  const onSend: any = useCallback((messages = []) => {
    const msg: any = messages[0];
    const myMsg = {
      ...msg,
      sentBy: uid,
      sentTo: data.user_uid,
      createdAt: new Date(),
      user: {
        _id: data.user_uid,
        avatar: data.profilePicture,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    firestore()
      .collection('chatrooms')
      .doc(uniqueUid)
      .collection('messages')
      .add({...myMsg, createdAt: firestore?.FieldValue?.serverTimestamp()});
    //sendNotification(userData.fcmToken, currentUsername, msg.text);
  }, []);
  const renderHeader = () => (
    <View className="w-full flex-row justify-between mt-10 px-3">
      <TouchableOpacity onPress={() => naviagtion.goBack()}>
        <Ionicons name="arrow-back" size={30} color={'#2750fe'} />
      </TouchableOpacity>
      <Text className="text-2xl text-white">{data.username}</Text>
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={25} color={'#2750fe'} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View className="flex-1 bg-black ">
    
<Header left={renderHeader}/>
      {/* <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={{
            _id: data.user_uid!,
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  left: {
                    color: 'white',
                  },
                }}
                wrapperStyle={{
                  right: {
                    backgroundColor: '#AB43F9',
                    marginTop: 10,
                  },
                  left: {
                    backgroundColor: '#3A355A',
                    marginTop: 10,
                  },
                }}
              />
            );
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                placeholderTextColor="#fff"
                containerStyle={{
                  backgroundColor: '#282734',
                  borderRadius: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0,
                  borderTopColor: 'black',
                }}
                textInputStyle={{color: '#fff'}}
                placeholder="Message.."
              />
            );
          }}
        /> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
