import React, {createContext, useState, useEffect} from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { app } from './config';

export const BuildingsDataContext = createContext();

const BuildingsDataContextProvider = ({children}) => {
  const [buildingsData, setBuildingsData] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    // Real-time data gathering
    const colRef = collection(
      db,
      'Locations',
      'Adama Science And Technology',
      'BuildingsData',
    );
    const queuedRef = query(colRef, orderBy('buildingNumber'));
    const unsubscribe = onSnapshot(queuedRef, snapshot => {
      let data = [];
      snapshot.docs.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
      setBuildingsData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BuildingsDataContext.Provider value={{buildingsData}}>
      {children}
    </BuildingsDataContext.Provider>
  );
};

export default BuildingsDataContextProvider;
