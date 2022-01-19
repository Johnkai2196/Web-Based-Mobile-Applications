import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import {PropsType} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropsType.object,
};
export default List;
