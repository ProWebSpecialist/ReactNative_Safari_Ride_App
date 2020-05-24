/* eslint-disable no-throw-literal */
// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import config from './config';

const URL = 'https://api.mapsosaferides.com/';

const responseHandler = res => {
  switch (res.status) {
    case 500:
      throw { errMessage: 'mra_notifications_error' };
    case 404:
      throw { errMessage: 'resource_not_found' };
    case 403:
    case 401:
      throw { errMessage: res.data.message || 'mra_notifications_error' };
    default:
      return res;
  }
};

const createApiHandler = baseURL => {
  const apiHandler = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json; version=1.0.0',
    },
    // TODO: make this configurable
    timeout: 1000 * config.apiTimeoutSeconds,
  });

  return {
    post: (...args) => apiHandler.post(...args).then(responseHandler),
    get: (...args) => apiHandler.get(...args).then(responseHandler),
    delete: (...args) => apiHandler.delete(...args).then(responseHandler),
    put: (...args) => apiHandler.put(...args).then(responseHandler),
    patch: (...args) => apiHandler.patch(...args).then(responseHandler),
    // setToken: token => {
    //   apiHandler.setHeader('Authorization', `Bearer ${token}`);
    // },
    setUrl: url => {
      // console.log('setting api url to ', url);
      apiHandler.setBaseURL(url);
    },
  };
};

const create = (baseURL = URL) => {
  // Create and configure an apisauce-based api object.
  const api = createApiHandler(baseURL);
  // const setToken = token => api.setToken(token);

  // thin wrapper over the api layer instead of 'get', 'post', etc.
  // const login = (username, password) => {
  //   return api.post('login', { username, password }).then(response => {
  //     if (response.ok && response.data) {
  //       setToken(response.data.token);
  //     }
  //     return response;
  //   });
  // };
  const verifyPhone = (email, phone) =>
    api.get(`user/verifyPhone/number?email=${email}&phone=${phone}`);
  const registerStudent = data => {
    return api.post('user', data);
  };
  const updateAddress = data => api.post('user/address', data);
  const loginStudent = (email, password) =>
    api.post('login', { email, password });
  const getRides = () => api.get('/driver/rides');
  const getRide = id => api.get(`/ride?rideId=${id}`);
  const getRideDetail = id => api.get(`/ride/details?rideId=${id}`);


  const requestRide = data => api.post('/ride', data);
  const confirmRide = data => api.post('/ride/confirm', data);
  const driverConfirm = (email, longitude, latitude, id) =>
    api.get(`driver/ride/pickup?driverEmail=${email}&rideId=${id}&longitude=${longitude}&latitude=${latitude}`);
  const pickupRide = (longitude, latitude, id) =>
    api.get(`driver/ride/pickup?rideId=${id}&longitude=${longitude}&latitude=${latitude}`);
  const completeRide = (longitude, latitude, id) =>
    api.get(`driver/ride/complete?rideId=${id}&longitude=${longitude}&latitude=${latitude}`);
  const summaryRide = id => api.get(`/ride/summary?rideId=${id}`);

  const getDriversLocations = () => api.get("/driver/locations");
  const getDriverRide = id => api.get(`/ride?rideId=${id}`);

  return {
    verifyPhone,
    registerStudent,
    updateAddress,
    loginStudent,
    getRides,
    getRide,
    getRideDetail,
    getDriversLocations,
    requestRide,
    confirmRide,
    getDriverRide,
    
    driverConfirm,
    pickupRide,
    completeRide,
    summaryRide,
  };
};

export default {
  create,
};
