import { createStackNavigator } from 'react-navigation';
import DriverSettingScreen from './setting';

const driverSettingStack = createStackNavigator(
  {
    driver_setting: DriverSettingScreen,
  },
  {
    headerMode: 'none',
  },
);

export default driverSettingStack;
