import { createStackNavigator } from 'react-navigation';

import Splash1 from './startView/Splash1';
import Splash2 from './startView/Splash2';
import AuthOption from './startView/AuthOption';

import StudentStack from './studentAuth';
import LoginStudent from './studentAuth/LoginStudent';
import studentRideStack from './studentRide';
import driverRideStack from './driverRide';

const MainNavigator = createStackNavigator(
  {
    splash1: Splash1,
    splash2: Splash2,
    auth: AuthOption,
    signInStudent: LoginStudent,
    signUpStudent: StudentStack,
    studentRide: studentRideStack,
    driverRide: driverRideStack,
  },
  {
    headerMode: 'none',
  },
);

export default MainNavigator;
