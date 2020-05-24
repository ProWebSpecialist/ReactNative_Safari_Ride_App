import { call, put, delay } from 'redux-saga/effects';
import StudentRideReducer from '../reducers/StudentRideReducer';
import DriverRideReducer from '../reducers/DriverRideReducer';

import NavigationService from '../utils/NavigationService';

export function* getRides(api) {
  const res = yield call(api.getDriversLocations);
  const res1 = yield call(api.getRides);

  const { ok, data } = res;
  const ok1 = res1.ok;
  const data1 = res1.data;
  if (ok) {
    yield put(StudentRideReducer.saveRides(data.body.rides));
  }
  if (ok1) {
    yield put(DriverRideReducer.getList(data1.body.rides));
  }

}

export function* getRide(api, id) {
  const res = yield call(api.getDriverRide, id);
  const { ok, data } = res;
  if (ok) {
    yield put(StudentRideReducer.successRide(data.body));
    yield delay(2000);
    yield put(StudentRideReducer.rideArrived(data.body));
  } else {
    yield put(StudentRideReducer.failureRide(res.data.message));
  }
}

export function* requestRide(api, { name, phone, email, longitude, latitude }) {
  // FOR TESTING ONLY
  // if (true) {
  //   const rideId = '90249971-d04a-454d-bb98-fbe283aaab85'; // This is for test
  //   yield call(getRide, api, rideId)
  //   return
  // }
  const params = { name, phone, email, longitude, latitude };
  const res = yield call(api.requestRide, params);
  const { ok, problem, data } = res;
  if (!ok) {
    const { data: { message } } = res;
    yield put(StudentRideReducer.failureRide(message));
  } else {
    const { rideId } = data.body;

    //SHOULD WAIT FOR A DRIVER TO ACCEPT THE RIDE HERE ...
    //NEEDS TO POLL THE API AND WAIT FOR A RIDE CONFIRMATION..
    yield call(getRide, api, rideId)
  }
}

export function* takeRide() {
  yield delay(5000);
  yield put(StudentRideReducer.completeRide());
  yield call(NavigationService.navigate, 'complete');
  
}
