import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const IconView = ({ source, style }) => {
  return <Image source={source} style={[styles.image, style]} />;
};

IconView.propTypes = {
  source: PropTypes.number.isRequired,
  style: PropTypes.number,
};

IconView.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  image: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
    marginTop: scale(10),
    marginBottom: scale(50),
  },
});

export default IconView;
