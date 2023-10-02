import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
interface Style {
    buttonContainer:TextStyle
}
const style = StyleSheet.create({
    buttonContainer:{
        width:wp('90%'),
        height:hp('5%'),
        backgroundColor:'#12B0E8',
        borderRadius:wp('2%'),
        alignSelf:'center',
        justifyContent:'center'
    }
})
export default style