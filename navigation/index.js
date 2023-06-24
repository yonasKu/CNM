import React from 'react';
import Routes from './Routes';
import {AuthProvider} from './AuthProvider';
import BuildingsDataContextProvider from '../BuildingsDataContext';

const Providers = () => {
  return (
    <AuthProvider>
      <BuildingsDataContextProvider>
        <Routes />
      </BuildingsDataContextProvider>
    </AuthProvider>
  );
};

export default Providers;
