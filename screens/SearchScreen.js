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
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight} from '../utils/dimensions';

import filter from 'lodash.filter';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';

const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

const SearchScreen = () => {
  const [isLoading, setIsloading] = useState('false');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFulldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsloading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      setFulldata(json.results);

      console.log(json.results);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error);
      console.log(error);
    }
  };

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

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Error in fetching data ... please check your internet connection!
        </Text>
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
            <Icon type="MaterialIcons" name="search" size={28} color="#ffffff" />
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.login.username}
          renderItem={({item}) => (
            <View style={styles.itemcontainer}>
              <Image
                source={{uri: item.picture.thumbnail}}
                style={styles.image}
              />
              <TouchableOpacity>
                <Text style={styles.textName}>
                  {item.name.first}
                  {item.name.last}
                </Text>
                <Text style={styles.textEmail}>{item.email}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    height: 40,
    shadowColor: "#000",
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
    backgroundColor:'#f7f5eee8',
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 16,
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
    fontFamily: "DMregular",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: '#1565C0',
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor:'#F3F4F8',
  }
});
