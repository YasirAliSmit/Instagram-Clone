import {
  StyleSheet,
  Text,

  View,
  SafeAreaView,
  Image,
  Alert,StatusBar
} from 'react-native';
import React, {useState} from 'react';
import {Input, Button} from '../../components/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorPassword, setPasswordError] = useState('');
  const navigation: any = useNavigation();
  const handleLogIn = () => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.log('write email');
      setError('');
      if (password.length > 6) {
        console.log('write password');
        setPasswordError('');
        console.log(email, password);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            Alert.alert('You are LogIn successfully');
            setEmail('');
            setPassword('');
            navigation.navigate('Bottom');
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      } else {
        setPasswordError('Wrong Password Length should be greater than 6');
      }
    } else {
      console.log('wrong email');
      setError('Invalid Email');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View className="flex-1">
        <StatusBar backgroundColor={'white'}/>
        <Image
          style={styles.logo}
          source={require('../../assets/images/instagramicon.png')}
        />
        <View className="mt-4">
          <Input
            value={email}
            onChangeText={setEmail}
            placeHolder="Phone Number,username or email"
            keyboardType="email-address"
            textContentType="email address"
            secureTextEntry={false}
          />
          <Text className="ml-5 text-red-500 font-bold text-[12px]">
            {error}
          </Text>
        </View>

        <View className="mt-4">
          <Input
            value={password}
            onChangeText={setPassword}
            placeHolder="Enter Your Password"
            keyboardType="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <Text className="ml-5 text-red-500 font-bold text-[12px]">
            {errorPassword}
          </Text>
        </View>
        <Text className="color-[#12B0E8] self-end font-[5px] mt-1 mb-8 mr-3">
          Forgat Password?
        </Text>
        <Button title="Login" event={handleLogIn} />
        <View className='items-center'>
          <Text className="text-center mt-8 text-1xl text-black">
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('Sigin')}>
              <Text className="color-[#12B0E8] ">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: wp('30%'),
    height: hp('15%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: hp('20%'),
  },
});
