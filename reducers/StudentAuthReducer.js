import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// status 0: none
// status 1: loading
// status 2: success
// status 3: fail

const { Types, Creators } = createActions({
  setStudentAuth: ['student'],
  setLocation: ['location'],

  requestVerifyPhone: ['email', 'phone'],
  successVerifyPhone: ['code'],
  failureVerifyPhone: ['error'],

  requestRegister: ['password'],
  successRegister: [],
  failureRegister: ['error'],

  requestLogin: ['email', 'password'],
  successLogin: ['profile'],
  failureLogin: ['error'],
});

export const StudentAuthTypes = Types;
export default Creators;

const setStudentAuth = (state, { student }) =>
  state.merge({ profile: { ...state.profile, ...student } });
const setLocation = (state, { location }) => state.merge({ location });
const requestVerifyPhone = state => state.merge({ status: 1, code: '' });
const successVerifyPhone = (state, { code }) =>
  state.merge({ status: 2, code });
const failureVerifyPhone = (state, { error }) =>
  state.merge({ status: 3, code: '', error });

const requestRegister = state => state.merge({ status: 1 });
const successRegister = state => state.merge({ status: 2 });
const failureRegister = (state, { error }) => state.merge({ status: 3, error });

const requestLogin = state => state.merge({ status: 1 });
const successLogin = (state, { profile }) => state.merge({ status: 2, profile });
const failureLogin = (state, { error }) => state.merge({ status: 3, error });

export const INITIAL_STATE = Immutable({
  profile: null,
  status: 0,
  code: '',
  error: '',
  location: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_STUDENT_AUTH]: setStudentAuth,
  [Types.SET_LOCATION]: setLocation,

  [Types.REQUEST_VERIFY_PHONE]: requestVerifyPhone,
  [Types.SUCCESS_VERIFY_PHONE]: successVerifyPhone,
  [Types.FAILURE_VERIFY_PHONE]: failureVerifyPhone,

  [Types.REQUEST_REGISTER]: requestRegister,
  [Types.SUCCESS_REGISTER]: successRegister,
  [Types.FAILURE_REGISTER]: failureRegister,

  [Types.REQUEST_LOGIN]: requestLogin,
  [Types.SUCCESS_LOGIN]: successLogin,
  [Types.FAILURE_LOGIN]: failureLogin,
});
