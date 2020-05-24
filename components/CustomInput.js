import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const CustomInput = ({ style, ...others }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="grey"
      autoCorrect={false}
      autoCapitalize="none"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
    />
  );
};

CustomInput.propTypes = {
  style: PropTypes.object,
};

CustomInput.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  input: {
    height: scale(51),
    width: scale(300),
    backgroundColor: 'white',
    paddingLeft: scale(10),
    color: 'black',
    fontSize: scale(16),
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: scale(3),
    borderRadius: scale(5),
    marginTop: scale(8),
    marginBottom: scale(8),
  },
});

export default CustomInput;
