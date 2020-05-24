import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';
import NavigationService from '../utils/NavigationService';
import Title from './Title';
import IconView from './IconView';
import IconButton from './IconButton';
import BackGround from './BackGround';

const NavMenuView = ({
  children,
  leftIcon = 'back',
  onPressLeftIcon,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {leftIcon === 'hambuger' && (
          <IconButton name="ios-menu" onPress={onPressLeftIcon} />
        )}
        {leftIcon === 'back' && (
          <View>
            <IconButton
              name="ios-arrow-back"
              onPress={() => NavigationService.pop()}
            />
          </View>
        )}
        <View style={styles.container}>
            {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

NavMenuView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.number,
};

NavMenuView.defaultProps = {
  icon: undefined,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  
});

export default NavMenuView;
