import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const dataUrl =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      setMediaArray(json);
    } catch (e) {
      console.error(e);
    }
    console.log(mediaArray);
  };

  // Call loadMedia() only once when the component is loaded
  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => {
        item.title;
      }}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
