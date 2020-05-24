import { createStackNavigator } from 'react-navigation';
import DriverProfileScreen from './profile';

const driverProfileStack = createStackNavigator(
  {
    driver_profile: DriverProfileScreen,
  },
  {
    headerMode: 'none',
  },
);

export default driverProfileStack;
