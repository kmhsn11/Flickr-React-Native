import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from './Styles'


export default class FlickrPhotoCell extends Component {
	render(){			
			

		return(
				
				<Image source = {{uri: (this.props.imageData == '') ? 'nil' : this.props.imageData }}
      			  	 style = {styles.collectionItem}
      			/>			

		);
	}
}