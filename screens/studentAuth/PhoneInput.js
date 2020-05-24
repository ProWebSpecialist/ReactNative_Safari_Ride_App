import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { studentSelector } from '../../selectors';
import {
  CustomInput,
  ActionButtonView,
  NavIconView,
  Loading,
  PrimaryButton,
} from '../../components';
import StudentAuthActions from '../../reducers/StudentAuthReducer';

class PhoneInput extends Component {
  constructor(props) {
    super(props);
    this.onGetCode = this.onGetCode.bind(this);
    this.state = {
      phone: props.profile.phone,
    };
  }

  onGetCode() {
    const { profile } = this.props;
    const { email } = profile;
    const { phone } = this.state;
    const { requestVerifyPhone } = this.props;
    const { setStudentAuth } = this.props;
    setStudentAuth(this.state);
    requestVerifyPhone(email, phone);
  }

  render() {
    const { status } = this.props;
    const { phone } = this.state;
    return (
      <>
        <NavIconView
          title="Verify Phone Number"
          icon={require('../../assets/checkmark.png')}
        >
          <CustomInput
            placeholder="Phone Number"
            value={phone}
            keyboardType="numeric"
            returnKeyType="done"
            style={{ backgroundColor: '#dedede', color: '#adadad' }}
            onChangeText={text => {
              this.setState({ phone: text });
            }}
          />
          <ActionButtonView>
            <PrimaryButton text="Get Code" onPress={this.onGetCode} />
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
    profile: studentStore.profile,
    status: studentStore.status,
  };
}

const mapDispatchToProps = dispatch => ({
  requestVerifyPhone: (email, phone) => {
    dispatch(StudentAuthActions.requestVerifyPhone(email, phone));
  },
  setStudentAuth: data => dispatch(StudentAuthActions.setStudentAuth(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);

PhoneInput.propTypes = {
  profile: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired,
  requestVerifyPhone: PropTypes.func.isRequired,
  setStudentAuth: PropTypes.func.isRequired,
};
