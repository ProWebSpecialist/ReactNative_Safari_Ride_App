import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import DriverRequestStack from './tabScreens/request';
import DriverMapStack from './tabScreens/map';
import DriverProfileStack from './tabScreens/profile';
import DriverSettingStack from './tabScreens/setting';
import DriverTabView from './tabScreens/tabView';
import MainRideStack from './tabScreens/main';
import Summary from './tabScreens/main/summary';

const TabNavigator = createBottomTabNavigator(
  {
    driver_tab_request: DriverRequestStack,
    driver_tab_map: DriverMapStack,
    driver_tab_profile: DriverProfileStack,
    driver_tab_setting: DriverSettingStack,
    mainRideStack: MainRideStack,
  },
  {
    tabBarComponent: DriverTabView,
  },
);

const driverRideStack = createStackNavigator(
  {
    driverHome: TabNavigator,
    summary: Summary,
  },
  {
    headerMode: 'none',
  },
);

export default driverRideStack;
