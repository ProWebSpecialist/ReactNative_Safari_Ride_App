import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { studentRideSelector } from '../../selectors/index';
import RideInformation from './home/RideInformation';
import scale from '../../utils/scale';

import { ActionButtonView, PrimaryButton } from '../../components';
import NavigationService from '../../utils/NavigationService';

// eslint-disable-next-line react/prefer-stateless-function
class RideComplete extends Component {
  onClose = () => {
    NavigationService.pop();
  };

  render() {
    const { selectedRide } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <View style={{ flex: 1 }}> */}
          <View style={styles.container}>
            <Text style={styles.title}>Safe Ride Summary</Text>
            <Text style={styles.header}>Pickup Address:</Text>
            <Text style={styles.label}>908 Marris Avenue, 07894, NJ</Text>
            <Text style={styles.header}>Destination Address:</Text>
            <Text style={styles.label}>
              175 Broadmore st, Maplewood, NJ 07040
            </Text>
          </View>
          <RideInformation
            ride={selectedRide}
            title="Drive and Vehicle details:"
          />
          <ActionButtonView>
            <PrimaryButton text="Close" onPress={this.onClose} />
          </ActionButtonView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: scale(33),
  },
  title: {
    color: '#5e6069',
    fontFamily: 'Poppins',
    fontWeight: '200',
    fontSize: scale(16.34),
    marginTop: 60,
    textAlign: 'center',
  },
  header: {
    color: '#5e6069',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: scale(16.34),
    marginTop: 60,
  },
  label: {
    color: '#5e6069',
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: scale(15),
  },
});

RideComplete.propTypes = {
  selectedRide: PropTypes.object,
};

RideComplete.defaultProps = {
  selectedRide: null,
};

function mapStateToProps(state) {
  const rideStore = studentRideSelector(state);
  return {
    selectedRide: rideStore.selected,
  };
}

export default connect(mapStateToProps, null)(RideComplete);
