import React from 'react';
import { View, StyleSheet } from 'react-native';
import scale from '../utils/scale';

const CardView = ({ children, style }) => {
  return <View style={[styles.input, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  input: {
    width: scale(335),
    backgroundColor: 'white',
    padding: scale(6),
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: scale(3),
    borderRadius: scale(5),
    marginTop: scale(8),
    marginBottom: scale(8),
  },
});
export default CardView;
