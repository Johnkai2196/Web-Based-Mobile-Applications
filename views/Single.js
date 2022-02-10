import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Card, ListItem, Text, Button} from 'react-native-elements';
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Single = ({route}) => {
  // console.log('route:', route);
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {getFavouriteByFileId, postFavourite, deleteFavourite} = useFavourite();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (e) {
      // TODO: how should user be notified?
      console.error('fetch owner error', e);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      console.log('single.js avatar ', avatar);
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouriteByFileId(file.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const createFavourites = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (e) {
      console.error('createFavourite', e);
    }
  };

  const removeFavourites = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (e) {
      console.error('removeFavourites', e);
    }
  };
  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, [userLike]);
  useEffect(() => {
    fetchLikes();
  }, [userLike]);
  return (
    <ScrollView>
      <Card>
        <Card.Title h4>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadsUrl + file.filename,
            }}
            posterSource={{uri: uploadsUrl + file.screenshot}}
            useNativeControls
            resizeMode="contain"
            onError={(error) => {
              console.error('<Video> error', error);
            }}
          />
        )}
        <Card.Divider />
        <Text style={styles.description}>{file.description}</Text>
        <ListItem>
          <Avatar source={{uri: avatar}} />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Likes Count:{likes.length}</Text>
          <Button
            title={'Like'}
            disabled={userLike}
            onPress={() => {
              createFavourites();
            }}
          />
          <Button
            title={'Unlike'}
            disabled={!userLike}
            onPress={() => {
              removeFavourites();
            }}
          />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
