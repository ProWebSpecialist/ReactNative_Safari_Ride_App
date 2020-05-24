import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  PHONE_CHANGED,
  STREET_ADDRESS_CHANGED,
  ADDRESS_LINE_TWO_CHANGED,
  CITY_CHANGED,
  STATE_CHANGED,
  ZIP_CHANGED,
  PHONE_INPUT_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
} from './types';

export const firstNameChanged = text => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text,
  };
};

export const lastNameChanged = text => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text,
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const phoneChanged = text => {
  return {
    type: PHONE_CHANGED,
    payload: text,
  };
};

export const streetAddressChanged = text => {
  return {
    type: STREET_ADDRESS_CHANGED,
    payload: text,
  };
};

export const addressLineTwoChanged = text => {
  return {
    type: ADDRESS_LINE_TWO_CHANGED,
    payload: text,
  };
};

export const cityChanged = text => {
  return {
    type: CITY_CHANGED,
    payload: text,
  };
};

export const stateChanged = text => {
  return {
    type: STATE_CHANGED,
    payload: text,
  };
};

export const zipChanged = text => {
  return {
    type: ZIP_CHANGED,
    payload: text,
  };
};

export const phoneInputChanged = text => {
  return {
    type: PHONE_INPUT_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const confirmPasswordChanged = text => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text,
  };
};
