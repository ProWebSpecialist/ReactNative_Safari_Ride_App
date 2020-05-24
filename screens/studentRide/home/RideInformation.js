import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../../../utils/scale';

class RideInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, ride } = this.props;
    const { user, driver } = ride;
    if (!driver) {
      return null;
    }
    const { firstName, lastName } = user;
    const {
      driverImageUrl,
      vehicleImageUrl,
      vehicleMakeModel,
      vehiclePlate,
    } = driver;
    return (
      <View style={styles.informationView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: scale(90),
                paddingTop: scale(11),
                paddingBottom: scale(11),
              }}
            >
              <Image
                style={{
                  width: scale(68),
                  height: scale(68),
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}
                source={{ uri: driverImageUrl }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.text}>{`${firstName} ${lastName}`}</Text>
            </View>
            <View>
              <Text style={styles.text}>SMS</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: scale(90),
                paddingTop: scale(11),
                paddingBottom: scale(11),
              }}
            >
              <Image
                style={{
                  width: '100%',
                  height: scale(68),
                  backgroundColor: 'white',
                  borderRadius: scale(34),
                }}
                source={{ uri: vehicleImageUrl }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.text}>{vehicleMakeModel}</Text>
            </View>
            <View>
              <Text style={styles.text}>{vehiclePlate}</Text>
            </View>
          </View>
        </View>
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
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  informationView: {
    backgroundColor: '#FAFAFA',
    height: scale(200),
    paddingLeft: scale(33),
    paddingRight: scale(33),
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(16.3),
  },
  titleWrapper: {
    marginTop: scale(24),
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(14),
  },
  avatarWrapper: {
    marginLeft: scale(33),
    marginTop: scale(24),
  },
  carWrapper: {
    marginLeft: scale(33),
    marginTop: scale(24),
  },
  nameWrapper: {
    marginLeft: scale(33),
    marginTop: scale(24),
  },
  smsWrapper: {
    marginLeft: scale(33),
    marginTop: scale(24),
  },
});

RideInformation.propTypes = {
  ride: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  // rideStatus: PropTypes.number.isRequired,
};

export default RideInformation;
