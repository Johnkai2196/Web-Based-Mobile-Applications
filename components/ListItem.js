import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Button, Card, Text} from 'react-native-elements';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <Card>
      <Card.Title>{singleMedia.title}</Card.Title>
      <Card.Image
        size="large"
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      />
      <Text
        style={{
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {singleMedia.description}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
        title="Full screen"
      ></Button>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default ListItem;
