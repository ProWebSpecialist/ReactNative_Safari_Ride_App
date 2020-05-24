import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import scale from '../../../utils/scale';

export default function Button({ text, action, style }) {
  return (
    <TouchableOpacity onPress={action}>
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  label: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20
  },
});
