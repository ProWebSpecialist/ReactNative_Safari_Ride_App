import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import scale from '../../utils/scale';
import {
  BackGround,
  ActionButtonView,
  SecondaryButton,
} from '../../components';

const RegisterButton = ({ source, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
      <Image source={source} style={styles.btnImage} />
    </TouchableOpacity>
  );
};

RegisterButton.propTypes = {
  style: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  source: PropTypes.number.isRequired,
};

class AuthOption extends Component {
  constructor() {
    super();
    this.loginStudent = this.loginStudent.bind(this);
    this.signUpStudent = this.signUpStudent.bind(this);
    this.driverScreens = this.driverScreens.bind(this);
  }

  loginStudent() {
    const { navigation } = this.props;
    navigation.navigate('signInStudent'); // driverRide, signInStudent
  }

  signUpStudent() {
    const { navigation } = this.props;
    navigation.navigate('signUpStudent');
  }

  driverScreens() {
    const { navigation } = this.props;
    navigation.navigate('driverRide');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackGround source={require('../../assets/images/imagebg.jpg')} />
        <RegisterButton
          style={{ marginTop: scale(260) }}
          source={require('../../assets/signmeup.png')}
          onPress={this.signUpStudent}
        />
        <RegisterButton
          style={{ marginTop: scale(14) }}
          source={require('../../assets/loginBtn.png')} 
          onPress={this.loginStudent}
        />
         {/* <RegisterButton
          style={{ marginTop: scale(14) }}
          source={require('../../assets/iwanttodrive.png')} //replace with login button image
          onPress={this.driverScreens}
        /> */}
        {/* <ActionButtonView>
          <SecondaryButton
            text="Already got a login?"
            onPress={this.loginStudent}
          />
        </ActionButtonView> */}
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  btnImage: {
    width: screenWidth - scale(80),
    height: scale(66),
    // resizeMode: 'contain',
  },
  btnContainer: {
    alignSelf: 'center',
    zIndex: 9999,
  },
  txtLogin: {
    fontSize: scale(20),
    fontWeight: '500',
    color: '#5e6069',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

AuthOption.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AuthOption;
