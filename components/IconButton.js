import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import scale from '../utils/scale';

const IconButton = ({ size = 50, type, name, iconStyle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, { width: scale(size), height: scale(size) }]}
    >
      <Icon type={type} name={name} style={[styles.iconStyle, iconStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: scale(30),
    resizeMode: 'contain',
  },
});

export default IconButton;
