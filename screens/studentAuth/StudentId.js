import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { isEmulator } from 'react-native-device-info';
import { Card } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';

import { NavIconView, ActionButtonView, PrimaryButton } from '../../components';
import scale from '../../utils/scale';

class StudentId extends Component {
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
      navigation.navigate('terms');
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
    return (
      <NavIconView
        title="Capture Student ID"
        icon={require('../../assets/captureid.png')}
      >
        <Card style={styles.card}>{this.displayStudendId()}</Card>
        <ActionButtonView>
          <PrimaryButton text={textAction} onPress={this.onNext} />
        </ActionButtonView>
      </NavIconView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: scale(204),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(8),
  },
});

export default StudentId;

StudentId.propTypes = {
  navigation: PropTypes.object.isRequired,
};
