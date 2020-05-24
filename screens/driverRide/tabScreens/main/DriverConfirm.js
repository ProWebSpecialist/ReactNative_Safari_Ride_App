import React, { Component } from 'react';
import { Text, Image, StyleSheet, View} from 'react-native';
import { Card } from 'native-base';
import { connect } from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import DriverButton from './DriverButton';
import {driverRideSelector, driverSelector, userSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
// import ImagePicker from 'react-native-image-crop-picker';

import { NavIconView, ActionButtonView, PrimaryButton } from '../../../../components';
import scale from '../../../../utils/scale';
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';
Geocoder.init(GOOGLE_API_KEY);
class DriverConfirm extends Component {
  constructor() {
    super();
    this.state = {
      cardImage: null,
      address1:'',
      address2:'',
      address3:''
    };
    this.onConfirmRide = this.onConfirmRide.bind(this);
  }

  componentDidMount(){
    const { selectedRide } = this.props;
    Geocoder.from(selectedRide.request_latitude, selectedRide.request_longitude).then(
      json => {
        var address3 = json.results[0].address_components[0].long_name; 
        var address2 = json.results[0].address_components[1].long_name;
        var address1 = json.results[0].address_components[2].long_name; 
        this.setState({
          address1: address1,
          address2: address2,
          address3: address3,
        });
      },
      error => {
        alert(error);
      }
    );
  }

  onConfirmRide(){
    this.props.navigation.navigate("driverDest");
  }

  displayStudendId() {
    const { cardImage } = this.state;
    if (cardImage) {
      return (
        <Image
          source={{
            uri: cardImage.path,
            width: cardImage.width,
            height: cardImage.height,
            mime: cardImage.mime,
          }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: scale(8),
          }}
        />
      );
    }
    return <Image
          source = {require('../../../../assets/carImage.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: scale(8),
          }}
        />;
  }

  render() {
    const { cardImage } = this.state;
    const { profile } = this.props;
    return (
      <NavIconView
      >
          <View
            style={{
              height: scale(80),
              width:'80%',
              paddingTop: scale(1),
              paddingBottom: scale(1),
              flexDirection:'row'
            }}
          >
            <Image
              style={{
                width: scale(68),
                height: scale(68),
                backgroundColor: 'white',
                borderRadius: 34,
              }}
              source= {{uri: profile.profileUrl}}
              // source={require('../../../../assets/person1.png')}
              resizeMode="contain"
            />
            <View style={{padding:10}}>
              <Text style={{fontSize:20, fontWeight:600}}>{`${profile.firstName} ${profile.lastName}`}</Text>
              <Text style={styles.text}>{this.state.address1}</Text>
              <Text style={styles.text}>{this.state.address2}</Text>
              <Text style={styles.text}>{this.state.address3}</Text>

            </View>
          </View>
        <Card style={styles.card}>{this.displayStudendId()}</Card>
        <View style={{position: 'absolute',bottom: 0, width: '100%', alignSelf: 'flex-end'}}>
          <DriverButton
            text="Confirm Identify"
            action={this.onConfirmRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        </View>
      </NavIconView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: scale(204),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    padding: scale(8),
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(14),
  },
});

DriverConfirm.propTypes = {
    takeRide: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.object,
  };
  
  DriverConfirm.defaultProps = {
    selectedRide: null,
    location: null,
  };
  
  function mapStateToProps(state) {
    const studentStore = driverSelector(state);
    const rideStore = driverRideSelector(state);
    const userStore = userSelector(state);
    return {
      selectedRide : rideStore.selected,
      profile: studentStore.profile,
      user: userStore.user,
      location: studentStore.location,
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    takeRide: () => {
      dispatch(DriverRideActions.takeRide());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DriverConfirm);