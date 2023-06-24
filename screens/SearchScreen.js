import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState,useContext} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/dimensions';

import filter from 'lodash.filter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {BuildingsDataContext} from '../BuildingsDataContext';

import geohash from 'ngeohash';

const API_ENDPOINT = `https://randomuser.me/api/?results=30`;
const api = `https://v1.nocodeapi.com/yonasku/fbsdk/TAXCTHLcOolNMAyJ/firestore/allDocuments?collectionName=buildingCollection`;

const SearchScreen = () => {
  const [isLoading, setIsloading] = useState('false');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFulldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {buildingsData} = useContext(BuildingsDataContext);
  const [buildingsDatas, setBuildingsDatas] = useState([]);

  const decodedCoordinates = buildingsData.map(building => {
    const {latitude, longitude} = geohash.decode(building.geoHash);
    return {...building, coordinates: [longitude,latitude]};
  });

  console.log(decodedCoordinates);
  useEffect(() => {
    setBuildingsDatas(decodedCoordinates);
  }, []);
  //console.log(buildingsDatas);
  const handlesearch = query => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({name, email}, query) => {
    const {first, last} = name;

    if (first.includes(query) || last.includes(query) || email.includes(query))
      return true;

    return false;
  };

  if (!isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter place you want to Search"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={query => handlesearch(query)}
            />
          </View>
          <View style={styles.searchBtn}>
            <Icon
              type="MaterialIcons"
              name="search"
              size={28}
              color="#ffffff"
            />
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <FlatList
            data={decodedCoordinates}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.itemcontainer}>
                <View>
                  {item.url ? (
                    <Image source={{uri: item.url}} style={styles.image} />
                  ) : (
                    <Image source={require('../assets/ASTU.png')} style={styles.image} />
                  )}
                </View>
                <TouchableOpacity>
                  <Text style={styles.textName}>
                    {item.buildingCategory}
                    {item.buildingName}
                  </Text>
                  <Text style={styles.textEmail}>{item.coordinates}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },

  itemcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 75,
    height: 75,
  },
  textName: {
    fontSize: 22,
    marginLeft: 10,
    fontWeight: '600',
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },
  searchContainer: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#1565C0',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchInput: {
    fontFamily: 'DMregular',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#1565C0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: '#F3F4F8',
  },
});
