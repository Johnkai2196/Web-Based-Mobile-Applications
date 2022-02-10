import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  ButtonGroup,
  ListItem as RNEListItem,
} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const doDelete = () => {
    Alert.alert('Delete', 'this file permanently', [
      {text: 'Cancel'},
      {
        text: 'Ok',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
            console.log('delete', response);
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Avatar
        size="large"
        square
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};
export default ListItem;
