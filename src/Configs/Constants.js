import {Dimensions} from 'react-native';

export const DEVICE_SIZE = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const APP_COLORS = {
  primary: '#E74C3C',
};

export const handleStore = store => {
  return new Promise((resolve, reject) => {
    const {isLoading, error, response} = store;
    if (!isLoading) {
      if (response) resolve(response);
      if (error) reject(error);
    }
  });
};

export const shuffleArray = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const timeConvert = num => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + ':' + (minutes > 9 ? minutes : '0' + minutes);
};
