import React from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APP_COLORS} from '../../Configs/Constants';
import {useNavigation} from '@react-navigation/native';
import LogoSVG from '../../Assets/LogoSVG';
import {translate} from '../../Configs/TranslationConfig';

const About = () => {
  const navigation = useNavigation();

  const onPressAPI = () => {
    Linking.openURL('https://akabab.github.io/superhero-api/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacit={0.9}
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}>
        <Icon name={'chevron-left'} color={'#FFFFFF'} size={30} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <LogoSVG color={'#FFFFFF'} width={100} height={150} />
        <Text style={styles.titleLabel}>{translate('about')}</Text>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutSubTitle}>{translate('aboutTitle')}</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressAPI}
          style={styles.aboutItem}>
          <Text style={styles.aboutSubTitle}>superhero-api</Text>
          <Text style={styles.aboutDescription}>
            Multiple universes superheroes open-source REST API
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  aboutSubTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  aboutContainer: {
    padding: 10,
  },
  aboutItem: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  aboutDescription: {
    paddingTop: 5,
    color: '#FFFFFF90',
    fontSize: 14,
  },
  iconContainer: {
    width: 30,
    paddingBottom: 5,
    marginTop: 20,
    marginLeft: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  titleLabel: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    marginLeft: 10,
  },
});

export default About;
