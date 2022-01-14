import {Image, StyleSheet, View} from 'react-native';
import {Settings} from 'react-native-feather';

const Header = () => {
  return (
    <View style={test.container}>
      <Image
        source={{uri: 'http://placekitten.com/2039/1920'}}
        style={test.img}
      />
      <Settings stroke={'white'} style={test.setting} />
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
    borderBottomRightRadius: 65,
  },
  setting: {
    paddingTop: 40,
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
export default Header;
