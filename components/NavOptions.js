import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import {TouchableOpacity, Image} from 'react-native';

import {images} from '../components/Images';

import {FlatList} from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../utils/dimensions';



const data = [
  {
    id: '1',
    title: 'Events',
    screen: 'Events',
  },
  {
    id: '2',
    title: 'QR',
    screen: 'QR',
  },
  {
    id: '3',
    title: 'details',
    screen: 'Details',
  },
];
const Navoptions = () => {

  const navigation =useNavigation();

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate(item.screen)}
        style={styles.touchableFlat}>
          <View style={styles.touchableview}>
            <Image 
            source={images.pics[item.id]} 
            style={styles.ImFlatlist} />

          <Text style={styles.touchableText} >{item.title}</Text>
          <Icon 
          type="font-awesome"
          name=  "arrow-circle-o-right"
          color='black'
          />
          </View>
        </TouchableOpacity>
      )}
    />

  );
};

export default Navoptions;

const styles = StyleSheet.create({
  ImFlatlist: {
    width: windowWidth/5.5,
    height: windowHeight/12,
    resizeMode:'contain',
  },
  touchableFlat: {
    padding: 2,
    paddingBottom: 8,
    paddingTop: 4,
    paddingLeft: 6,
    //backgroundColor:'#eaeaea',
    backgroundColor:'#f5f6fa',
    margin: 10 ,
    width:windowWidth/3.5,
    height:windowHeight/6,
    borderRadius:25,
  },  
  touchableview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableText:{
    marginTop:2,
    fontSize:15,
    fontWeight:'bold',
    color:'#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
