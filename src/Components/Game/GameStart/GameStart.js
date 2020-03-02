import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import GameCard from '../GameCard';
import CardTransition from '../CardTransition';
import {setGameEnd} from '../../../Redux/GameReducers/GameReducer';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {ADMOB_API_KEY} from 'react-native-dotenv';

const GameStart = () => {
  const [showTransition, setTransition] = useState(false);
  const gameConfigStore = useSelector(store => store.GameReducer.game_config);
  const currentGameStore = useSelector(store => store.GameReducer.current_game);

  const listRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGameStore.currentPosition) {
      setTransition(true);
      setTimeout(() => {
        if (
          currentGameStore.currentPosition ===
          gameConfigStore.listRandomHeroes.length
        ) {
          dispatch(setGameEnd());
        } else {
          listRef.current.scrollToIndex({
            animated: true,
            index: currentGameStore.currentPosition,
          });
          setTransition(false);
        }
      }, 500);
    }
  }, [
    dispatch,
    currentGameStore.currentPosition,
    gameConfigStore.listRandomHeroes.length,
  ]);

  return (
    <View style={{flex: 1}}>
      <BannerAd
        unitId={ADMOB_API_KEY}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Advert failed to load: ', error);
        }}
      />
      <FlatList
        ref={listRef}
        data={gameConfigStore.listRandomHeroes}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <GameCard item={item} randomNames={gameConfigStore.listRandomNames} />
        )}
      />
      {showTransition && <CardTransition />}
    </View>
  );
};

export default GameStart;
