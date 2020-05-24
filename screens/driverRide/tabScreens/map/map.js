import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import PropTypes from 'prop-types';
import StudentAuthActions from '../../../../reducers/StudentAuthReducer';
import { studentRideSelector } from '../../../../selectors';

const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';

Geocoder.init(GOOGLE_API_KEY);
class DriverMap extends PureComponent {

  constructor() {
    super();
    this.state = {
      myLocation: {
        longitude: -122,
        latitude: 37.785,
        latitudeDelta: 0.05,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords;
      const { myLocation } = this.state;
      const { setLocation } = this.props;
      this.setState({ myLocation: { ...myLocation, longitude, latitude } });
      setLocation(position.coords);
    });
  }

  renderDirection() {
    const { rideStatus, selectedRide } = this.props;
    const { myLocation } = this.state;
    if (!selectedRide || rideStatus < 2 || rideStatus > 3) {
      return null;
    }
    return (
      <MapViewDirections
        origin={{
          latitude: selectedRide.latitude,
          longitude: selectedRide.longitude,
        }}
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
    // const { rides } = this.props;
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
              <Text>
                Current Location
              </Text>
            </MapView.Callout>
          </MapView.Marker>
          
        </MapView>
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

DriverMap.propTypes = {
  setLocation: PropTypes.func.isRequired,
  rides: PropTypes.array.isRequired,
  rideStatus: PropTypes.number.isRequired,
  selectedRide: PropTypes.object,
};

DriverMap.defaultProps = {
  selectedRide: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverMap);