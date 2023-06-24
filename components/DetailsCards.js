import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import {windowHeight, windowWidth} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

import {BuildingsDataContext} from '../BuildingsDataContext';
import geohash from 'ngeohash';
import { fetchRoute } from '../utils/Routeutils';

const DetailsCard = ({id, name, description, place, coordinates, block}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState([
    39.29067144628581, 8.562990740516645,
  ]);
console.log(userLocation,coordinates)
  const handleRoutePress = async coordinates => {
    console.log(userLocation,coordinates)
    if (userLocation.length === 0) {
      alert(
        'Could not fetch your location. Please turn your location on  or try again.',
      );
      return;
    }
    // Call fetchRoute with the origin and destination variables
    const route = await fetchRoute(userLocation, coordinates);
    navigation.navigate('Route', {route});
    console.log(userLocation, coordinates);
    //console.log(route);
  };

  return (
    <View>
      <View>
        <View style={styles.CardContainer}>
          <View style={styles.cardTextContainer}></View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/ASTU.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.ContentContainer}>
              <View>
                <View style={styles.nameContainer}>
                  <Text style={{fontWeight: '600', color: 'black'}}>
                    {name}
                  </Text>
                </View>

                <View style={styles.desriptionsContainer}>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="location"
                      type="entypo"
                      color="black"
                      size={18}
                    />
                    <Text style={{color: 'black', fontWeight: 400}}>
                      {place}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}>
                    <Icon
                      name="office-building-outline"
                      type="material-community"
                      color="black"
                      size={18}
                    />
                    <Text style={{color: 'black', fontWeight: 400}}>
                      B-{block}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                    }}>
                    <Icon
                      name="door"
                      type="material-community"
                      color="black"
                      size={18}
                    />
                    <Text style={{color: 'black', fontWeight: 400}}>
                      offices
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 15,
                      flexDirection: 'row',
                      padding: 5,
                    }}>
                    <Icon
                      name="description"
                      type="MaterialIcons"
                      color="black"
                      size={18}
                    />
                    <Text style={{padding: 5}}>{description}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      //justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 15,
                        padding: 4,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        handleRoutePress(coordinates)
                        console.log(coordinates);
                      }}>
                      <Text style={styles.ButtonsText}>Travel to</Text>
                      <Icon
                        name="double-arrow"
                        type="MaterialIcons"
                        color="silver"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {isLoading && <ActivityIndicator />}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    /*<View key={item.id}>
                    <Icon name="event" type="MaterialIcons" color="#2089DC"" />
                    <View>
                      <View><Text>{item.name}</Text></View>
                      <View><Text>{item.type}</Text></View>
                      <DetailsCard/>
                    </View>
                  </View>*/
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  CardContainer: {
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
    marginTop: 3,
    marginBottom: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    //borderBottomWidth: 1,
  },
  image: {
    width: windowWidth / 4,
    height: windowHeight / 3,
    resizeMode: 'contain',
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10,
  },
  imageContainer: {
    backgroundColor: 'white',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: WINDOW_WIDTH / 3.5,
  },
  ContentContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  desriptionsContainer: {
    padding: 5,
  },
  nameContainer: {
    padding: 5,
    borderBottomWidth: 0.5,
    //borderTopLeftRadius: 10,
  },
  cardTextContainer: {
    //backgroundColor: '#D9CECA',
    backgroundColor: 'silver',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ButtonsText: {
    backgroundColor: 'silver',
    borderRadius: 15,
    padding: 3,
    fontWeight: 400,
    fontSize: 12,
    color: 'black',
  },
});
