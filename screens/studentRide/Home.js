import React, { Component } from 'react';
import { View } from 'react-native';

import StudentMapView from './home/StudentMapView';
import RideRequest from './home/RideRequest';

// eslint-disable-next-line react/prefer-stateless-function
class StudentRide extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StudentMapView />
        <RideRequest />
      </View>
    );
  }
}

export default StudentRide;
