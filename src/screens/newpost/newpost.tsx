import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header, styles, Formikpost} from '../../components/index';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
Ionicons.loadFont();
const Newpost: React.FC = ({route}: any) => {
  const {showIcon} = route.params;
  const navigation:any = useNavigation()
 
  const NewPostHeader = () => (
    <View className="flex-row">
      <View className="ml-3">
        {showIcon == true ? (
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Ionicons name={'chevron-back-outline'} size={25} color={'white'} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="mx-auto">
        <Text className="text-white text-[15px] self-center	 font-bold  ">
          New Post
        </Text>
      </View>
    </View>
  );
  const Createpost = () => (
    <SafeAreaView className="w-[100%]" style={styles.header}>
      <View className="w-full h-full bg-black">
        <NewPostHeader />
        {/* formik post uploader */}
        <Formikpost />
      </View>
    </SafeAreaView>
  );
  return (
    <View className="flex-1">
      <Header right={() => false} left={() => false} post={Createpost} />
      {/* { formik post uploader Post form} */}
    </View>
  );
};

export default Newpost;
