import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, styles, Stories, Post} from '../../components/index';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    firestore()
      .collectionGroup('posts')
      .onSnapshot(snapShot => {
        snapShot.docs.map(doc => doc.data());
      });
  }, []);
  const hideLoader = () => {
    setShowLoader(false);
  };
  setTimeout(hideLoader, 3000);
  const renderRight = () => {
    return (
      <View style={styles.rightIconsContainer}>
        <StatusBar backgroundColor={'black'} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Newpost', {showIcon: true})}>
          <Image
            style={styles.sumIcon}
            source={require('../../assets/images/sum.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.heartIcon}
            source={require('../../assets/images/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <View style={styles.readBadge}>
            <Text style={styles.readBadgeText}>12</Text>
          </View>
          <Image
            style={styles.facebookIcon}
            source={require('../../assets/images/facebook.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderLeft = () => {
    return (
      <View>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../../assets/images/in.webp')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.header}>
      {showLoader ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" hidesWhenStopped={showLoader} />
        </View>
      ) : (
        <>
          <Header right={renderRight} left={renderLeft} post={() => false} />
          <Stories />
          <Post />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
