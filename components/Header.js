import {Image, StyleSheet, View, Text} from 'react-native';
import {Settings} from 'react-native-feather';
import cats from '../img/104253550-helping-stray-abandoned-kittens-632x475.jpg';

const Header = () => {
  return (
    <View style={test.container}>
      <Image source={cats} style={test.img} />
      <Settings stroke={'white'} style={test.setting} />
      <Text style={test.cat}>Homeless Kittens</Text>
    </View>
  );
};

const test = StyleSheet.create({
  container: {
    height: '30%',
    marginBottom: 15,
  },
  img: {
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 65,
  },
  setting: {
    paddingTop: 40,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  cat: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    backgroundColor: 'darkblue',
    padding: 10,
    fontSize: 15,
  },
});
export default Header;
