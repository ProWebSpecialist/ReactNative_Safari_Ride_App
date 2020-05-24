import { createStackNavigator } from 'react-navigation';
import DriverRequest from './request';

const driverRequestStack = createStackNavigator(
  {
    driver_request: DriverRequest,
  },
  {
    headerMode: 'none',
  },
);

export default driverRequestStack;
