import React, {useState, useEffect} from 'react';
import {ImageBackground, View, StyleSheet, Text} from 'react-native';
import {GameButton} from '../../Button';
import {useDispatch} from 'react-redux';
import {shuffleArray, DEVICE_SIZE} from '../../../Configs/Constants';
import {setHitHero, setMissHero} from '../../../Redux/GameReducers/GameReducer';
import {translate} from '../../../Configs/TranslationConfig';

const GameCard = ({item, randomNames} = this.props) => {
  const [cardPressed, setCardPressed] = useState(false);
  const [listButtons, setButtons] = useState(null);

  const dispatch = useDispatch();

  const getRandomNames = listNames => {
    return [
      listNames[Math.floor(Math.random() * listNames.length)],
      listNames[Math.floor(Math.random() * listNames.length)],
    ];
  };

  useEffect(() => {
    const randomNamesList = getRandomNames(randomNames);
    const list = [...randomNamesList, {id: item.id, name: item.name}];
    setButtons(shuffleArray(list));
  }, [item, randomNames]);

  const onPressButton = card => {
    if (!cardPressed) {
      setCardPressed(true);
      if (card.id === item.id) {
        dispatch(setHitHero(card));
      } else {
        dispatch(setMissHero(card));
      }
    }
  };

  return (
    <View style={{width: DEVICE_SIZE.width}}>
      <ImageBackground
        source={{uri: item.images.lg}}
        resizeMode={'cover'}
        style={{...StyleSheet.absoluteFill}}>
        <View style={{flex: 1}} />
        <View style={styles.gameCardQuestion}>
          <Text style={styles.gameCardLabel}>{translate('question')}</Text>
          <View style={styles.cardButtonContainer}>
            {listButtons && (
              <View style={styles.cardTopButtons}>
                <GameButton
                  label={listButtons[0].name}
                  action={() => onPressButton(listButtons[0])}
                />
                <GameButton
                  label={listButtons[1].name}
                  action={() => onPressButton(listButtons[1])}
                />
              </View>
            )}
            {listButtons && (
              <GameButton
                label={listButtons[2].name}
                action={() => onPressButton(listButtons[2])}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTopButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gameCardQuestion: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  gameCardLabel: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GameCard;
