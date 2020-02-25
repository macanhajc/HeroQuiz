import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const CardTransition = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const currentGameTypeStore = useSelector(
    store => store.GameReducer.current_game.type,
  );

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  });

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <Animated.View
      style={[animatedStyle, styles.transitionCard(currentGameTypeStore)]}>
      {currentGameTypeStore === 'success' ? (
        <Icon name={'check'} size={100} color={'#FFFFFF'} />
      ) : (
        <Icon name={'close'} size={100} color={'#FFFFFF'} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  transitionCard: status => ({
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: status === 'success' ? '#175c3490' : '#FF000050',
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

export default CardTransition;
