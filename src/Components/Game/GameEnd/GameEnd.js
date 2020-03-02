import React, {useRef, useEffect, useState} from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import {APP_COLORS, timeConvert, handleStore} from '../../../Configs/Constants';
import LogoSVG from '../../../Assets/LogoSVG';
import {Button} from '../../Button';
import AnimatedContainer from '../../AnimatedContainer';
import Input from '../../Input';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {gameReset} from '../../../Redux/GameReducers/GameReducer';

import Toast from 'react-native-simple-toast';
import {
  saveLeaderboardAction,
  getLeaderboardAction,
} from '../../../Redux/LeaderboardReducers/LeaderboardReducer';
import {translate} from '../../../Configs/TranslationConfig';

const GameEnd = () => {
  const [values, setValues] = useState({
    name: '',
    points: 0,
    prevPoints: 0,
  });
  const [showContent, setContent] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentGameStore = useSelector(store => store.GameReducer.current_game);
  const gameConfigStore = useSelector(store => store.GameReducer.game_config);
  const saveLeaderboardStore = useSelector(
    store => store.LeaderboardReducer.save_leaderboard,
  );
  const getLeaderboardStore = useSelector(
    store => store.LeaderboardReducer.user_leaderboard,
  );

  useEffect(() => {
    dispatch(getLeaderboardAction());
  }, [dispatch]);

  useEffect(() => {
    handleStore(getLeaderboardStore)
      .then(response => {
        if (response) {
          setValues(v => {
            return {...v, prevPoints: response.points, name: response.name};
          });
        }
      })
      .catch(err => {
        Toast.show('Ocorreu um erro em nossos servidores.');
        console.log(err);
      });
  }, [getLeaderboardStore]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      if (!showContent) {
        setTimeout(() => {
          setValues(v => {
            return {
              ...v,
              points:
                currentGameStore.numberOfPoints + currentGameStore.bonusTiming,
            };
          });
          setContent(true);
        }, 500);
      }
    });
  }, [
    showContent,
    animatedValue,
    currentGameStore.numberOfPoints,
    currentGameStore.bonusTiming,
  ]);

  const interpolate = (x, y) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [x, y],
    });

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {scale: interpolate(0.7, 1)},
      {translateY: interpolate(100, 0)},
    ],
  };

  const calcPercentHits = () => {
    let percent =
      (currentGameStore.numberOfHits /
        gameConfigStore.listRandomHeroes.length) *
      100;
    return Number(percent.toFixed(0));
  };

  useEffect(() => {
    handleStore(saveLeaderboardStore)
      .then(response => {
        Toast.show(translate('saveScoreSuccess'));
      })
      .catch(err => {
        Toast.show(translate('serverError'));
        console.log(err);
      });
  }, [saveLeaderboardStore]);

  const onSaveScore = async () => {
    if (values.name === '') {
      Toast.show(translate('inputNameError'));
    } else {
      const item = {
        name: values.name,
        points: values.points,
        hits: currentGameStore.numberOfHits,
        percent: calcPercentHits(),
        time:
          gameConfigStore.time -
          (gameConfigStore.time - currentGameStore.bonusTiming),
      };
      dispatch(saveLeaderboardAction(item));
    }
  };

  const onEndGame = () => {
    dispatch(gameReset());
    navigation.replace('Home');
  };

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <AnimatedContainer
        shouldStart={showContent}
        containerStyle={styles.logoContainer}>
        <LogoSVG width={100} height={150} />
      </AnimatedContainer>
      <AnimatedContainer
        shouldStart={showContent}
        containerStyle={styles.resultContainer}>
        <View>
          <Text style={[styles.subLabel, styles.labelBold]}>
            {translate('hits') + ': ' + calcPercentHits() + '%'}
          </Text>
          <Text style={[styles.subLabel, styles.labelMargin]}>
            {currentGameStore.numberOfHits +
              ' ' +
              translate('of') +
              ' ' +
              (gameConfigStore.listRandomHeroes.length + 1)}
          </Text>
          <Text style={[styles.subLabel, styles.labelMargin]}>
            {translate('total') + ': '}
            <Text style={styles.labelBold}>
              {currentGameStore.numberOfPoints + 'pts'}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={[styles.subLabel, styles.labelBold]}>
            {translate('time') + ':'}
          </Text>
          <Text style={[styles.subLabel, styles.labelMargin]}>
            {translate('bonus') +
              ': ' +
              timeConvert(currentGameStore.bonusTiming)}
          </Text>
          <Text style={[styles.subLabel, styles.labelMargin]}>
            {translate('total') + ': '}
            <Text style={styles.labelBold}>
              {currentGameStore.bonusTiming + 'pts'}
            </Text>
          </Text>
        </View>
      </AnimatedContainer>
      <View style={styles.flex}>
        <AnimatedContainer
          shouldStart={showContent}
          containerStyle={styles.resultPtsContainer}>
          <Text style={styles.congratsLabel}>{translate('congraz')}</Text>
          <Text style={styles.subLabel}>{translate('scoreLabel')}</Text>
          <Text style={styles.congratsLabel}>{values.points}pts</Text>
          <View style={styles.prevPointsContainer}>
            {values.prevPoints > 0 && (
              <Text style={styles.subLabel}>
                {translate('prevScore') + ': '}
                <Text style={styles.labelBold}>
                  {values.prevPoints + 'pts'}
                </Text>
              </Text>
            )}
          </View>
        </AnimatedContainer>
        <AnimatedContainer
          shouldStart={showContent}
          containerStyle={styles.inputContainer}>
          <Input
            label={translate('inputName') + ':'}
            value={values.name}
            onChangeText={text =>
              setValues({...values, name: text.substring(0, 10)})
            }
          />
          <Button
            title={translate('saveScoreButton')}
            loading={saveLeaderboardStore.isLoading}
            transparent
            action={onSaveScore}
          />
        </AnimatedContainer>
        <AnimatedContainer
          containerStyle={styles.actionContainer}
          shouldStart={showContent}>
          <Button title={translate('finish')} action={onEndGame} />
        </AnimatedContainer>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: APP_COLORS.primary,
  },
  prevPointsContainer: {
    marginTop: 5,
  },
  labelMargin: {
    marginLeft: 10,
  },
  flex: {
    flex: 1,
  },
  labelBold: {
    fontWeight: 'bold',
  },
  labelError: {
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 5,
  },
  logoContainer: style => ({
    padding: 10,
    paddingLeft: 20,
    ...style,
  }),
  resultContainer: style => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    ...style,
  }),
  inputContainer: style => ({
    flex: 1,
    ...style,
  }),
  subLabel: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  congratsLabel: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  resultPtsContainer: style => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  }),
  actionContainer: style => ({
    ...style,
  }),
});

export default GameEnd;
