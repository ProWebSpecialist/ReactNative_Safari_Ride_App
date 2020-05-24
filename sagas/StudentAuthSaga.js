import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../utils/NavigationService';
import StudentAuthActions from '../reducers/StudentAuthReducer';
import { studentProfileSelector } from '../selectors';
import { showError } from '../utils/Notification';

export function* requestVerifyPhone(api, { email, phone }) {
  try {
    const res = yield call(api.verifyPhone, email, phone);
    if (res.ok) {
      const { code } = res.data.body;
      yield put(StudentAuthActions.successVerifyPhone(code));
      yield call(NavigationService.navigate, 'verifyCode');
    } else {
      // yield call(NavigationService.navigate, 'verifyCode');
      
      const { data: { message } } = res;
      showError(message)
      yield put(StudentAuthActions.failureVerifyPhone());
    }
  } catch {
    showError("Server Error")
    yield put(StudentAuthActions.failureVerifyPhone());
  }
}

export function* requestLogin(api, { email, password }) {
  const res = yield call(api.loginStudent, email, password);
  if (!res.ok) {
    showError(res.data.message);
    yield put(StudentAuthActions.failureLogin());
    // yield call(NavigationService.navigate, 'driverRide');
    // yield call(NavigationService.navigate, 'studentRide');

  } else {
    const { data } = res;
    yield put(StudentAuthActions.successLogin(data.body));
    if(data.body.userType == 'drive'){
      yield call(NavigationService.navigate, 'driverRide');
    }else{
      yield call(NavigationService.navigate, 'studentRide');
    }
  }
}

export function* requestRegister(api, { password }) {
  const profile = studentProfileSelector(yield select());
  const base64Image = yield call(AsyncStorage.getItem, '@base64StudenIdImage');
  const { firstName, lastName, email, phone, userType } = profile;
  let params = {
    firstName,
    lastName,
    email,
    phone,
    base64Image,
    userType,
    password,
  };
  try {
    let res = yield call(api.registerStudent, params);
    if (!res.ok) {
      const { data: { message } } = res;
      showError(message)
      yield put(StudentAuthActions.failureRegister());
      return;
    }
  } catch {
    showError("Server Error")
    // yield call(NavigationService.navigate, 'welcome');

    yield put(StudentAuthActions.failureRegister());
    return
  }
  params = {
    firstLine: profile.firstAddress,
    secondLine: profile.secondAddress,
    city: profile.city,
    state: profile.state,
    zipCode: profile.zip,
    email,
  };
  try {
    res = yield call(api.updateAddress, params);
    if (res.ok) {
      yield put(StudentAuthActions.successRegister());

      if (userType == "ride"){
        yield call(NavigationService.navigate, 'welcome');
      }
      else{
        //alert("driver screens not yet supported");
        yield call(NavigationService.navigate, 'driverScreens');
      }
     
    } else {
      const { data: { message } } = res;
      showError(message)
      yield put(StudentAuthActions.failureRegister());
    }
  } catch {
    showError("Server Error")
    yield put(StudentAuthActions.failureRegister());
  }
}
