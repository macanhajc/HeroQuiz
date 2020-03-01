import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {APP_COLORS, timeConvert} from '../../../Configs/Constants';
import {
  setGameEnd,
  setGameTimeBonus,
} from '../../../Redux/GameReducers/GameReducer';
import {translate} from '../../../Configs/TranslationConfig';

const GameInfo = () => {
  const currentGameStore = useSelector(store => store.GameReducer.current_game);
  const gameConfigStore = useSelector(store => store.GameReducer.game_config);

  const [values, setValues] = useState({counter: gameConfigStore.time});

  const listHeroesStore = useSelector(
    store => store.HeroReducer.list_heroes.response,
  );

  const intervalRef = useRef();
  const dispatch = useDispatch();

  const OnEndCards = useCallback(() => {
    dispatch(setGameTimeBonus(values.counter));
  }, [dispatch, values.counter]);

  useEffect(() => {
    if (currentGameStore.started) {
      intervalRef.current = setInterval(
        () =>
          setValues(v => {
            return {...v, counter: v.counter - 1};
          }),
        1000,
      );
      return () => {
        OnEndCards();
        clearInterval(intervalRef.current);
      };
    }
  }, [dispatch, currentGameStore.started, OnEndCards]);

  useEffect(() => {
    if (values.counter === 0) {
      dispatch(setGameEnd());
      clearInterval(intervalRef.current);
    }
  }, [dispatch, values.counter]);

  return (
    <View style={styles.infoContainer(currentGameStore.started)}>
      <View style={styles.infoLeftContainer}>
        <Text style={styles.infoLabel(currentGameStore.started)}>
          {translate('timeCounter') + ': ' + timeConvert(values.counter)}
        </Text>
      </View>
      <View style={styles.infoRightContainer}>
        <Text style={styles.infoLabel(currentGameStore.started)}>
          {translate('heroes') + ': ' + (currentGameStore.currentPosition + 1)}/
          {gameConfigStore.listRandomHeroes.length + 1}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: active => ({
    position: 'absolute',
    bottom: 0,
    padding: 10,
    flexDirection: 'row',
    maxHeight: 50,
  }),
  infoLabel: active => ({
    color: active ? '#FFFFFF' : APP_COLORS.primary,
    fontSize: 16,
  }),
  infoLeftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default GameInfo;
