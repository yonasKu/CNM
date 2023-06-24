import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import {FlatList} from 'react-native';
import {images} from './Images';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {windowHeight} from '../utils/dimensions';

const IndoorCard = () => {
  const specificRoutesData = [
    {
      id: '1',
      name: 'Routes for lost id',
      type: 'Routes',
    },

    {
      id: '2',
      name: 'Routes for Cafeterias',
      type: 'Cafeterias',
    },
    {
      id: '3',
      name: 'Routes for Lounges',
      type: 'Lounges',
    },
    {
      id: '4',
      name: 'Routes for Lounges',
      type: 'Lounges',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.CardContainer}>
        <ImageBackground
          source={require('../assets/panorama.jpeg')}
          >
          <View style={styles.flatlistHolder}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={specificRoutesData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={{}}>
                  <TouchableOpacity style={styles.OuterflatlistContainer}>
                    <View style={styles.flatlistContainer}>
                      <Image
                        source={require('../assets/360.jpeg')}
                        style={styles.ImFlatlist}
                      />
                      <View style={{}}>
                        <Text style={styles.IndoorText}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default IndoorCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignitems: 'center',
    justifyContent: 'center',

    paddingRight: 5,
    margin: 2,
  },
  CardContainer: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 3,
    marginBottom: 2,
    backgroundColor: 'transparent',
    borderRadius: 10,

    width: '100%',
    padding:2
    //borderBottomWidth: 1,
  },

  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  imageContainer: {
    backgroundColor: 'white',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchcontain: {
    padding: 5,
    width: 225,
    borderRadius: 15,
    backgroundColor: 'silver',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ImFlatlist: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  IndoorText: {
    padding: 5,
  },
  flatlistContainer: {
    width: WINDOW_WIDTH / 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistHolder: {
    padding: 5,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  OuterflatlistContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
