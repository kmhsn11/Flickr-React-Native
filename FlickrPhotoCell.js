import React, {Component} from 'react';
import { Image } from 'react-native';
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