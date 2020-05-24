import React, { Component } from 'react';
import { Text, Image, StyleSheet, View} from 'react-native';
// import { isEmulator } from 'react-native-device-info';
// import { Card } from 'native-base';
import { connect } from 'react-redux';
// import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
// import DriverButton from './DriverButton';
import { driverRideSelector, driverSelector, userSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
import { NavIconView, ActionButtonView, PrimaryButton } from '../../../../components';
import scale from '../../../../utils/scale';
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';

Geocoder.init(GOOGLE_API_KEY);
class Summary extends Component {
  constructor() {
    super();
    this.state = {
      cardImage: null,
      pickaddress: '',
      current:''
    };
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>{
      const { longitude, latitude } = position.coords;
      Geocoder.from(latitude,longitude).then(
        json => {
          var address = json.results[0].address_components[0].long_name +' ' 
          + json.results[0].address_components[1].long_name + ' ' + json.results[0].address_components[2].long_name 
          + ' ' + json.results[0].address_components[3].long_name;
          //  + json.results[0].address_components[4].short_name
          this.setState({current:address});
        },
        error => {
          alert(error);
        }
      );
    },error=>{
    });
    const { selectedRide } = this.props;
    Geocoder.from(selectedRide.request_latitude, selectedRide.request_longitude).then(
      json => {
        this.setState({pickaddress:json.results[0].formatted_address});
      },
      error => {
       console.log(error);
      }
    );
  }
  onClose(){
    const { summaryRide, selectedRide, navigation } = this.props;
    // summaryRide(selectedRide.rideId);
    navigation.navigate('driverRide');
  }

  render() {
    const { cardImage } = this.state;
    const { profile } = this.props;
    
    return (
      <NavIconView
        title="Safe Ride Summary"
      >
          <View
            style={{
              height: scale(80),
              width:'80%',
              paddingTop: scale(1),
              paddingBottom: scale(1),
            }}
          >
            
            <View style={{padding:10}}>
              <Text style={styles.txt}>Pickup Address:</Text>
              <Text style={styles.txt}>{this.state.pickaddress}</Text>
              <Text style={{fontFamily: 'Poppins', fontSize: scale(15), color: '#5e6069', marginTop:30}}>Destination Address:</Text>
              <Text style={styles.txt}>{this.state.current}</Text>
              <Text style={{fontFamily: 'Poppins', fontSize: scale(15), color: '#5e6069', marginTop:30}}>Rider Details</Text>

            </View>
          </View>
          <View style={{ flex: 1, width:'100%', marginTop:scale(120), padding:scale(10), flexDirection:'row' }}>
            <View
                style={{
                height: scale(90),
                paddingTop: scale(11),
                paddingBottom: scale(11),
                }}
            >
                <Image
                  style={{
                      width: scale(68),
                      height: scale(68),
                      marginLeft:30,
                      marginRight:10,
                      backgroundColor: 'white',
                      borderRadius: 34,
                  }}
                  // source={require('../../../../assets/driverimage.png')}
                  source={{uri: profile.profileUrl}}
                  resizeMode="contain"
                />
                <Text style={{fontFamily: 'Poppins', marginLeft:30, color: '#5e6069', fontSize: scale(14)}}>{`${profile.firstName} ${profile.lastName}`}</Text>
            </View>
            <View style={{padding:15, width:scale(80)}}>
                
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
                    borderRadius: 4,
                }}
                source={require('../../../../assets/carImage.png')}
                resizeMode="contain"
                />
            </View>
        </View>
       <ActionButtonView>
            <PrimaryButton text="Close" onPress={this.onClose} />
        </ActionButtonView>
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
    marginTop:10,
    padding: scale(8),
  },
  txt: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(15),
  },
});

Summary.propTypes = {
    takeRide: PropTypes.func.isRequired,
    summaryRide: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.object,
    selectedRide : PropTypes.object
  };
  
  Summary.defaultProps = {
    selectedRide: null,
    location: null,
  };
  
  function mapStateToProps(state) {
    const studentStore = driverSelector(state);
    const rideStore = driverRideSelector(state);
    const userStore = userSelector(state);
    return {
      profile: studentStore.profile,
      user: userStore.user,
      location: studentStore.location,
      selectedRide : rideStore.selected
    };
  }
  
  const mapDispatchToProps = dispatch => ({
    
    takeRide: () => {
      dispatch(DriverRideActions.takeRide());
    },
    summaryRide: (id) => {
      dispatch(DriverRideActions.summaryRide(id));
    },
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Summary);