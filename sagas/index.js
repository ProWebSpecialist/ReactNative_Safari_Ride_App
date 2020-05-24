import { all, takeEvery, call } from 'redux-saga/effects';

import API from '../utils/Api';

/* ------------- Types ------------- */
import { StudentAuthTypes } from '../reducers/StudentAuthReducer';
import { StudentRideTypes } from '../reducers/StudentRideReducer';
import { DriverRideTypes } from '../reducers/DriverRideReducer';

/* ------------- Sagas ------------- */
import {
  requestVerifyPhone,
  requestRegister,
  requestLogin,
} from './StudentAuthSaga';
import { requestRide, getRides, takeRide } from './StudentRideSaga';
import {  confirmRide, getList, completeRide, summaryRide, pickupRide, driverConfirm } from './DriverRideSaga';

/* ------------- API ------------- */
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeEvery(StudentAuthTypes.REQUEST_VERIFY_PHONE, requestVerifyPhone, api),
    takeEvery(StudentAuthTypes.REQUEST_REGISTER, requestRegister, api),
    takeEvery(StudentAuthTypes.REQUEST_LOGIN, requestLogin, api),
    takeEvery(StudentRideTypes.REQUEST_RIDE, requestRide, api),
    takeEvery(StudentRideTypes.TAKE_RIDE, takeRide, api),

    // takeEvery(DriverRideTypes.REQUEST_RIDE, requestRide, api),
    takeEvery(DriverRideTypes.CONFIRM_RIDE, confirmRide, api),
    // takeEvery(DriverRideTypes.GET_LIST, getList, api),
    takeEvery(DriverRideTypes.DRIVER_CONFIRM, driverConfirm, api),
    takeEvery(DriverRideTypes.PICKUP_RIDE, pickupRide, api),
    takeEvery(DriverRideTypes.COMPLETE_RIDE, completeRide, api),
    takeEvery(DriverRideTypes.SUMMARY_RIDE, summaryRide, api),

    call(getRides, api),
  ]);
}
