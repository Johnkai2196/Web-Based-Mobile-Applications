import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';
import Header from './components/Header';

const App = () => {
  return (
    <SafeAreaView
      style={
        (GlobalStyles.AndroidSafeArea,
        {
          backgroundColor: '#242424',
          height: '100%',
        })
      }
    >
      <Header />
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
