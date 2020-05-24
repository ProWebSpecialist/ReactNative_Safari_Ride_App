//student
export const studentSelector = state => state.studentAuth;
export const studentProfileSelector = state => state.studentAuth.profile;

export const studentRideSelector = state => state.studentRide;
export const selectedRide = state => studentRideSelector(state).selected;

//driver
export const driverSelector = state => state.studentAuth;
export const userSelector = state => state.driverRide;
// export const listSelector = state => state.getList;
export const listSelector = state => state.driverRide;

export const drivertudentProfileSelector = state => state.studentAuth.profile;

export const driverRideSelector = state => state.studentRide;