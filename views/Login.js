import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // dummy validation for user token
    console.log('token', userToken);
    if (userToken === 'abc') {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  const logIn = async () => {
    console.log('Login button pressed');
    // in real world: call api with user creds and get token as response
    // now we are using a "dummy" token
    await AsyncStorage.setItem('userToken', 'abc');
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
