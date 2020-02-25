import {View, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Game from './Game';
import Leaderboard from './Leaderboard';

import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const Routes = () => {
  useEffect(() => {
    const fetchData = async () => {
      await auth().signInAnonymously();
      SplashScreen.hide();
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default Routes;
