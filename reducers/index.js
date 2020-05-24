import { combineReducers } from 'redux';
import { reducer as studentAuth } from './StudentAuthReducer';
import { reducer as studentRide } from './StudentRideReducer';
import { reducer as driverRide } from './DriverRideReducer';

const rootReducer = combineReducers({
  studentAuth,
  studentRide,
  driverRide,
});

export default rootReducer;
