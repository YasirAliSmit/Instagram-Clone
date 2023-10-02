import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {postType} from '../../types/headertype';
import PostStyle from './poststyle';
import {FlashList} from '@shopify/flash-list';
import {firebase} from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
const PostItem: React.FC<postType> = ({
  id,
  imageUrl,
  user,
  likes,
  profile_picture,
 owner_email,
  comments,
  caption,
  likes_by_users,
}) => {
  const renderFooter = () => (
    <Text className="text-slate-400 mx-2 text-[12px] hover:text-sky-400 mb-2">
      View All Comments
    </Text>
  );

  const renderItem = ({item}: any) => (
    <View className="flex-1">
      <Text className=" mx-1 text-sm text-[12px] text-white font-bold">
        {item.user}:{item.comment}
      </Text>
    </View>
  );
  const convertNumberToK = likes => {
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + 'k';
    } else {
      return likes.toString() + ` likes`;
    }
  };
  const handleLike = () => {
   // console.log(id,'this is id');
    const currentLikeStatus = !likes_by_users.includes(
      firebase.auth().currentUser?.email,
    );
    firebase
      .firestore()
      .collection('Users')
      .doc(owner_email)
      .collection('Posts')
      .doc(id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser?.email,
            )
          : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser?.email),
      }).then(()=>console.log('doc update')).catch(error=>console.log('not updata like doc',error))
  };

  return (
    <View className="flex-1 border-t-[1px] border-slate-300	mt-1 w-full">
      <View className="flex-row justify-between py-2 ">
        <View className="flex-1 flex-row ">
          <Image
            style={[PostStyle.profileImage, id == '0' ? {marginTop: 1} : null]}
            source={{uri: profile_picture}}
          />
          <Text className="my-auto  mx-1" style={PostStyle.userTitle}>
            {user.length > 10 ? user.slice(0, 10) + '..' : user}
          </Text>
        </View>

        <Text className="my-auto" style={PostStyle.dots}>
          ...
        </Text>
      </View>
      <View>
        <Image
          style={PostStyle.postImage}
          className=""
          source={{uri: imageUrl}}
        />
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row">
          <TouchableOpacity onPress={() => handleLike()}>
            <AntDesign
              style={PostStyle.heart}
              name={likes_by_users.includes(firebase.auth().currentUser?.email)?'heart':'hearto' }
              color={likes_by_users.includes(firebase.auth().currentUser?.email)?'red':'white'}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={PostStyle.icons}
              source={require('../../assets/images/comment.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={PostStyle.icons}
              source={require('../../assets/images/send.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            style={PostStyle.icons}
            source={require('../../assets/images/save.png')}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 w-[100%]">
        <Text className=" ml-2 text-sm text-[13px] text-white font-bold">
          {/* {Here is Like code} */}
          {convertNumberToK(likes_by_users.length)}
        </Text>
        <Text className=" mx-1 text-sm text-[12px] text-white font-bold">
          {user}:{caption}
        </Text>
    
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({});
