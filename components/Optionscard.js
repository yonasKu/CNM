import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useEffect } from 'react';

const Optionscard = () => {

  return (
    <View style={styles.container}>
      <Text>Optionscard</Text>
    </View>
  );
};

export default Optionscard;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 200,
    height: 200,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  handleIndicator: {
    backgroundColor: 'gray',
    height: 4,
    width: 40,
    borderRadius: 2,
  },
  handleIndicatorText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
