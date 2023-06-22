import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const DetailsScreen = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.nocodeapi.com/your-username/firebase/firestore/read',
          {
            mode: 'cors',
          },
        );
        const data = await response.json();
        console.log(data);
        setBuildings(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      <Text>DetailsScreen</Text>
      <View>
        {buildings.map(building => (
          <View key={building._id}>
            <Text>{building.buildingName}</Text>
            <Text>{building.buildingDescription}</Text>
            <Text>{building.buildingNumber}</Text>
            <Text>{building.created_at}</Text>
            {/* Add additional building fields here */}
          </View>
        ))}
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
