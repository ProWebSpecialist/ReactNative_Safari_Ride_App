import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../../utils/scale';
import { BackGround } from '../../components';

class Splash2 extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    this.timeoutHandle = setTimeout(() => {
      navigation.navigate('auth');
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackGround />
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: scale(17),
                fontWeight: '500',
                alignSelf: 'center',
                color: '#587adb',
              }}
            >
              Proudly supported by...
            </Text>
            <View style={{ flex: 1, margin: scale(10) }}>
              <Image
                source={require('../../assets/sponsers.png')}
                style={{
                  resizeMode: 'contain',
                  height: scale(200),
                  width: '100%',
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
Splash2.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default Splash2;
