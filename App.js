import React from 'react';
import {StatusBar} from 'expo-status-bar';
import Home from './views/Home';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
