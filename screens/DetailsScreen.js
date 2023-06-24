import React, {useEffect, useState,useContext } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import EventsCard from '../components/EventsCard';
import DetailsCard from '../components/DetailsCards';


import geohash from 'ngeohash';
import { BuildingsDataContext } from '../BuildingsDataContext';

const DetailsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const {buildingsData} = useContext(BuildingsDataContext);
  const [buildingsDatas, setBuildingsDatas] = useState([]);

  const decodedCoordinates = buildingsData.map(building => {
    const {latitude, longitude} = geohash.decode(building.geoHash);
    return {...building, coordinates: [ longitude,latitude,]};
  });

  console.log(decodedCoordinates);
  useEffect(() => {
    setBuildingsDatas(decodedCoordinates);
  }, []);
  //console.log(buildingsDatas);
  
  return (
    <SafeAreaProvider>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.imageContainer}></View>
            {/* Create first accordion with its own data array */}

            {isLoading && <ActivityIndicator />}

            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/ASTU.png')}
                style={styles.image}
              />
            </View>

            {/* Display data from second data array */}
            {buildingsDatas.map(item => (
              <View style={styles.CardContainer} key={item.id}>
                <View>
                  <DetailsCard
                    id={item.id}
                    name={item.buildingCategory}
                    description={item.buildingDescription}
                    place={item.buildingCategory}
                    block={item.buildingNumber}
                    coordinates={item.coordinates}
                  />
                </View>
              </View>
            ))}
            {isLoading && <ActivityIndicator />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white',
    //padding: 10,
  },
  SpeRouteholder: {
    padding: 5,
    marginRight: 20,
  },
  SpeContentholder: {
    marginRight: 10,
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white'
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
  CardContainer: {
    borderRadius: 15,
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
