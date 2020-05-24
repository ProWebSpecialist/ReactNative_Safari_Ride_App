import React, { Component } from 'react';
import { View } from 'react-native';

import DriverMap from './DriverMap';
import DriverRequest from './DriverRequest';

class DriverRide extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
            <DriverMap />
            <DriverRequest />
      </View>
    );
  }
}

export default DriverRide;
