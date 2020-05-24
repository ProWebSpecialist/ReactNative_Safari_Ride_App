import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import RideComplete from './RideComplete';

const studentRideStack = createStackNavigator(
  {
    studentHome: Home,
    complete: RideComplete,
  },
  {
    headerMode: 'none',
  },
);

export default studentRideStack;
