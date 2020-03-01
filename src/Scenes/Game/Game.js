import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {APP_COLORS, shuffleArray} from '../../Configs/Constants';
import {setGameConfigs} from '../../Redux/GameReducers/GameReducer';

import PanelStartingGame from '../../Components/Game/PanelStartingGame';
import GameInfo from '../../Components/Game/GameInfo';
import GameStart from '../../Components/Game/GameStart';
import GameEnd from '../../Components/Game/GameEnd';

const Game = () => {
  const dispatch = useDispatch();
  const listHeroesStore = useSelector(
    store => store.HeroReducer.list_heroes.response,
  );
  const currentGameStore = useSelector(store => store.GameReducer.current_game);

  useEffect(() => {
    const randomHeroes = shuffleArray(listHeroesStore);
    const heroesNames = randomHeroes.map(f => {
      return {id: f.id, name: f.name};
    });
    const gameConfig = {
      listRandomHeroes: randomHeroes.splice(0, 99),
      listRandomNames: heroesNames,
    };
    dispatch(setGameConfigs(gameConfig));
  }, [listHeroesStore, dispatch]);

  return (
    <View style={styles.container}>
      {currentGameStore.started ? <GameStart /> : <PanelStartingGame />}
      {!currentGameStore.finished && <GameInfo />}
      {currentGameStore.finished && <GameEnd />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transitionCard: status => ({
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: status === 'success' ? '#175c3490' : '#FF000050',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  cardButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTopButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardButtonLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  gameCardButton: {
    height: 50,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: APP_COLORS.primary,
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
  panelAnimatedCounter: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelStarting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelCounterLabel: {
    fontSize: 150,
    fontWeight: 'bold',
    color: APP_COLORS.primary,
  },
  panelStartingLabel: {
    fontSize: 40,
    color: APP_COLORS.primary,
  },
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

export default Game;
