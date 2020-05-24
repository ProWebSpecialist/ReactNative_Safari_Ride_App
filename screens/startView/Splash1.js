import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../../utils/scale';

class Splash1 extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    this.timeoutHandle = setTimeout(() => {
      navigation.navigate('splash2');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/splashLogo.png')}
          style={{ resizeMode: 'contain', width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Splash1.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Splash1;
