import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Style = {
  header: ViewStyle;
  headerIconContainer: ViewStyle;
  logo: ImageStyle;
  sumIcon: ImageStyle;
  heartIcon: ImageStyle;
  facebookIcon: ImageStyle;
  rightIconsContainer: ViewStyle;
  readBadge: ViewStyle;
  readBadgeText:TextStyle
};
 const styles = StyleSheet.create<Style>({
  header: {
    backgroundColor: 'black',
    flex: 1,
    padding:wp('1%'),
   
  },
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginHorizontal: wp('1%'),
    alignContent: 'center',
  },
  logo: {
    width: wp('30%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  sumIcon: {
    tintColor: 'white',
    width: wp('8%'),
    height: hp('5%'),
    resizeMode: 'contain',
    marginHorizontal: wp('1%'),
  },
  heartIcon: {
    tintColor: 'white',
    width: wp('8%'),
    height: hp('5%'),
    resizeMode: 'contain',

    marginHorizontal: wp('1%'),
  },
  facebookIcon: {
    tintColor: 'white',
    width: wp('8%'),
    height: hp('5%'),
    resizeMode: 'contain',

    marginHorizontal: wp('1%'),
  },
  readBadge: {
    backgroundColor:'red',
    position:'absolute',
    padding:wp('0.5%'),
    borderRadius:wp('2%'),
    left:wp('5%')
  },
  readBadgeText:{
    color:'white',
    fontSize:hp('1.5%'),
    fontWeight:'bold',
    fontFamily:'OpenSans-MediumItalic.ttf'
  }
});
export default styles ;