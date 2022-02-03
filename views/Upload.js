import React, {useCallback, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, ScrollView, StyleSheet, Text} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';
import {Video} from 'expo-av';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setType('image');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please, select a file');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();

    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    console.log(formData);
    console.log(image);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response);

      const tagResponse = await postTag(
        {file_id: response.file_id, tag: appId},
        token
      );
      console.log('tag response', tagResponse);
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (e) {
      // You should notify the user about the problems here
      console.log('onSubmit upload image problem');
    }
  };

  console.log('loading', loading);

  console.log('type', type);

  return (
    <ScrollView>
      <Card>
        {type === 'image' ? (
          <Card.Image
            source={{uri: image}}
            style={styles.image}
            onPress={pickImage}
          />
        ) : (
          <Video
            source={{uri: image}}
            style={styles.image}
            useNativeControls={true}
            resizeMode="cover"
            onError={(err) => {
              console.error('video', err);
            }}
          />
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: false,
            minLength: {
              value: 3,
              message: 'Description has to be at least 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description && errors.description.message}
            />
          )}
          name="description"
        />

        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          loading={loading}
          buttonStyle={{backgroundColor: 'rgba(39, 39, 39, 1)'}}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title={'Reset form'} onPress={reset} />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});
Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
