import React, { Component } from 'react';
import { View } from 'react-native';

import DriverMap from './DriverMap';
import DestRequest from './DestRequest';
import NavMenuView from '../../../../components/NavMenuView';

class DriverDest extends Component {
  
  render() {
    return (
      <View style={{ flex: 1 }}>
          <DriverMap />
          <DestRequest />
      </View>
    );
  }
}

export default DriverDest;
