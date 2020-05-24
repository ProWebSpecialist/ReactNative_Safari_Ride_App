import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import PropTypes from 'prop-types';
import StudentRideActions from '../../../reducers/StudentRideReducer';
import StudentAuthActions from '../../../reducers/StudentAuthReducer';
import { studentRideSelector } from '../../../selectors';
const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';

Geocoder.init(GOOGLE_API_KEY);

class Map extends Component {
  constructor() {
    super();
    this.state = {
      myLocation: {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.0421,
      },
      longitude:0,
      latitude:0,
      notificationMsg:""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      const { myLocation } = this.state;
      const { setLocation  } = this.props;
      this.setState({ myLocation: { longitude: longitude, latitude:latitude,latitudeDelta: 0.05,
        longitudeDelta: 0.0421 }, longitude:longitude, latitude:latitude });
      setLocation(position.coords);
    });
    const { rides } = this.props;
    this.setState({notificationMsg: rides.length + " Drivers Nearby"});
  }
  renderDirection() {
    const { rideStatus, selectedRide } = this.props;
    const { longitude, latitude, myLocation } = this.state;
    if (!selectedRide || rideStatus < 2 || rideStatus > 3) {
      return null;
    }
    if(selectedRide && rideStatus == 2){
      const { rideId } = selectedRide;
      setInterval(()=>{
        fetch(`https://api.mapsosaferides.com/ride?rideId=${rideId}`)
        .then((response)=>response.json())
        .then(responseJson=> {
          if(responseJson.status == "enroute"){
            let R = 6378137; // Earth’s mean radius in meter
            let dLat = parseFloat(responseJson.current_latitude) - parseFloat(latitude);
            let dLong = parseFloat(responseJson.current_longitude) - parseFloat(longitude);
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latitude) * Math.cos(responseJson.latitude) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = R * c;
            console.log("R:",R, "c:",c);
            let distance =  parseInt(d / 1000 ); // returns the distance in meter
            let minutes = distance / 60;
            console.log("distance:", distance);
            this.setState({notificationMsg:`Driver arriving in ${minutes} minutes`});
          }
         
       })
        .catch(error =>{
          console.log(error);
        })
      }, 10000)
    }
    return (
      <MapViewDirections
        origin={{
          latitude: selectedRide.latitude,
          longitude: selectedRide.longitude,
        }}
        // origin={{
        //   latitude: 37.785834,
        //   longitude: -122.406417,
        // }}
        destination={myLocation}
        strokeWidth={5}
        strokeColor="#587adb"
        // provider="google"
        apikey={GOOGLE_API_KEY}
      />
    );
  }

  render() {
    const { myLocation } = this.state;
    const { rides } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={myLocation}
          region={myLocation}
          scrollEnabled
          zoomEnabled
          showsUserLocation
          zoomControlEnabled
        >
          <MapView.Marker
            draggable={false}
            pinColor="#4196ea"
            coordinate={myLocation}
          >
            <MapView.Callout>
              <Text>Current Location</Text>
            </MapView.Callout>
          </MapView.Marker>

          {rides.map(ride => (
            <MapView.Marker
              key={ride.rideId}
              draggable={false}
              // title={ride.fullname}
              // pinColor="#4196ea"
              image={require('../../../assets/marker-128.png')}    
              coordinate={{
                latitude: ride.latitude,
                longitude: ride.longitude,
              }}
            >
              <MapView.Callout>
                <Text>{ride.fullname}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}

          {this.renderDirection()}
        </MapView>
        <View style={styles.notification}>
            <Text style={styles.notificationText}>{this.state.notificationMsg}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  notification:{
    position:"absolute",
    bottom:100,
    width:"100%",
    
  },
  notificationText:{
    backgroundColor:"#f4f8fb",
    marginRight:20,
    marginLeft:20,
    paddingTop:15,
    paddingBottom:15,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  const rideStore = studentRideSelector(state);
  return {
    status: rideStore.status,
    rides: rideStore.rides,
    selectedRide: rideStore.selected,
    rideStatus: rideStore.rideStatus,
  };
}

const mapDispatchToProps = dispatch => ({
  setLocation: (email, password) => {
    dispatch(StudentAuthActions.setLocation(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  setLocation: PropTypes.func.isRequired,
  rides: PropTypes.array.isRequired,
  rideStatus: PropTypes.number.isRequired,
  selectedRide: PropTypes.object,
};

Map.defaultProps = {
  selectedRide: null,
};
