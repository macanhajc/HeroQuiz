import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {APP_COLORS} from '../../Configs/Constants';

const Button = ({title, loading, action, transparent} = this.props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!loading) {
          action();
        }
      }}
      activeOpacity={0.9}
      style={styles.actionButton(transparent)}>
      {loading ? (
        <ActivityIndicator
          color={transparent ? '#FFFFFF' : APP_COLORS.primary}
        />
      ) : (
        <Text style={styles.actionLabel(transparent)}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: transparent => ({
    margin: 5,
    backgroundColor: transparent ? 'transparent' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    alignSelf: 'center',
    borderRadius: 5,
  }),
  actionLabel: transparent => ({
    color: transparent ? '#FFFFFF' : APP_COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  }),
});

export default Button;
