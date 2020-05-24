import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// status 0: none
// status 1: loading
// status 2: success
// status 3: fail

const { Types, Creators } = createActions({
  saveRides: ['rides'],
  getList: ['list'],
  setUser: ['user'],
  requestRide: ['name', 'phone', 'email', 'longitude', 'latitude'],
  successRide: ['ride'],
  failureRide: ['error'],
  // Dummy events for test
  summaryRide: ['rideId'],
  takeRide: ['ride'],
  driverConfirm: ['email', 'longitude', 'latitude', 'id'],
  pickupRide: ['longitude', 'latitude', 'id'],
  confirmRide: ['ride'],
  completeRide: ['longitude', 'latitude', 'id'],
});

export const DriverRideTypes = Types;
export default Creators;

const saveRides = (state, { rides }) => state.merge({ rides });
const getList = (state, { list }) => { 
  return state.merge({ list }); 
};

const requestRide = state => state.merge({ rideStatus: 1 });
const driverConfirm = state => state.merge({ rideStatus: 1 });

const setUser = (state, { user }) => state.merge({ user });

const successRide = (state, { ride }) => state.merge({ selected: ride });
const failureRide = (state, { error }) => state.merge({ error });

const summaryRide = state => state.merge({ rideStatus: 6 });

const takeRide = state => state.merge({ rideStatus: 3});
const pickupRide = state => state.merge({ rideStatus: 3});

const confirmRide = state => state.merge({ rideStatus: 4});
const completeRide = state => state.merge({ rideStatus: 5 });

// const updateLocation = state => state;

export const INITIAL_STATE = Immutable({
  rides: [],
  list: [],
  user: null,
  status: 0,
  error: '',
  selected: null,
  rideStatus: 0,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_RIDE]: requestRide,
  [Types.SET_USER]: setUser,
  [Types.SUCCESS_RIDE]: successRide,
  [Types.FAILURE_RIDE]: failureRide,

  [Types.SAVE_RIDES]: saveRides,
  [Types.GET_LIST]: getList,

  [Types.SUMMARY_RIDE]: summaryRide,
  [Types.TAKE_RIDE]: takeRide,
  [Types.DRIVER_CONFIRM]: driverConfirm,
  [Types.PICKUP_RIDE]: pickupRide,
  [Types.CONFIRM_RIDE]: confirmRide,
  [Types.COMPLETE_RIDE]: completeRide,
});
