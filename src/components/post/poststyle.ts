import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Style {
  profileImage: ImageStyle;
  userTitle: TextStyle;
  dots: TextStyle;
  postImage: ImageStyle;
  icons: ImageStyle;
  heart:ViewStyle
}
const PostStyle = StyleSheet.create<Style>({
  profileImage: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'cover',
    borderRadius: wp('8%'),
    borderWidth:wp('0.5%'),
        borderColor:'rgba(255, 165, 0, 1)'
   // backgroundColor:'red'
  },
  userTitle: {
    fontFamily: 'OpenSans_Condensed-Bold',
    fontSize: hp('1.5%'),
    color: 'white',
    fontWeight: 'bold',
    // alignItems:'center'
  },
  dots: {
    fontSize: hp('2%'),
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
  },
  postImage: {
    width: wp('100%'),
    height: hp('30%'),
    resizeMode: 'contain',
  },
  icons: {
    width: wp('6%'),
    height: hp('6%'),
    resizeMode: 'contain',
marginHorizontal:1,


  },heart:{
    marginTop:hp('1.9%')
    ,marginHorizontal:1,
  }
});
export default PostStyle;
