import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS, timeConvert, handleStore} from '../../Configs/Constants';
import {useNavigation} from '@react-navigation/native';
import LogoSVG from '../../Assets/LogoSVG';
import {useDispatch, useSelector} from 'react-redux';
import {listLeaderboardAction} from '../../Redux/LeaderboardReducers/LeaderboardReducer';
import Toast from 'react-native-simple-toast';
import StatusHandler from '../../Components/StatusHandler';
import {translate} from '../../Configs/TranslationConfig';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import {ADMOB_API_KEY} from 'react-native-dotenv';

const CardBoard = ({item, index} = this.props) => {
  return (
    <View style={styles.cardBoardContainer}>
      <View style={styles.cardPositionContainer}>
        <Text style={styles.cardPositionLabel}>{'#' + index}</Text>
      </View>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.cardNameContainer}>
            <Text style={styles.cardNameLabel}>{item.name}</Text>
          </View>
          <View style={styles.cardPointsContainer}>
            <Text style={styles.cardPointsLabel}>{item.points + 'pts'}</Text>
          </View>
        </View>
        <View style={styles.cardContainerBottom}>
          <Text style={styles.cardPointsSubLabel}>
            {translate('hits') + ' ' + item.hits + ' - ' + item.percent + '%'}
          </Text>
          <Text style={styles.cardPointsSubLabel}>
            {translate('time') + ' ' + timeConvert(item.time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Leaderboard = () => {
  const [listBoard, setBoard] = useState([]);

  const listLeaderboardStore = useSelector(
    store => store.LeaderboardReducer.list_leaderboard,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listLeaderboardAction());
  }, [dispatch]);

  useEffect(() => {
    handleStore(listLeaderboardStore)
      .then(response => {
        setBoard(response);
      })
      .catch(err => {
        Toast.show('Ocorreu um erro em nossos servidores.');
        console.log(err);
      });
  }, [listLeaderboardStore]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacit={0.9}
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}>
        <Icon name={'chevron-left'} color={APP_COLORS.primary} size={30} />
      </TouchableOpacity>
      <StatusHandler loading={listLeaderboardStore.isLoading}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.logoContainer}>
              <LogoSVG color={APP_COLORS.primary} width={100} height={150} />
              <Text style={styles.titleLabel}>Leaderboard</Text>
            </View>
          }
          data={listBoard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CardBoard item={item} index={index + 1} />
          )}
        />
      </StatusHandler>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  cardInfoContainer: {
    flex: 1,
  },
  cardContainerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPointsContainer: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  cardPointsLabel: {
    fontSize: 18,
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
  cardPointsSubLabel: {
    color: '#333333',
  },
  cardNameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardNameLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  cardPositionLabel: {
    fontSize: 26,
    color: APP_COLORS.primary,
    fontWeight: 'bold',
  },
  cardPositionContainer: {
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBoardContainer: {
    margin: 5,
    flexDirection: 'row',
    padding: 5,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 2,
    width: 320,
    maxWidth: '80%',
    alignSelf: 'center',
    borderBottomColor: APP_COLORS.primary,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 30,
    paddingBottom: 5,
    marginTop: 20,
    marginLeft: 20,
  },
  titleLabel: {
    color: APP_COLORS.primary,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    marginLeft: 10,
  },
});

export default Leaderboard;
