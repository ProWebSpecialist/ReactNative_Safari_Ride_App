import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from 'react-native';

class ListItem extends Component {
  render() {
    const { name, addressOne, addressTwo, image } = this.props.item;

    return (
      <View style={{ backgroundColor: '#f2f2f5', marginBottom: 5 }}>
        {/* <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, resizeMode: 'cover' }} /> */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <View>
            <Image
              source={image}
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            />
          </View>

          <View
            style={{
              marginLeft: 5,
              flex: 1,
              height: 100,
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 17 }}>{name}</Text>

            <Text style={{ fontSize: 17 }}>{addressOne}</Text>

            <Text style={{ fontSize: 17 }}>{addressTwo}</Text>
          </View>

          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.pro.navigation.navigate('rideData');
              }}
            >
              <Image
                source={require('../assets/requestIcon.png')}
                style={{ width: 75, height: 75, resizeMode: 'contain' }}
              />
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ListItem;
// export default ListItem;
