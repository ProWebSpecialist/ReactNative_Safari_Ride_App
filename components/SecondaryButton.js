import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const SecondaryButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={onPress}>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  label: {
    color: '#666b71',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: scale(17),
    textDecorationLine: 'underline',
  },
});

export default SecondaryButton;
