import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {db} from './config';

const Data = () => {
  useEffect(() => {
    const buildingsRef = collection(
      db,
      'adama_science_technology_buildings_data',
    );
    get(buildingsRef).then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Building Data:', data);
    });
  }, []);

  return (
    <View>
      <Text>Data</Text>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({});
