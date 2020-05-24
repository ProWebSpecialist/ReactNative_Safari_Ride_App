import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DriverButton from './DriverButton';
import { driverRideSelector, driverSelector, userSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
import scale from '../../../../utils/scale';
import Geocoder from 'react-native-geocoding';
import { select } from 'redux-saga/effects';
const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';
Geocoder.init(GOOGLE_API_KEY);
class DriverRequest extends Component {
  constructor(props) {
    super(props);
    this.onConfirmRide = this.onConfirmRide.bind(this);
    this.onPickupRide = this.onPickupRide.bind(this);
    this.onDriverRide = this.onDriverRide.bind(this);
    this.state = {
      ...props,
      rideStatus: 0,
      stats:false,
      address1:'',
      address2:'',
      address3:''
    }
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
        // console.log(error);
        this.setState({
          address1: '',
          address2: '',
          address3: '',
        })
      }
    );

    // Call Update Location
    setInterval(()=>{
      navigator.geolocation.getCurrentPosition(position => {
        const { longitude, latitude } = position.coords; 
        const { selectedRide } = this.state;
        const { rideId } = selectedRide;
        fetch(`https://api.mapsosaferides.com/ride/updatelocation?rideId=${rideId}&longitude=${longitude}&latitude=${latitude}`)
        .catch((error) => {
          console.error(error);
        });
      });
    }, 10000);
    
    
  }
  onPickupRide() {
    const { pickupRide, selectedRide } = this.props;
    pickupRide(selectedRide.request_longitude, selectedRide.request_latitude, selectedRide.rideId);
  }

  onConfirmRide() {
    this.setState({ rideStatus: 1})
    const { driverConfirm, profile, selectedRide } = this.props;
    driverConfirm(profile.email, selectedRide.request_longitude, selectedRide.request_latitude, selectedRide.rideId);

  }

  onDriverRide() {
    this.setState({ rideStatus: 2, stats: true})
  }

  renderButton() {
      const { rideStatus } = this.state;
      if (rideStatus === 0) {
        return (
          <DriverButton
            text="Confirm Ride"
            action={this.onConfirmRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        );
      } else if (rideStatus == 1) {
        return (
          <DriverButton
            text="Driver to Rider"
            action={this.onDriverRide}
            style={{ backgroundColor: '#000000' }}
          />
        );
      } else if (rideStatus === 2) {
        return (
          <DriverButton
            text="Confirm Pickup"
            action={this.onPickupRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        );
      }
    return null;
  }

  render() {
    const { selectedRide, profile, user } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor:'white', width:'100%', flexDirection:'row' }}>
          <View
            style={{
              height: scale(90),
              width: '20%',
              paddingTop: scale(11),
              paddingBottom: scale(11),
            }}
          >
            <Image
              style={{
                width: scale(68),
                height: scale(68),
                marginLeft:10,
                marginRight:10,
                backgroundColor: 'white',
                borderRadius: 34,
              }}
              source={{uri: profile.profileUrl}}
              resizeMode="contain"
            />
          </View>
          {!this.state.stats && <View style={{padding:10, marginLeft:10, width: '80%'}}>
            <Text style={styles.text}>Pick up {this.props.selectedRide.fullname} at:</Text>
            <Text style={styles.text}>{this.state.address1}</Text>
            <Text style={styles.text}>{this.state.address2}</Text>
            <Text style={styles.text}>{this.state.address3}</Text>

          </View>}
          {this.state.stats && <View style={{width: '80%', flexDirection:'row'}}><View style={{padding:10, width: '50%'}}>
            <Text style={styles.text}>Driver to:</Text>
            <Text style={styles.text}>{this.state.address1}</Text>
            <Text style={styles.text}>{this.state.address2} &nbsp; {this.state.address3}</Text>
            
          </View>
          <View
            style={{
              height: scale(90),
              width: '50%',
              paddingLeft:15,
              paddingTop: scale(11),
              paddingBottom: scale(11),
            }}
          >
            <Image
              style={{
                width: scale(108),
                height: scale(68),
                marginLeft:10,
                marginRight:10,
                backgroundColor: 'white',
                borderRadius: 34,
              }}
              source={require('../../../../assets/carImage.png')}
              resizeMode="contain"
            />
          </View></View>}
        </View>
        {this.renderButton()}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: 0, // for center align
    width: '100%',
    alignSelf: 'flex-end', // for align to right
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(14),
  },
});

DriverRequest.propTypes = {
  driverConfirm: PropTypes.func.isRequired,
  takeRide: PropTypes.func.isRequired,
  pickupRide: PropTypes.func.isRequired,
  rideStatus: PropTypes.number.isRequired,
  selectedRide: PropTypes.object,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  location: PropTypes.object,
};

DriverRequest.defaultProps = {
  selectedRide: null,
  location: null,
};

function mapStateToProps(state) {
  const rideStore = driverRideSelector(state);
  const studentStore = driverSelector(state);
  const userStore = userSelector(state);
  return {
    selectedRide: rideStore.selected,
    rideStatus: rideStore.rideStatus,
    profile: studentStore.profile,
    user: userStore.user,
    location: studentStore.location,
  };
}

const mapDispatchToProps = dispatch => ({
  driverConfirm: (email, longitude, latitude, id) => {
    dispatch(DriverRideActions.driverConfirm(email, longitude, latitude, id));
  },
  takeRide: () => {
    dispatch(DriverRideActions.takeRide());
  },
  pickupRide: (longitude, latitude, id) => {
    dispatch(DriverRideActions.pickupRide(longitude, latitude, id));
  },
  updateLocation:(rideId, latitude, longitude) => {
    dispatch(DriverRideActions.updateDriverLocation(rideId, latitude, longitude));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverRequest);
