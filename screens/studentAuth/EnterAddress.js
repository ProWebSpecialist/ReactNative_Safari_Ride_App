import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showError } from '../../utils/Notification';

import {
  CustomInput,
  ActionButtonView,
  NavIconView,
  PrimaryButton,
} from '../../components';
import StudentAuthActions from '../../reducers/StudentAuthReducer';

class EnterAddress extends Component {
  constructor() {
    super();
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      this.state = {
        firstAddress: '',
        secondAddress: '',
        city: '',
        state: '',
        zip: '',
      };
    } else {
      this.state = {
        firstAddress: '',
        secondAddress: '',
        city: '',
        state: '',
        zip: '',
      };
    }
    this.onNext = this.onNext.bind(this);
  }

  onNext() {
    if(this.state.firstAddress ==''){
      showError("Please input first address.");
      return;
    }

    if(this.state.city ==''){
      showError("Please input city.");
      return;
    }

    if(this.state.state ==''){
      showError("Please input state.");
      return;
    }

    if(this.state.zip ==''){
      showError("Please input zip code.");
      return;
    }
    const { navigation, setStudentAuth } = this.props;
    setStudentAuth(this.state);
    // eslint-disable-next-line no-undef
    navigation.navigate('phoneInput');
  }

  render() {
    const { firstAddress, secondAddress, city, state, zip } = this.state;
    return (
      <NavIconView title="Student Sign Up">
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <CustomInput
            placeholder="Address Line 1"
            onChangeText={text => {
              this.setState({ firstAddress: text });
            }}
            value={firstAddress}
          />
          <CustomInput
            placeholder="Address Line 2"
            onChangeText={text => {
              this.setState({ secondAddress: text });
            }}
            value={secondAddress}
          />
          <CustomInput
            placeholder="City"
            onChangeText={text => {
              this.setState({ city: text });
            }}
            value={city}
          />
          <CustomInput
            placeholder="State"
            value={state}
            onChangeText={text => {
              this.setState({ state: text });
            }}
          />
          <CustomInput
            placeholder="ZIP"
            onChangeText={text => {
              this.setState({ zip: text });
            }}
            value={zip}
            keyboardType="numeric"
            returnKeyType="done"
          />
          <ActionButtonView>
            <PrimaryButton text="Next" onPress={this.onNext} />
          </ActionButtonView>
        </KeyboardAvoidingView>
      </NavIconView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setStudentAuth: data => dispatch(StudentAuthActions.setStudentAuth(data)),
});

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
});

export default connect(null, mapDispatchToProps)(EnterAddress);

EnterAddress.propTypes = {
  navigation: PropTypes.object.isRequired,
  setStudentAuth: PropTypes.func.isRequired,
};
