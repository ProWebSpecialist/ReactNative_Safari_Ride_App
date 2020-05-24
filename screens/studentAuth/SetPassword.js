import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  NavIconView,
  CustomInput,
  ActionButtonView,
  Loading,
  PrimaryButton,
} from '../../components';
import StudentAuthActions from '../../reducers/StudentAuthReducer';
import scale from '../../utils/scale';
import { studentSelector } from '../../selectors';

class SetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.onNext = this.onNext.bind(this);
  }

  async onNext() {
    const { requestRegister } = this.props;
    const { password } = this.state;
    requestRegister(password);
  }

  render() {
    const { password, confirmPassword } = this.state;
    const { status } = this.props;
    const isValid = password.length >= 8 && password === confirmPassword;
    return (
      <>
        <NavIconView title="Verify Password">
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <CustomInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <CustomInput
              placeholder="Verity Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => {
                this.setState({ confirmPassword: text });
              }}
            />
            <ActionButtonView>
              {isValid && <PrimaryButton text="Set Password" onPress={this.onNext} />}
            </ActionButtonView>
          </KeyboardAvoidingView>
        </NavIconView>
        {status === 0 && <Loading />}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: scale(102) },
});

function mapStateToProps(state) {
  const studentStore = studentSelector(state);
  return {
    status: studentStore.status,
  };
}
const mapDispatchToProps = dispatch => ({
  requestRegister: password =>
    dispatch(StudentAuthActions.requestRegister(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);

SetPassword.propTypes = {
  status: PropTypes.number.isRequired,
  requestRegister: PropTypes.func.isRequired,
};
