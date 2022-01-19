import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Image
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        style={styles.img}
      />
      <View style={styles.textView}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 1,
    flexWrap: 'wrap',
  },
  img: {
    flex: 1,
    height: '100%',
    width: '50%',
    padding: 10,
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  textView: {
    flex: 2,
    padding: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default ListItem;
