import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Style {
    Image:ImageStyle,
    title:TextStyle
}
const storySty = StyleSheet.create<Style>({
    Image:{
        width:hp('7%'),
        height:hp('7%'),
        resizeMode:'cover',
        borderRadius:hp('7%'),
        borderWidth:wp('1%'),
        borderColor:'rgba(255, 165, 0, 1)'
    },
    title:{
        fontFamily:'OpenSans_Condensed-Bold',
        fontSize:hp('1.2%'),
        color:'white',
        width:'100%',
        fontWeight:'bold',
        textAlign:'center',
    }
})
export default storySty