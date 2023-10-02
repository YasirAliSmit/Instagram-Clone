import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../components/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Sigin = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const navigation: any = useNavigation();
  const getRandomProfileImage = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
    //console.log(object);
  };
  const handleLogIn = async () => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.log('write email');
      if (userName.length > 5) {
        setUserNameError('');
        if (password.length > 6) {
          setErrorPassword('');
          console.log(userName, email, password);
          try {
            const authUser = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            console.log('User account created & signed in!');
            navigation.navigate('Login');
            Alert.alert('User account created & signed in!');
            //console.log('hello', authUser.user.uid,authUser.user.email,userName,getRandomProfileImage());
            const fireStore = await firestore()
              .collection('Users')
              .doc(email)
              .set({
                user_uid: authUser.user.uid,
                username: userName,
                email: authUser.user.email,
                profilePicture: await getRandomProfileImage(),
              });

          } catch (error) {
            if (error === 'auth/email-already-in-use') {
              setEmailError('That email address is already in use!');
            } else if (error === 'auth/invalid-email') {
              setEmailError('That email address is invalid!');
            }

            console.error(error);
          }
        } else {
          setErrorPassword('Password Langht should greater than 6');
        }
      } else {
        setUserNameError('Kindly Enter Your Name');
      }
      setEmailError('');
    } else {
      setEmailError('Wrong Email');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Image
          style={styles.logo}
          source={require('../../assets/images/instagramicon.png')}
        />
        <View className="mt-5">
          <Input
            placeHolder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="email address"
            secureTextEntry={false}
          />
          <Text className="absolute text-red-500 top-7 left-3 text-[10px]">
            {emailError}
          </Text>
        </View>
        <View className="mt-2">
          <Input
            placeHolder="User Name"
            value={userName}
            onChangeText={setUserName}
            keyboardType="Enter Your Name"
            textContentType="User Name"
            secureTextEntry={false}
          />
          <Text className="absolute text-red-500 top-7 left-3 text-[10px]">
            {userNameError}
          </Text>
        </View>
        <View className="mt-2">
          <Input
            placeHolder="Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="Password"
            textContentType="Password"
            secureTextEntry={true}
          />
          <Text className="absolute text-red-500 top-7 left-3 text-[10px]">
            {errorPassword}
          </Text>
        </View>
        <View className="mt-10">
          <Button title="Sign Up" event={() => handleLogIn()} />
          <Text className="text-center mt-8 text-1xl text-black">
            Already have an account ?
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="color-[#12B0E8] "> LogIn</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Sigin;
const styles = StyleSheet.create({
  logo: {
    width: wp('30%'),
    height: hp('15%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: hp('20%'),
  },
});
