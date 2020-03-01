import React, {useEffect, useRef, useState, useCallback} from 'react';
import {listHeroesAction} from '../../Redux/HeroReducers/HeroReducer';
import {View, Animated, StyleSheet, Easing, Text} from 'react-native';
import {APP_COLORS, DEVICE_SIZE, handleStore} from '../../Configs/Constants';
import {Button} from '../../Components/Button';
import LogoSVG from '../../Assets/LogoSVG';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AnimatedContainer from '../../Components/AnimatedContainer';
import {translate} from '../../Configs/TranslationConfig';
import {gameReset} from '../../Redux/GameReducers/GameReducer';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {ADMOB_API_KEY} from 'react-native-dotenv';

const AnimatedLogo = ({whenAnimationEnd} = this.props) => {
  const [isFinished, setFinished] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
      }).start(() => {
        if (!isFinished) {
          setFinished(true);
          whenAnimationEnd();
        }
      });
    }, 300);
  });

  const interpolate = (x, y) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [x, y],
    });

  const cardXStart = DEVICE_SIZE.width / 2 - 65;
  const cardYStart = DEVICE_SIZE.height / 2 - 30;

  const animatedStyle = {
    transform: [
      {translateX: interpolate(cardXStart, 20)},
      {translateY: interpolate(cardYStart, 20)},
    ],
  };

  return (
    <Animated.View style={styles.animatedLogo(animatedStyle)}>
      <LogoSVG width={130} height={140} />
    </Animated.View>
  );
};

const Home = () => {
  const [start, setStart] = useState(false);
  const [values, setValues] = useState({
    logoAnimationEnd: false,
    actionAnimation: false,
  });

  const listHeroesStore = useSelector(store => store.HeroReducer.list_heroes);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(gameReset());
  }, [dispatch]);

  useEffect(() => {
    if (start) {
      handleStore(listHeroesStore)
        .then(() => {
          navigation.replace('Game');
        })
        .catch(() => {});
    }
  }, [navigation, listHeroesStore, start]);

  const onLogoAnimationEnd = () => {
    setValues({...values, logoAnimationEnd: true, actionAnimation: true});
  };

  const listAllHeroes = useCallback(() => {
    setStart(true);
    setValues(v => {
      return {...v, logoAnimationEnd: false, actionAnimation: true};
    });
    dispatch(listHeroesAction());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <AnimatedLogo whenAnimationEnd={onLogoAnimationEnd} />

      <AnimatedContainer
        shouldStart={values.logoAnimationEnd}
        containerStyle={styles.titleContainer}>
        <Text style={styles.titleLabel}>{translate('welcomeText')}</Text>
        <Text style={styles.titleLabel}>Hero Quiz</Text>
      </AnimatedContainer>

      <AnimatedContainer
        shouldStart={values.actionAnimation}
        containerStyle={styles.actionContainer}>
        {listHeroesStore.isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.guideMoreLabel}>{translate('loading')}</Text>
          </View>
        )}
        <Button
          title={translate('startButton')}
          loading={listHeroesStore.isLoading}
          action={listAllHeroes}
        />
        {values.logoAnimationEnd && (
          <Button
            title={translate('leaderboard')}
            transparent
            action={() => navigation.navigate('Leaderboard')}
          />
        )}
        <View style={{flex: 1}} />
        <Button
          title={translate('about')}
          transparent
          action={() => navigation.navigate('About')}
        />
      </AnimatedContainer>

      {/* <BannerAd
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
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: style => ({
    flex: 1,
    width: '100%',
    ...style,
  }),
  titleLabel: {
    color: '#FFFFFF',
    fontSize: 36,
  },
  guideLabel: {
    color: '#FFFFFF80',
    fontSize: 18,
  },
  guideMoreLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guideContainer: style => ({
    ...style,
  }),
  titleContainer: style => ({
    flex: 1,
    marginTop: 180,
    paddingLeft: 35,
    paddingRight: 35,
    width: '100%',
    justifyContent: 'flex-start',
    ...style,
  }),
  animatedLogo: style => ({
    left: 0,
    top: 0,
    position: 'absolute',
    ...style,
  }),
});

export default Home;
