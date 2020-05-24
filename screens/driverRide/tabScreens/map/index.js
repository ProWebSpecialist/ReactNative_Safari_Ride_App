import { createStackNavigator } from 'react-navigation';
import DriverMapScreen from './map';

const driverMapStack = createStackNavigator(
  {
    driverMap: DriverMapScreen,
  },
  {
    headerMode: 'none',
  },
);

export default driverMapStack;
