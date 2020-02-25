import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = ({label, ...props} = this.props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignSelf: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: '#333333',
    fontSize: 18,
  },
});

export default Input;
