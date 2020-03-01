import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {APP_COLORS} from '../../Configs/Constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const GameButton = ({label, action, status} = this.props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={action}
      style={styles.gameCardButton(status)}>
      {status === 'acerto' ? (
        <Icon name={'check'} size={30} color={'#FFFFFF'} />
      ) : status === 'erro' ? (
        <Icon name={'close'} size={30} color={'#FFFFFF'} />
      ) : (
        <Text style={styles.cardButtonLabel}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardButtonLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  gameCardButton: status => ({
    height: 50,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: status === 'acerto' ? '#2ecc71' : APP_COLORS.primary,
  }),
});

export default GameButton;
