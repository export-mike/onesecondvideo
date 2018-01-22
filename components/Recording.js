import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
	recordingWrapper: {
		position: 'absolute',
		top: 20,
		left: 10,
		zIndex: 999,
		flexDirection: 'row'
	},
	text: {
		color: 'red',
		padding: 5,
		backgroundColor: 'transparent',
	},
	circle: {
		backgroundColor: 'red',
		borderRadius: 100,
		width: 25,
		height: 25
	}
})
export default () => <View style={styles.recordingWrapper}>
	<View style={styles.circle}></View>
	<Text style={styles.text}>Recording</Text>
</View>
