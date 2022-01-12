import {baseUrl} from '../utils/variables';
import {useEffect, useState} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async (start = 0, limit = 10) => {
    try {
      const response = await fetch(
        `${baseUrl}media?start=${start}&limit=${limit}`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(`${baseUrl}media/${item.file_id}`);
          const mediaData = await response.json();
          console.log(mediaData);
          return mediaData;
        })
      );
      setMediaArray(media);
    } catch (e) {
      console.error(e);
    }
  };

  // Call loadMedia() only once when the component is loaded
  useEffect(() => {
    loadMedia();
  }, []);
  return {mediaArray};
};

export {useMedia};
