import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';

const screenWidth = Math.round(Dimensions.get('window').width);

const PrimaryButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={onPress}>
      <ImageBackground
        source={require('../assets/images/action_btn.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.label}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

PrimaryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: screenWidth - scale(80),
    height: scale(43),
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: scale(17),
  },
});

export default PrimaryButton;
