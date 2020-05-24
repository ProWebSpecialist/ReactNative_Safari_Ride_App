import React, { Component } from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DriverButton from './DriverButton';
import { driverRideSelector, driverSelector, userSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
import StudentRideActions from '../../../../reducers/StudentAuthReducer';
import scale from '../../../../utils/scale';
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';
Geocoder.init(GOOGLE_API_KEY);

class DestRequest extends Component {
  constructor(props) {
    super(props);
    this.onRequestRide = this.onRequestRide.bind(this);
    this.onCompleteRide = this.onCompleteRide.bind(this);
    // this.onArrived = this.onArrived.bind(this);
    this.state = {
      rideStatus: 3,
      address1:'',
      address2:'',
      address3:'',
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
        alert(error);
      }
    );
  }
  onRequestRide() {
    this.setState({ rideStatus: 4})
  }

  onCompleteRide() {
    const { completeRide, user, selectedRide } = this.props;
    navigator.geolocation.getCurrentPosition(position=>{
      const { longitude, latitude } = position.coords;
      completeRide(longitude,latitude, selectedRide.rideId);
    },error=>{
      completeRide(selectedRide.request_longitude, selectedRide.request_latitude, selectedRide.rideId);
    })

  }
 
  renderButton() {
    const { selectedRide } = this.props;
      const { rideStatus } = this.state;
      if (rideStatus === 3) {
        return (
          <DriverButton
            text="Driver to Destination"
            action={this.onRequestRide}
            style={{ backgroundColor: '#000000' }}
          />
        );
      } else if (rideStatus == 4) {
        return (
          <DriverButton
            text="Complete Ride"
            action={this.onCompleteRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        );
      } 
    return null;
  }

  render() {
    const { selectedRide, profile } = this.props;
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
                // source={require('../../../../assets/driverimage.png')}
                resizeMode="contain"
                />
            </View>
            <View style={{padding:10, width:'40%'}}>
              <Text style={styles.text}>Driver to:</Text>
              <Text style={styles.text}>{this.state.address1}</Text>
              <Text style={styles.text}>{this.state.address2} &nbsp; {this.state.address3}</Text>
            </View>
            <View
                style={{
                height: scale(90),
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
            </View>
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

DestRequest.propTypes = {
  requestRide: PropTypes.func.isRequired,
  completeRide: PropTypes.func.isRequired,
  rideStatus: PropTypes.number.isRequired,
  selectedRide: PropTypes.object,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object,
};

DestRequest.defaultProps = {
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
  requestRide: (name, phone, email, longitude, latitude) => {
    dispatch(
      DriverRideActions.requestRide(name, phone, email, longitude, latitude),
    );
  },
  completeRide: (longitude, latitude, id) => {
    dispatch(DriverRideActions.completeRide( longitude, latitude, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DestRequest);
