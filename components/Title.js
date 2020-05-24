import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const Title = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: scale(15),
    color: '#4d5d82',
    marginTop: scale(15),
  },
});

export default Title;
