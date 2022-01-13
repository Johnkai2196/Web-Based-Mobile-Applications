import {Image, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <Image
      source={{uri: 'http://placekitten.com/2039/1920'}}
      style={test.container}
    />
  );
};

const test = StyleSheet.create({
  container: {
    height: '30%',
    marginBottom: 15,
  },
});
export default Header;
