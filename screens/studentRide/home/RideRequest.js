import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentButton from './StudentButton';
import { studentRideSelector, studentSelector } from '../../../selectors/index';
import StudentRideActions from '../../../reducers/StudentRideReducer';
import RideInformation from './RideInformation';

class RideLayer extends Component {
  constructor(props) {
    super(props);
    this.onRequestRide = this.onRequestRide.bind(this);
    this.onConfirmRide = this.onConfirmRide.bind(this);
    this.onArrived = this.onArrived.bind(this);
    this.state = {
      rideStatus: 0,
    }
  }

  onConfirmRide() {
    const { requestRide, location, profile } = this.props;
    const { longitude, latitude } = location;
    // if (!location) {
    //   return;
    // }
    this.setState({ rideStatus: 2})
    let fullName = `${profile.firstName} ${profile.lastName}`;
    requestRide(fullName, profile.phone, profile.email, `${longitude}`, `${latitude}`);
  }

  onRequestRide() {
    this.setState({ rideStatus: 1})
  }

  onArrived() {
    const { takeRide } = this.props;
    takeRide();
  }


  renderButton() {
    const { selectedRide } = this.props;
    if (selectedRide == null) {
      const { rideStatus } = this.state;
      if (rideStatus === 0) {
        return (
          <StudentButton
            text="Request Ride Home"
            action={this.onRequestRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        );
      } else if (rideStatus == 1) {
        return (
          <StudentButton
            text="Confirm Ride Home"
            action={this.onConfirmRide}
            style={{ backgroundColor: '#02ac12' }}
          />
        );
      }
    }
    const { rideStatus } = this.props;
    if (rideStatus === 2) {
      return (
        <StudentButton
          text="Your Safe Rides Driver has arrived"
          action={this.onArrived}
          style={{ backgroundColor: '#02ac12' }}
        />
      );
    }
    if (rideStatus === 3) {
      return (
        <StudentButton
          text="Saft Ride in Progress"
          // action={this.confirmRide}
          style={{ backgroundColor: '#1d59bd' }}
        />
      );
    }
    return null;
  }

  render() {
    const { selectedRide } = this.props;
    return (
      <View style={styles.container}>
        {this.renderButton()}
        {selectedRide && <RideInformation ride={selectedRide} title="Driver Details:"/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: 0, // for center align
    width: '100%',
    alignSelf: 'flex-end', // for align to right
  },
});

RideLayer.propTypes = {
  requestRide: PropTypes.func.isRequired,
  takeRide: PropTypes.func.isRequired,
  rideStatus: PropTypes.number.isRequired,
  selectedRide: PropTypes.object,
  profile: PropTypes.object.isRequired,
  location: PropTypes.object,
};

RideLayer.defaultProps = {
  selectedRide: null,
  location: null,
};

function mapStateToProps(state) {
  const rideStore = studentRideSelector(state);
  const studentStore = studentSelector(state);

  return {
    selectedRide: rideStore.selected,
    rideStatus: rideStore.rideStatus,
    profile: studentStore.profile,
    location: studentStore.location,
  };
}

const mapDispatchToProps = dispatch => ({
  requestRide: (name, phone, email, longitude, latitude) => {
    dispatch(
      StudentRideActions.requestRide(name, phone, email, longitude, latitude),
    );
  },
  takeRide: () => {
    dispatch(StudentRideActions.takeRide());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RideLayer);
