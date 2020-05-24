import React, { PureComponent } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import scale from '../../../utils/scale';
import colors from '../../../theme/colors';
import NavigationService from '../../../utils/NavigationService';

const tabBarHeight = 100;
const icons = {
  driver_tab_request: {
    iconName: 'car',
    iconSize: scale(28),
  },
  driver_tab_map: {
    iconName: 'map-marker',
    iconSize: scale(32),
  },
  driver_tab_profile: {
    iconName: 'user',
    iconSize: scale(32),
  },
  driver_tab_setting: {
    iconName: 'cog',
    iconSize: scale(32),
  },
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(93),
    ...ifIphoneX(
      {
        height: scale(tabBarHeight),
        paddingBottom: 30,
      },
      {
        height: scale(tabBarHeight - 30),
      },
    ),
  },
});

class DriverTabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: Object.keys(icons)[0],
    };
  }

  onPressTab = tabKey => {
    this.setState({ tabKey });
    NavigationService.navigate(tabKey);
  };

  render() {
    const { tabKey } = this.state;
    return (
      <ImageBackground
        source={require('../../../assets/images/action_btn.png')}
        style={{
          width: scale(375),
          height: scale(tabBarHeight),
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {Object.keys(icons).map((key, index) => {
          const focused = tabKey === key;
          const iconStyle = {
            fontSize: icons[key].iconSize,
            color: focused ? colors.darkgreen : colors.white,
          };
          const tabStyle = [
            styles.tabView,
            {
              backgroundColor: focused
                ? 'rgba(50, 50, 255, 0.5)'
                : 'transparent',
            },
          ];
          return (
            <TouchableWithoutFeedback
              key={key}
              onPress={() => this.onPressTab(key)}
              style={tabStyle}
            >
              <Icon
                type="FontAwesome"
                name={icons[key].iconName}
                style={iconStyle}
              />
            </TouchableWithoutFeedback>
          );
        })}
      </ImageBackground>
    );
  }
}

export default DriverTabView;
