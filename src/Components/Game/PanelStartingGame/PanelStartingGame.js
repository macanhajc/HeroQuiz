import React, {useRef, useState, useEffect} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setGameStart} from '../../../Redux/GameReducers/GameReducer';
import {APP_COLORS} from '../../../Configs/Constants';
import {translate} from '../../../Configs/TranslationConfig';

const PanelStartingGame = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [countdownEnd, setCountdownEnd] = useState(false);
  const [values, setValues] = useState({counter: 3});
  const intervalRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
    }).start();
  }, [animatedValue]);

  useEffect(() => {
    intervalRef.current = setInterval(
      () =>
        setValues(v => {
          return {...v, counter: v.counter - 1};
        }),
      1000,
    );
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (values.counter === 0) {
      clearInterval(intervalRef.current);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
      }).start(() => {
        if (!countdownEnd) {
          setCountdownEnd(true);
          dispatch(setGameStart());
        }
      });
    }
  }, [dispatch, values.counter, countdownEnd, animatedValue]);

  const animatedStyle = {
    opacity: animatedValue,
  };

  return (
    <Animated.View style={[animatedStyle, styles.panelStarting]}>
      <Text style={styles.panelStartingLabel}>{translate('startText')}</Text>
      <View style={styles.panelAnimatedCounter}>
        <Animated.Text style={styles.panelCounterLabel}>
          {values.counter}
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default PanelStartingGame;
