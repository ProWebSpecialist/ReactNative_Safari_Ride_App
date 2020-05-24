import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { isEmulator } from 'react-native-device-info';
import { connect } from 'react-redux';
import { Card } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { driverRideSelector, driverSelector, userSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
import scale from '../../../../utils/scale';
import { NavIconView, ActionButtonView, PrimaryButton } from '../../../../components';

class DriverProfile extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      cardImage: null,
    };
    this.onNext = this.onNext.bind(this);
  }

  async onNext() {
    const { cardImage } = this.state;
    if (cardImage) {
      const { navigation } = this.props;
      await AsyncStorage.setItem(
        '@base64StudenIdImage',
        `data:${cardImage.mime};base64,${cardImage.data}`,
      );
      // navigation.navigate('terms');
    } else {
      isEmulator().then(flag => {
        if (flag) {
          ImagePicker.openPicker({
            width: 470,
            height: 240,
            cropping: true,
            includeBase64: true,
          }).then(image => {
            this.setState({
              cardImage: image,
            });
          });
        } else {
          ImagePicker.openCamera({
            width: 470,
            height: 240,
            cropping: true,
            includeBase64: true,
          }).then(image => {
            this.setState({
              cardImage: image,
            });
          });
        }
      });
    }
  }

  displayStudendId() {
    const { cardImage } = this.state;
    if (cardImage) {
      return (
        <Image
          source={{
            uri: cardImage.path,
            width: cardImage.width,
            height: cardImage.height,
            mime: cardImage.mime,
          }}
          // source = {require('../../../../assets/carImage.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: scale(8),
          }}
        />
      );
    }
    return <Text style={{ color: 'black' }}> Didn&apos;t find it </Text>;
  }
  
  render() {
    const { cardImage } = this.state;
    const textAction = cardImage ? 'Next' : 'Take Picture';
    const { profile } =this.props;
    return (
      <NavIconView
        title="MY DETAILS"
      >
        <View style={{padding:10, width:'80%'}}>
          <Text style={{fontFamily: 'Poppins', fontWeight: '600', color: '#5e6069',fontSize: scale(15),}}>{`${profile.firstName} ${profile.lastName}`}</Text>
          <Text style={styles.txt}>{profile.email}</Text>
          <Text style={styles.txt}>{`${profile.address.city} ${profile.address.firstLine} ${profile.address.state} ${profile.address.zipCode}`}</Text>

        </View>
        <Card style={styles.card}>{this.displayStudendId()}</Card>
        <ActionButtonView>
          <PrimaryButton text={textAction} onPress={this.onNext} />
        </ActionButtonView>
      </NavIconView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    height: scale(204),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: scale(8),
  },
  txt: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#5e6069',
    fontSize: scale(14),
  }
});

DriverProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object,
};

DriverProfile.defaultProps = {
  selectedRide: null,
  location: null,
};

function mapStateToProps(state) {
  const studentStore = driverSelector(state);
  const userStore = userSelector(state);
  return {
    profile: studentStore.profile,
    user: userStore,
    location: studentStore.location,
  };
}

const mapDispatchToProps = dispatch => ({
  takeRide: () => {
    dispatch(DriverRideActions.takeRide());
  },
 
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverProfile);