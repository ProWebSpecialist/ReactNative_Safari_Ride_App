import { createStackNavigator } from 'react-navigation';
import DriverRide from './driverRide';
import DriverConfirm from './DriverConfirm';
import DriverDest from './driverDest';
// import Summary from './summary';

const mainRideStack = createStackNavigator(
  {
    driverRide: DriverRide,
    driverDest: DriverDest,
    driverConfirm: DriverConfirm,
    // summary: Summary,
  },
  {
    headerMode: 'none',
  },
);

export default mainRideStack;
