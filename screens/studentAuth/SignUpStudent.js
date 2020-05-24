import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scale from '../../utils/scale';
import { showError } from '../../utils/Notification';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {
  CustomInput,
  ActionButtonView,
  NavIconView,
  PrimaryButton,
} from '../../components';
import StudentAuthActions from '../../reducers/StudentAuthReducer';

// var radio_props = [
//   {label: 'drive', value: "drive" },
//   {label: 'ride', value: "ride" }
// ];

class SignUpStudent extends Component {
  constructor() {
    super();
    // eslint-disable-next-line no-undef
    // if (__DEV__) {
    //   this.state = {
    //     firstName: 'Cameron',
    //     lastName: 'Sim',
    //     email: 'cameron@decisivelabs.com',
    //     phone: '+19176407630',
    //   };
    // } else {
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: 'ride'
      };
      
    //}
    this.onNext = this.onNext.bind(this);
  }

  onNext() {
    if(this.state.email == '' || this.state.name =='' || this.state.phone == ''){
      // alert("Please input all fields.");
      showError("Please input all fields.")
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false)
    {
      showError("Email is Not Correct");
      return;
    }
    
    if(this.state.userType == ''){
      showError("Please select type");
      return;
    }
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if(regexp.test(this.state.phone) ===false){
      showError("Phone Number is Not Correct");
       return;
    }

    const { navigation, setStudentAuth } = this.props;
    setStudentAuth(this.state);
    navigation.navigate('enterAddress');
  }

  onRide(){
    this.setState({userType:'ride'});
  }

  onDriver(){
    this.setState({userType:'driver'});
  }

  render() {
    const { firstName, lastName, email, phone } = this.state;
    return (
      <NavIconView title="Student Sign Up">
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <CustomInput
            placeholder="First Name"
            onChangeText={text => {
              this.setState({ firstName: text });
            }}
            value={firstName}
          />
          <CustomInput
            placeholder="Last Name"
            onChangeText={text => {
              this.setState({ lastName: text });
            }}
            value={lastName}
          />
          <CustomInput
            placeholder="Email Address"
            onChangeText={text => {
              this.setState({ email: text });
            }}
            value={email}
          />
          <CustomInput
            placeholder="Phone Number"
            onChangeText={text => {
              this.setState({ phone: text });
            }}
            value={phone}
            keyboardType="numeric"
            returnKeyType="done"
          />

          <TouchableOpacity style={{ height: scale(43), width: scale(300), alignSelf: 'center', justifyContent:'center', backgroundColor:'green', alignItems:'center' }} onPress={()=>this.onRide()}>
              <Text style={styles.label}>Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: scale(43), width: scale(300), backgroundColor:'grey',alignItems:'center', justifyContent:'center', alignSelf: 'center', marginTop: 10 }} onPress={()=>this.onDriver()}>
              <Text style={styles.label}>Driver</Text>
          </TouchableOpacity>

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

export default connect(null, mapDispatchToProps)(SignUpStudent);

SignUpStudent.propTypes = {
  navigation: PropTypes.object.isRequired,
  setStudentAuth: PropTypes.func.isRequired,
};
