import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import scale from '../utils/scale';
import NavigationService from '../utils/NavigationService';
import Title from './Title';
import IconView from './IconView';
import IconButton from './IconButton';
import BackGround from './BackGround';

const NavIconView = ({
  children,
  title,
  icon,
  leftIcon = 'back',
  onPressLeftIcon,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BackGround />
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
          <Title text={title} />
          <View style={styles.content}>
            {icon && <IconView source={icon} />}
            {children}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

NavIconView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.number,
};

NavIconView.defaultProps = {
  icon: undefined,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: scale(50),
    width: '100%',
  },
});

export default NavIconView;
