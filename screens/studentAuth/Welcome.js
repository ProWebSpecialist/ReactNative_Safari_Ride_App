import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { NavIconView, ActionButtonView, PrimaryButton } from '../../components';
import scale from '../../utils/scale';

class Welcome extends Component {
  constructor() {
    super();
    this.onNext = this.onNext.bind(this);
  }

  onNext() {
    const { navigation } = this.props;
    navigation.navigate('studentRide');
  }

  render() {
    return (
      <NavIconView
        title="Sign Up Complete"
        icon={require('../../assets/car.png')}
      >
        <Text style={styles.content}>
          Welcome to
          {'\n'}
          Safe Rides!
        </Text>
        <ActionButtonView>
          <PrimaryButton text="Get Started" onPress={this.onNext} />
        </ActionButtonView>
      </NavIconView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: scale(32),
    color: '#5e6069',
    marginTop: scale(15),
  },
});

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Welcome;
