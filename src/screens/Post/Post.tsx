import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PostItem, postData} from '../../components';
import {FlashList} from '@shopify/flash-list';
import firestore from '@react-native-firebase/firestore';
const Post: React.FC = ({route}: any) => {
  const [post, setPost] = useState<any>([]);
  const getUserPost = () => {
    firestore()
    .collectionGroup('Posts')
    .onSnapshot(snapShot => {
      setPost(snapShot?.docs.map(doc => ({id: doc.id, ...doc.data()})));
    });
  }
  useEffect(() => {
   getUserPost()
  }, []);
  return (
    <View className="flex-1 ">
      <FlashList
        data={post}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <PostItem
            id={(item as any).id}
            owner_email={(item as any).ower_email}
            imageUrl={(item as any).imageUrl}
            user={(item as any).user}
            likes={(item as any).likes}
            profile_picture={(item as any).profile_picture}
            comments={(item as any).comments}
            caption={(item as any).caption}
            likes_by_users={(item as any).likes_by_users}
          />
        )}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
