import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const ActionButtonView = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

ActionButtonView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: scale(104),
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});

export default ActionButtonView;
