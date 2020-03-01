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
    var item1 = listNames[Math.floor(Math.random() * listNames.length)];
    var item2 = null;
    do {
      item2 = listNames[Math.floor(Math.random() * listNames.length)];
    } while (item1.id === item2.id);
    return [item1, item2];
  };

  useEffect(() => {
    const randomNamesList = getRandomNames(
      JSON.parse(JSON.stringify(randomNames)),
    );
    const list = [...randomNamesList, {id: item.id, name: item.name}];
    setButtons(shuffleArray(list));
  }, [item, randomNames]);

  const onPressButton = card => {
    var buttons = [...listButtons];
    var index = buttons.findIndex(f => f.id === card.id);
    if (!cardPressed) {
      setCardPressed(true);
      if (card.id === item.id) {
        buttons[index].status = 'acerto';
        dispatch(setHitHero(card));
      } else {
        buttons[index].status = 'erro';
        dispatch(setMissHero(card));
      }
      setButtons(buttons);
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
                  status={listButtons[0].status}
                  action={() => onPressButton(listButtons[0])}
                />
                <GameButton
                  label={listButtons[1].name}
                  status={listButtons[1].status}
                  action={() => onPressButton(listButtons[1])}
                />
              </View>
            )}
            {listButtons && (
              <GameButton
                label={listButtons[2].name}
                status={listButtons[2].status}
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
