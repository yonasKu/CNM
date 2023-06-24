import {StyleSheet, View, ScrollView, Image} from 'react-native';

import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {images} from '../components/Images';

import {
  Button,
  Card,
  Icon,
  Text,
  Tile,
  Header as HeaderRNE,
  HeaderProps,
  Avatar,
} from '@rneui/themed';
import Navoptions from '../components/NavOptions';
import {windowWidth} from '../utils/dimensions';
import {PermissionsAndroid} from 'react-native';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import IndoorCard from '../components/IndoorCard';
import Optionscard from '../components/Optionscard';
import geohash from 'ngeohash';
import {app, firebase} from '../config';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const Homescreen = ({navigation}) => {
  //const navigation =useNavigation();

  const geoHash = 'scebwp4gknb1';
  const {latitude, longitude} = geohash.decode(geoHash);
  console.log(latitude, longitude);

  // const [buildingsData, setBuildingsData] = useState([]);
  // const db = getFirestore(app);
  // useEffect(() => {
  //   // Real-time data gathering
  //   const colRef = collection(
  //     db,
  //     'Locations',
  //     'Adama Science And Technology',
  //     'BuildingsData',
  //   );
  //   const queuedRef = query(colRef, orderBy('buildingNumber'));
  //   const unsubscribe = onSnapshot(queuedRef, snapshot => {
  //     let data = [];
  //     snapshot.docs.forEach(doc => {
  //       data.push({...doc.data(), id: doc.id});
  //     });
  //     setBuildingsData(data);
  //   });

  //   return () => unsubscribe();
  // }, []);
  
  // /////////////////////
  // const geoHashes = buildingsData.map(building => building.geoHash);

  // console.log(geoHashes);

  // const decodedCoordinates = buildingsData.map(building => {
  //   const {latitude, longitude} = geohash.decode(building.geoHash);
  //   return {...building, latitude, longitude};
  // });

  // //console.log(decodedCoordinates);
  const {user, Logout} = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Access',
          message:
            'App needs access to your device location in order to show nearby places.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Location permission denied');
      }
    } else {
      // If we're on IOS, no need to check for location permission
    }
  };
  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={
          <TouchableOpacity>
            <Avatar
              size={32}
              rounded
              icon={{name: 'user', type: 'font-awesome', color: 'black'}}
              containerStyle={{backgroundColor: '#ffffff'}}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon
                type="simplelineicon"
                name="logout"
                color="white"
                onPress={() => Logout()}
              />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'CNM', style: styles.heading}}
      />

      <View style={styles.container}>
        <ScrollView style={{paddingVertical: 10}}>
          <View style={{paddingTop: 0, paddingBottom: 10}}>
            <Tile
              imageSrc={require('../assets/navigations.jpeg')}
              featured
              activeOpacity={1}
              width={windowWidth - 15}
              height={WINDOW_HEIGHT / 4}></Tile>
          </View>
          <Text style={styles.subHeader}>Navigation</Text>
          <Navoptions />
          <View>
            <Card>
              <Card.Title>🔭 EXPLORE ASTU 🗺️ </Card.Title>
              <Card.Divider />
              <Card.Image style={{padding: 0}} source={images.profile[1]} />
              <Text style={{marginBottom: 10}}>
                This is the View of Indoor and Outdoor Navigation in Adama
                Science And Technology University using virtual images
              </Text>
              <Button
                icon={
                  <Icon
                    name="code"
                    color="#ffffff"
                    iconStyle={{marginRight: 10}}
                  />
                }
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Explore NOW"
              />
            </Card>
          </View>
          <Text style={styles.subHeader}>Indoor Nav</Text>

          <View style={{paddingTop: 20, paddingBottom: 10}}>
            <IndoorCard />
          </View>
          <View style={styles.Optionscontainer}>
            <Optionscard />
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',

    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',

    shadowOffset: {width: -1, height: -3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    //elevation :5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ImFlatlist: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  touchableFlat: {
    flex: 1,
    padding: 2,
    paddingBottom: 8,
    paddingTop: 4,
    paddingLeft: 6,
    backgroundColor: '#eaeaea',
    margin: 10,
    width: 140,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableText: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 'semibold',
    color: 'black',
  },
  FlIcon: {
    padding: 2,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginTop: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
