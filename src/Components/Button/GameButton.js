import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {APP_COLORS} from '../../Configs/Constants';

const GameButton = ({label, action} = this.props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={action}
      style={styles.gameCardButton}>
      <Text style={styles.cardButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default GameButton;
