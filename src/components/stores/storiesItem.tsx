import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {userStories} from '../../types/headertype';
import {storySty} from '../index'
const StoriesItem: React.FC<userStories> = ({id, image, title}) => {

  return (

    <View style={{marginLeft: 6,marginTop:0,zIndex:100}}  className="flex-col items-center ">
      <Image
        source={{uri: image}}
        style={storySty.Image}
      />
      <Text className='mb-2 mt-1' style={storySty.title} >{title.length>10?title.slice(0,10).toLowerCase()+'..':title.toLowerCase()}</Text>
    </View>
  );
};

export default StoriesItem;

const styles = StyleSheet.create({});
