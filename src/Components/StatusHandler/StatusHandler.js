import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {APP_COLORS} from '../../Configs/Constants';

const StatusHandler = ({loading, color, children} = this.props) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={color || APP_COLORS.primary} size={50} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StatusHandler;
