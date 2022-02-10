import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, ScrollView, Text} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  console.log(file);
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log('modify response', response);
      response &&
        Alert.alert('File', 'modified', [
          {
            text: 'Ok',
            onPress: () => {
              setUpdate(update + 1);
              navigation.navigate('My Files');
            },
          },
        ]);
    } catch (e) {
      // You should notify the user about the problems here
      console.log('onSubmit update  problem');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Title"
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
              label="Description"
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

        <Button
          loading={loading}
          buttonStyle={{backgroundColor: 'rgba(39, 39, 39, 1)'}}
          title="Save changes"
          onPress={handleSubmit(onSubmit)}
        />
      </Card>
    </ScrollView>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
