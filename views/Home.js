import React from 'react';
import {SafeAreaView} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import List from '../components/List';
import {PropsType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};
Home.propsTypes = {
  navigation: PropsType.object,
};
export default Home;
