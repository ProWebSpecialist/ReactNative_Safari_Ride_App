import React, { Component } from 'react';
import { View, Image, Alert, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavIconView from '../../../../components/NavIconView';
import constants from '../../../../utils/constants';
import { CardView } from '../../../../components';
import scale from '../../../../utils/scale';
import colors from '../../../../theme/colors';
import { driverRideSelector, driverSelector, listSelector } from '../../../../selectors/index';
import DriverRideActions from '../../../../reducers/DriverRideReducer';
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = 'AIzaSyBb29HZEwyupt6Q1r0YncVEZvNgSojwCvA';
Geocoder.init(GOOGLE_API_KEY);

class DriverRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			addressList : []
		};
	}
	componentDidMount(){
		const { list } = this.props;
		list&&list.map((item, key) =>{
			Geocoder.from(item.request_latitude, item.request_longitude).then(
				json => {
					var address = json.results[0].formatted_address;
					var addressList = this.state.addressList;
					addressList[key] = address;
					this.setState({ addressList: addressList });
				},
				error => {
					console.log(error);
					var addressList = this.state.addressList;
					addressList.push("Unknown Area");
					this.setState({ addressList: addressList });
				}
			);
		});

		
	}
	next(param) {
		const { navigation } = this.props;
		const { successRide } = this.props;
		successRide(param);
		navigation.navigate('mainRideStack');
	}

	_renderRequestItem = ( {item, index } ) => {
		return (
			<CardView key={index} style={styles.itemView}>
				<Image
					source={{ uri: item.profileUrl }}
					style={styles.avatar} />
				<View style={styles.rightView}>
					<View style={{ width: '70%' }}>
						<Text style={[styles.infoText, { fontWeight: 'bold' }]}>
							{item.fullname}
						</Text>
						<Text style={styles.infoText}>{this.state.addressList[index] =="undefined"?"Loading....":this.state.addressList[index]}</Text>
					</View>
					<TouchableOpacity onPress={() => this.next(item)}>
						<Image
							source={require('../../../../assets/icon-green-car.png')}
							style={styles.itemButton}
						/>
					</TouchableOpacity>
				</View>
			</CardView>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<NavIconView title="Ride Requests">
					<FlatList
						data={this.state.list}
						renderItem={this._renderRequestItem.bind(this)}
						extraData={this.state}
					/>
				</NavIconView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemView: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightView: {
		flex: 1,
		display: 'flex',
		width: '70%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	avatar: {
		width: scale(80),
		height: scale(80),
		marginRight: scale(8),
		borderRadius: scale(40),
	},
	itemButton: {
		borderRadius: scale(4),
		width: scale(60),
		height: scale(60),
	},
	infoText: {
		color: colors.text,
		fontSize: scale(14),
		paddingBottom: scale(4),
	},
});

DriverRequest.propTypes = {
	setUser: PropTypes.func.isRequired,
	getList: PropTypes.func.isRequired,
	selectedRide: PropTypes.object,
	profile: PropTypes.object.isRequired,
	list: PropTypes.array.isRequired,
	location: PropTypes.object,
};

DriverRequest.defaultProps = {
	selectedRide: null,
	location: null,
};

function mapStateToProps(state) {
	const rideStore = driverRideSelector(state);
	const studentStore = driverSelector(state);
	const listStore = listSelector(state);
	console.log("sssssssssssss");
	console.log(listStore);
	return {
		selectedRide: rideStore.selected,
		rideStatus: rideStore.rideStatus,
		profile: studentStore.profile,
		list: listStore.list,
		location: studentStore.location,
	};
}

const mapDispatchToProps = dispatch => ({
	getList: () => {
		dispatch(
			DriverRideActions.getList(),
		);
	},
	setUser: (params) => {
		dispatch(
			DriverRideActions.setUser(params),
		);
	},
	successRide: (params) => {
		dispatch(
			DriverRideActions.successRide(params),
		);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverRequest);