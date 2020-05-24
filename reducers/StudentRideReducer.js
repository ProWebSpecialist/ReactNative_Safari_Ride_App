import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// status 0: none
// status 1: loading
// status 2: success
// status 3: fail

const { Types, Creators } = createActions({
  saveRides: ['rides'],

  requestRide: ['name', 'phone', 'email', 'longitude', 'latitude'],
  successRide: ['ride'],
  failureRide: ['error'],

  // Dummy events for test
  rideArrived: ['ride'],
  takeRide: ['ride'],
  completeRide: [],
});

export const StudentRideTypes = Types;
export default Creators;

const saveRides = (state, { rides }) => state.merge({ rides });

const requestRide = state => { return state.merge({ rideStatus: 1 })};
const successRide = (state, { ride }) => state.merge({ selected:ride });
const failureRide = (state, { error }) => state.merge({ error });

const rideArrived = state => state.merge({ rideStatus: 2 });
const takeRide = state => state.merge({ rideStatus: 3});
const completeRide = state => state.merge({ rideStatus: 4 });

export const INITIAL_STATE = Immutable({
  rides: [],
  status: 0,
  error: '',
  selected: null,
  rideStatus: 0,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_RIDE]: requestRide,
  [Types.SUCCESS_RIDE]: successRide,
  [Types.FAILURE_RIDE]: failureRide,

  [Types.SAVE_RIDES]: saveRides,

  [Types.RIDE_ARRIVED]: rideArrived,
  [Types.TAKE_RIDE]: takeRide,
  [Types.COMPLETE_RIDE]: completeRide,
});
