import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DriverSetting extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DriverSetting;
