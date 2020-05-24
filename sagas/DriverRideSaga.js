import { call, put, delay } from 'redux-saga/effects';
import DriverRideReducer from '../reducers/DriverRideReducer';
import NavigationService from '../utils/NavigationService';

export function* getList(api) {
  const res = yield call(api.getRides);
  const { ok, data } = res;
  if (ok) {
    yield put(DriverRideReducer.getList(data.body.rides));
  }
}

export function* getRide(api, id) {
  const res = yield call(api.getRideDetail, id);
  const { ok, data } = res;
  if (ok) {
    yield put(DriverRideReducer.successRide(data.body));
    yield delay(2000);
    yield put(DriverRideReducer.rideArrived(data.body));
  } else {
    yield put(DriverRideReducer.failureRide(res.data.message));
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
    yield put(DriverRideReducer.failureRide(message));
  } else {
    const { rideId } = data.body;

    //SHOULD WAIT FOR A DRIVER TO ACCEPT THE RIDE HERE ...
    //NEEDS TO POLL THE API AND WAIT FOR A RIDE CONFIRMATION..
    

    yield call(getRide, api, rideId)
  }
}

export function* takeRide() {
  yield delay(5000);
  // yield put(DriverRideReducer.completeRide());
  // yield call(NavigationService.navigate, 'summary');
}

export function* confirmRide() {
  // yield call(NavigationService.navigate, 'driverConfirm');
}

export function* summaryRide(api, { rideId }) {
    
  const res = yield call(api.summaryRide, rideId);
  const { ok, data } = res;
  if (ok) {
    yield put(DriverRideReducer.summaryRide(data.body));
  } else {
    yield put(DriverRideReducer.failureRide(res.data.message));
  }
}

export function* completeRide(api, {longitude, latitude, id}) {
  const res = yield call(api.completeRide, longitude, latitude, id);
  const { ok, data } = res;
  if (ok) {
    yield call(NavigationService.navigate, 'summary');
  } else {
    yield put(DriverRideReducer.failureRide(res.data.message));
  }
}

export function* pickupRide(api, {longitude, latitude, id}) {
  const res = yield call(api.pickupRide, longitude, latitude, id);
  const { ok } = res;
  if (ok) {
    yield call(NavigationService.navigate, 'driverConfirm');
  } else {
    yield put(DriverRideReducer.failureRide(res.data.message));
  }
}

export function* driverConfirm(api, {email, longitude, latitude, id}) {
  const res = yield call(api.driverConfirm, email, longitude, latitude, id);
  const { ok, data } = res;
  if (ok) {
    // alert("success");
  } else {
    yield put(DriverRideReducer.failureRide(res.data.message));
  }
}
