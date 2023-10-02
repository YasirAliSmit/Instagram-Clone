import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
interface Style {
    placeHolderImage:ImageStyle,
    container:ViewStyle
}

const createPostStyle = StyleSheet.create<Style>({
    placeHolderImage:{
        width:wp('25%'),
        height:wp('25%'),
        resizeMode:'contain',
        marginLeft:wp('1%')
    },
    container:{
        marginVertical:hp('2%')
    }
})
export default createPostStyle ;