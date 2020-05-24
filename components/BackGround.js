import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const BackGround = ({ source }) => {
  return <ImageBackground source={source} style={styles.backgroundImage} />;
};

BackGround.propTypes = {
  source: PropTypes.number,
};
BackGround.defaultProps = {
  source: require('../assets/images/sponserbg.jpg'),
};
const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
});

export default BackGround;
