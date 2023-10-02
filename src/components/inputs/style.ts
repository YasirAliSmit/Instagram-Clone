import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface Style {
  TextInputs: TextStyle;
  buttonText:TextStyle;
}
const inputStyle = StyleSheet.create<Style>({
  TextInputs: {
    width: wp('95%'),
    height: hp('5%'),
    borderColor: 'rgba(0, 0, 0,0.2)',
    borderWidth: 1,
    borderRadius: wp('1px'),
    alignSelf: 'center',
    paddingLeft:wp('2%')
  },
  buttonText:{
    
  },
});
export default inputStyle;
