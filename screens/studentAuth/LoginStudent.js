import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { View } from 'react-native';
import { studentSelector } from '../../selectors';
import StudentAuthActions from '../../reducers/StudentAuthReducer';
import {
  NavIconView,
  CustomInput,
  ActionButtonView,
  PrimaryButton,
  SecondaryButton,
  Loading,
} from '../../components';
import scale from '../../utils/scale';

class LoginStudent extends Component {
  constructor() {
    super();
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      this.state = {
        email: 'test@test.com',
        password: '1234567890',
      };
    } else {
      this.state = {
        email: '',
        password:'',
      };
    }
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onNext() {
    const { email, password } = this.state;
    const { requestLogin } = this.props;
    requestLogin(email, password);
  }

  onBack() {
    const { navigation } = this.props;
    navigation.pop();
  }

  render() {
    const { email, password } = this.state;
    const { status } = this.props;
    return (
      <>
        <NavIconView title="Login">
          <CustomInput
            placeholder="First Name"
            onChangeText={text => {
              this.setState({ email: text });
            }}
            value={email}
          />
          <CustomInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />
          <ActionButtonView>
            <PrimaryButton text="Login" onPress={this.onNext} />
            <View style={{ height: scale(32) }} />
            <SecondaryButton text="Cancel" onPress={this.onBack} />
          </ActionButtonView>
        </NavIconView>
        {status === 1 && <Loading />}
      </>
    );
  }
}

function mapStateToProps(state) {
  const studentStore = studentSelector(state);
  return {
    // studentAuth: studentStore.profile,
    status: studentStore.status,
  };
}

const mapDispatchToProps = dispatch => ({
  requestVerifyPhone: (email, phone) => {
    dispatch(StudentAuthActions.requestVerifyPhone(email, phone));
  },
  requestLogin: (email, password) => {
    dispatch(StudentAuthActions.requestLogin(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginStudent);

LoginStudent.propTypes = {
  navigation: PropTypes.object.isRequired,
  requestLogin: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
};
